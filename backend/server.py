"""PAKOPPS FastAPI application entry point."""
from __future__ import annotations

import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

from routes import router  # noqa: E402  (after load_dotenv)
from seed import RECORDS  # noqa: E402

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("pakopps")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="PAKOPPS API", version="1.0.0")
app.state.db = db

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


async def seed_database():
    """Idempotently load DEMO opportunities and ensure indexes.

    Records are inserted only once (keyed by content_hash) and then kept in sync
    so lifecycle status recomputes correctly on each boot.
    """
    coll = db.opportunities
    await coll.create_index("slug", unique=True)
    await coll.create_index("content_hash", unique=True)
    await coll.create_index([("opportunity_type", 1), ("deadline", 1)])
    await coll.create_index([("is_government", 1), ("is_remote", 1), ("is_international", 1)])
    await coll.create_index([("province", 1), ("city", 1)])
    await coll.create_index([("title", "text"), ("organization", "text"), ("description", "text")])

    for rec in RECORDS:
        await coll.update_one({"content_hash": rec["content_hash"]}, {"$set": rec}, upsert=True)
    count = await coll.count_documents({})
    logger.info("PAKOPPS seed complete: %s opportunities in database", count)


@app.on_event("startup")
async def on_startup():
    try:
        await seed_database()
    except Exception as exc:  # noqa: BLE001
        logger.exception("Seeding failed: %s", exc)


@app.get("/api/")
async def root():
    return {"message": "PAKOPPS API", "status": "ok"}


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

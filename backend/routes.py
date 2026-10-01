"""Public API routes for PAKOPPS."""
from __future__ import annotations

import os
import re
from datetime import date, timedelta
from typing import Optional

from fastapi import APIRouter, HTTPException, Query, Request
from fastapi.responses import PlainTextResponse, Response

from content import (CAREER_GUIDES, CATEGORIES, CITIES, EXPERIENCE, POPULAR_SEARCHES,
                     PROVINCES, QUALIFICATIONS, SOURCE_CONFIG, TRUST_PAGES)
from engines import compute_status, is_active
from models import Contact, ContactCreate, Report, ReportCreate, SearchLog

router = APIRouter(prefix="/api")

PUBLIC_FIELDS_EXCLUDE = {"_id", "confidence_score", "content_hash", "source_hash", "source_closed"}

CATEGORY_BY_SLUG = {c["slug"]: c for c in CATEGORIES}
GUIDE_BY_SLUG = {g["slug"]: g for g in CAREER_GUIDES}


def _db(request: Request):
    return request.app.state.db


def _today() -> str:
    return date.today().isoformat()


def public_view(doc: dict) -> dict:
    d = {k: v for k, v in doc.items() if k not in PUBLIC_FIELDS_EXCLUDE}
    d["status"] = compute_status(doc)
    d["is_active"] = is_active(d["status"])
    return d


def category_filter(slug: str) -> dict:
    s = slug
    if s == "jobs":
        return {"opportunity_type": "jobs"}
    if s == "government-jobs":
        return {"opportunity_type": "jobs", "is_government": True}
    if s == "private-jobs":
        return {"opportunity_type": "jobs", "is_government": False, "is_remote": False}
    if s == "remote-jobs":
        return {"is_remote": True}
    if s == "fully-funded-scholarships":
        return {"is_fully_funded": True}
    if s == "international-opportunities":
        return {"is_international": True}
    cat = CATEGORY_BY_SLUG.get(s)
    if cat:
        return {"opportunity_type": cat["type"]}
    return {}


def active_filter() -> dict:
    today = _today()
    return {
        "source_closed": {"$ne": True},
        "$or": [{"deadline": {"$gte": today}}, {"deadline": None}, {"deadline": {"$exists": False}}],
    }


# ---------------- Config / taxonomy ----------------
@router.get("/config")
async def get_config():
    def env(k, d=""):
        return os.environ.get(k, d)
    return {
        "site_name": "PAKOPPS",
        "site_url": env("PUBLIC_SITE_URL"),
        "contact_email": env("CONTACT_EMAIL", "contact@pakopps.com"),
        "ads": {
            "enabled": env("ADS_ENABLED", "false").lower() == "true",
            "provider": env("AD_PROVIDER", "adsense"),
            "client_id": env("ADSENSE_CLIENT_ID"),
            "slots": {
                "top": env("ADSENSE_TOP_SLOT"),
                "in_feed": env("ADSENSE_IN_FEED_SLOT"),
                "sidebar": env("ADSENSE_SIDEBAR_SLOT"),
                "detail": env("ADSENSE_DETAIL_SLOT"),
                "bottom": env("ADSENSE_BOTTOM_SLOT"),
            },
        },
        "analytics_id": env("GOOGLE_ANALYTICS_ID"),
        "site_verification": env("GOOGLE_SITE_VERIFICATION"),
    }


@router.get("/taxonomy")
async def get_taxonomy():
    return {
        "categories": CATEGORIES,
        "provinces": PROVINCES,
        "cities": CITIES,
        "qualifications": QUALIFICATIONS,
        "experience": EXPERIENCE,
        "popular_searches": POPULAR_SEARCHES,
        "source_config": {k: SOURCE_CONFIG[k] for k in ("providers", "crawl_frequency_hours", "respects")},
    }


@router.get("/stats")
async def get_stats(request: Request):
    db = _db(request)
    base = active_filter()
    total = await db.opportunities.count_documents(base)
    per_cat = {}
    for c in CATEGORIES:
        q = {**category_filter(c["slug"]), **base}
        per_cat[c["slug"]] = await db.opportunities.count_documents(q)
    today = _today()
    soon = (date.today() + timedelta(days=7)).isoformat()
    closing = await db.opportunities.count_documents({**base, "deadline": {"$gte": today, "$lte": soon}})
    return {"total_active": total, "closing_soon": closing, "by_category": per_cat,
            "organizations": len(await db.opportunities.distinct("organization"))}


# ---------------- Home ----------------
async def _section(db, extra, limit=8, sort=None):
    sort = sort or [("deadline", 1)]
    q = {**active_filter(), **extra}
    docs = await db.opportunities.find(q, {k: 0 for k in ("confidence_score", "content_hash", "source_hash")}).sort(sort).limit(limit).to_list(limit)
    return [public_view(d) for d in docs]


@router.get("/home")
async def get_home(request: Request):
    db = _db(request)
    today = _today()
    soon = (date.today() + timedelta(days=7)).isoformat()
    latest = await _section(db, {}, sort=[("published_at", -1)])
    closing = await _section(db, {"deadline": {"$gte": today, "$lte": soon}}, sort=[("deadline", 1)])
    gov = await _section(db, category_filter("government-jobs"), sort=[("published_at", -1)])
    private = await _section(db, category_filter("private-jobs"), sort=[("published_at", -1)])
    remote = await _section(db, {"is_remote": True}, sort=[("published_at", -1)])
    scholarships = await _section(db, {"opportunity_type": "scholarships"}, sort=[("deadline", 1)])
    internships = await _section(db, {"opportunity_type": "internships"}, sort=[("deadline", 1)])
    intl = await _section(db, {"is_international": True}, sort=[("deadline", 1)])
    return {
        "latest": latest, "closing_soon": closing, "government_jobs": gov,
        "private_jobs": private, "remote_jobs": remote, "scholarships": scholarships,
        "internships": internships, "international": intl, "popular_searches": POPULAR_SEARCHES,
    }


# ---------------- Search / listing ----------------
@router.get("/opportunities")
async def list_opportunities(
    request: Request,
    q: Optional[str] = None,
    category: Optional[str] = None,
    province: Optional[str] = None,
    city: Optional[str] = None,
    qualification: Optional[str] = None,
    experience: Optional[str] = None,
    remote: Optional[bool] = None,
    fully_funded: Optional[bool] = None,
    international: Optional[bool] = None,
    government: Optional[bool] = None,
    closing_soon: Optional[bool] = None,
    added: Optional[str] = None,
    include_expired: bool = False,
    sort: str = "newest",
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=48),
):
    db = _db(request)
    query: dict = {} if include_expired else dict(active_filter())
    if category and category in CATEGORY_BY_SLUG:
        query.update(category_filter(category))
    if province:
        query["province"] = province
    if city:
        query["city"] = city
    if qualification:
        query["education_level"] = qualification
    if experience:
        query["experience_required"] = experience
    if remote:
        query["is_remote"] = True
    if fully_funded:
        query["is_fully_funded"] = True
    if international:
        query["is_international"] = True
    if government:
        query["is_government"] = True
    if closing_soon:
        soon = (date.today() + timedelta(days=7)).isoformat()
        query["deadline"] = {"$gte": _today(), "$lte": soon}
    if added == "today":
        query["published_at"] = {"$gte": _today()}
    elif added == "week":
        wk = (date.today() - timedelta(days=7)).isoformat()
        query["published_at"] = {"$gte": wk}
    if q:
        rx = re.escape(q.strip())
        query["$and"] = query.get("$and", []) + [{"$or": [
            {"title": {"$regex": rx, "$options": "i"}},
            {"organization": {"$regex": rx, "$options": "i"}},
            {"description": {"$regex": rx, "$options": "i"}},
            {"qualification": {"$regex": rx, "$options": "i"}},
            {"city": {"$regex": rx, "$options": "i"}},
            {"province": {"$regex": rx, "$options": "i"}},
            {"field_of_study": {"$regex": rx, "$options": "i"}},
        ]}]

    sort_map = {"newest": [("published_at", -1)], "deadline": [("deadline", 1)], "relevance": [("published_at", -1)]}
    sort_spec = sort_map.get(sort, [("published_at", -1)])

    total = await db.opportunities.count_documents(query)
    skip = (page - 1) * per_page
    proj = {k: 0 for k in ("confidence_score", "content_hash", "source_hash")}
    docs = await db.opportunities.find(query, proj).sort(sort_spec).skip(skip).limit(per_page).to_list(per_page)

    if q:
        await db.search_logs.insert_one(SearchLog(query=q, category=category, results_count=total).to_mongo())

    return {
        "items": [public_view(d) for d in docs],
        "total": total, "page": page, "per_page": per_page,
        "total_pages": max(1, (total + per_page - 1) // per_page),
    }


@router.get("/autocomplete")
async def autocomplete(request: Request, q: str = Query(..., min_length=1)):
    db = _db(request)
    rx = re.escape(q.strip())
    docs = await db.opportunities.find(
        {**active_filter(), "$or": [
            {"title": {"$regex": rx, "$options": "i"}},
            {"organization": {"$regex": rx, "$options": "i"}},
        ]}, {"title": 1, "organization": 1, "slug": 1, "opportunity_type": 1}
    ).limit(6).to_list(6)
    titles = [{"label": d["title"], "slug": d["slug"], "type": d.get("opportunity_type")} for d in docs]
    cats = [c for c in CATEGORIES if q.lower() in c["label"].lower()][:3]
    searches = [s for s in POPULAR_SEARCHES if q.lower() in s.lower()][:3]
    return {"opportunities": titles, "categories": cats, "searches": searches}


@router.get("/opportunities/{slug}")
async def get_opportunity(request: Request, slug: str):
    db = _db(request)
    doc = await db.opportunities.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    data = public_view(doc)
    related_q = {**active_filter(), "slug": {"$ne": slug}, "$or": [
        {"category": doc.get("category")},
        {"organization": doc.get("organization")},
        {"city": doc.get("city")},
    ]}
    proj = {k: 0 for k in ("confidence_score", "content_hash", "source_hash")}
    rel = await db.opportunities.find(related_q, proj).limit(6).to_list(6)
    data["related"] = [public_view(r) for r in rel]
    return data


# ---------------- Career guides ----------------
@router.get("/career-guides")
async def list_guides():
    return [{k: g[k] for k in ("slug", "title", "excerpt", "read_time", "category")} for g in CAREER_GUIDES]


@router.get("/career-guides/{slug}")
async def get_guide(slug: str):
    g = GUIDE_BY_SLUG.get(slug)
    if not g:
        raise HTTPException(status_code=404, detail="Guide not found")
    return g


@router.get("/trust/{slug}")
async def get_trust(slug: str):
    p = TRUST_PAGES.get(slug)
    if not p:
        raise HTTPException(status_code=404, detail="Not found")
    return p


# ---------------- Reports / contact ----------------
@router.post("/reports")
async def create_report(request: Request, payload: ReportCreate):
    db = _db(request)
    rep = Report(**payload.model_dump())
    await db.reports.insert_one(rep.to_mongo())
    return {"ok": True, "message": "Thank you. Your report has been received and will be reviewed."}


@router.post("/contact")
async def create_contact(request: Request, payload: ContactCreate):
    db = _db(request)
    c = Contact(**payload.model_dump())
    await db.contacts.insert_one(c.to_mongo())
    return {"ok": True, "message": "Thank you for reaching out. We will respond as soon as possible."}


# ---------------- SEO: sitemap + robots ----------------
@router.get("/sitemap.xml")
async def sitemap(request: Request):
    db = _db(request)
    base = os.environ.get("PUBLIC_SITE_URL", "").rstrip("/")
    urls = [f"{base}/", f"{base}/search", f"{base}/career-guides",
            f"{base}/about", f"{base}/contact", f"{base}/how-it-works",
            f"{base}/source-policy", f"{base}/editorial-policy",
            f"{base}/privacy-policy", f"{base}/terms", f"{base}/disclaimer"]
    for c in CATEGORIES:
        urls.append(f"{base}/{c['slug']}")
    for g in CAREER_GUIDES:
        urls.append(f"{base}/career-guides/{g['slug']}")
    docs = await db.opportunities.find(active_filter(), {"slug": 1, "updated_at": 1}).to_list(2000)
    for d in docs:
        urls.append(f"{base}/opportunities/{d['slug']}")
    items = "".join(f"<url><loc>{u}</loc><changefreq>daily</changefreq></url>" for u in urls)
    xml = f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{items}</urlset>'
    return Response(content=xml, media_type="application/xml")


@router.get("/robots.txt", response_class=PlainTextResponse)
async def robots():
    base = os.environ.get("PUBLIC_SITE_URL", "").rstrip("/")
    return (
        "User-agent: *\n"
        "Allow: /\n"
        "Disallow: /search?\n"
        "Disallow: /report-an-opportunity\n"
        f"Sitemap: {base}/api/sitemap.xml\n"
    )

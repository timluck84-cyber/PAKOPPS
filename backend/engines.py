"""Automated quality, duplicate, expiry and transformation engines for PAKOPPS.

These engines operate on discovered opportunity records. In this build they run
over realistic DEMO seed data; the same functions are designed to run inside the
scheduled discovery pipeline against live extracted records.
"""
from __future__ import annotations

import hashlib
import re
from datetime import date, datetime
from typing import Optional

TRUSTED_SOURCE_HINTS = (
    "gov.pk", "edu.pk", "fpsc", "ppsc", "spsc", "kppsc", "bpsc", "nts", "hec",
    "fulbright", "chevening", "daad", "commonwealth", "erasmus", "ac.uk",
    "org", "careers", "jobs",
)

CRITICAL_FIELDS = ("title", "organization", "source_url", "description")


def normalize_text(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "").strip().lower())


def content_hash(opp: dict) -> str:
    base = "|".join([
        normalize_text(opp.get("title", "")),
        normalize_text(opp.get("organization", "")),
        normalize_text(opp.get("deadline", "")),
        normalize_text(opp.get("city", "")),
    ])
    return hashlib.sha256(base.encode()).hexdigest()


def source_hash(opp: dict) -> str:
    return hashlib.sha256(normalize_text(opp.get("source_url", "")).encode()).hexdigest()


def _parse_date(value: Optional[str]) -> Optional[date]:
    if not value or value == "Not specified by source":
        return None
    try:
        return datetime.strptime(value[:10], "%Y-%m-%d").date()
    except ValueError:
        return None


def compute_status(opp: dict, today: Optional[date] = None) -> str:
    """Derive the live lifecycle status from the deadline / source signals."""
    today = today or date.today()
    if opp.get("source_closed"):
        return "CLOSED"
    deadline = _parse_date(opp.get("deadline"))
    if deadline is None:
        return "PUBLISHED"
    if deadline < today:
        return "EXPIRED"
    if (deadline - today).days <= 7:
        return "CLOSING_SOON"
    return "PUBLISHED"


def is_active(status: str) -> bool:
    return status in ("PUBLISHED", "CLOSING_SOON", "VERIFIED", "NEW")


def confidence_score(opp: dict) -> int:
    """Automated 0-100 quality score. Never exposed publicly."""
    score = 0
    # Core presence (mandatory-ish)
    if opp.get("title") and len(opp["title"]) > 8:
        score += 14
    if opp.get("organization"):
        score += 12
    if opp.get("source_url"):
        score += 10
    if opp.get("description") and len(opp.get("description", "")) > 120:
        score += 16
    # Application path
    if opp.get("application_url") or opp.get("official_url"):
        score += 12
    if opp.get("how_to_apply"):
        score += 8
    # Structured richness
    if opp.get("eligibility"):
        score += 7
    if opp.get("deadline") and opp.get("deadline") != "Not specified by source":
        score += 8
    if opp.get("location") or opp.get("city") or opp.get("country"):
        score += 5
    # Source trust
    src = normalize_text(opp.get("source_url", "") + " " + opp.get("source_name", ""))
    if any(h in src for h in TRUSTED_SOURCE_HINTS):
        score += 8
    return min(score, 100)


def critical_failure(opp: dict, status: str) -> Optional[str]:
    """Return a rejection reason if any critical check fails, else None."""
    for f in CRITICAL_FIELDS:
        if not opp.get(f):
            return f"missing {f}"
    if status == "EXPIRED":
        return "expired opportunity"
    if len(opp.get("title", "")) < 8:
        return "missing meaningful title"
    if len(opp.get("description", "")) < 80:
        return "insufficient content"
    # spam / disguised-ad heuristics
    spammy = ("earn money fast", "click here to win", "work from home guaranteed income",
              "no skills required earn", "congratulations you won")
    blob = normalize_text(opp.get("title", "") + " " + opp.get("description", ""))
    if any(s in blob for s in spammy):
        return "promotional spam"
    return None


def evaluate(opp: dict):
    """Run the full automated verification pipeline for a single record.

    Returns (should_publish: bool, score: int, status: str, reason: str|None).
    """
    status = compute_status(opp)
    score = confidence_score(opp)
    reason = critical_failure(opp, status)
    if reason:
        return False, score, "REJECTED", reason
    # 90-100 auto publish; 75-89 publish if mandatory fields present; <75 reject
    if score >= 90:
        return True, score, status, None
    if score >= 75:
        has_mandatory = opp.get("title") and opp.get("organization") and opp.get("source_url")
        return bool(has_mandatory), score, status if has_mandatory else "REJECTED", None if has_mandatory else "low quality"
    return False, score, "REJECTED", "below quality threshold"

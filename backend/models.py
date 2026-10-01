"""Pydantic models and Mongo helpers for PAKOPPS."""
from __future__ import annotations

from datetime import datetime, timezone
from typing import Annotated, Any, List, Optional

from bson import ObjectId
from pydantic import BaseModel, BeforeValidator, ConfigDict, Field

PyObjectId = Annotated[str, BeforeValidator(str)]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True, extra="ignore")

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        data = self.model_dump(by_alias=True, exclude_none=True)
        data.pop("_id", None)
        return data

    @classmethod
    def from_mongo(cls, doc: dict):
        if not doc:
            return None
        return cls(**doc)


# ---- Opportunity ----
class Opportunity(BaseDocument):
    slug: str
    title: str
    opportunity_type: str                 # jobs | scholarships | internships | admissions | fellowships ...
    category: str                         # canonical category slug
    sub_category: Optional[str] = None
    organization: str
    organization_description: Optional[str] = None
    source_name: str
    source_url: str
    official_url: Optional[str] = None
    application_url: Optional[str] = None

    location: Optional[str] = None
    province: Optional[str] = None
    city: Optional[str] = None
    country: str = "Pakistan"
    remote_status: Optional[str] = None   # On-site | Remote | Hybrid
    employment_type: Optional[str] = None # Full-time | Part-time | Contract | Internship

    education_level: Optional[str] = None # Matric | Intermediate | Bachelor ...
    qualification: Optional[str] = None
    field_of_study: Optional[str] = None
    experience_required: Optional[str] = None
    age_limit: Optional[str] = None
    gender_eligibility: Optional[str] = None
    nationality_requirement: Optional[str] = None

    vacancies: Optional[str] = None
    salary: Optional[str] = None
    stipend: Optional[str] = None
    benefits: Optional[List[str]] = None
    application_fee: Optional[str] = None

    funding_type: Optional[str] = None    # scholarships
    study_level: Optional[str] = None
    tuition_coverage: Optional[str] = None
    living_allowance: Optional[str] = None

    opening_date: Optional[str] = None
    deadline: Optional[str] = None        # YYYY-MM-DD

    description: str
    eligibility: Optional[List[str]] = None
    requirements: Optional[List[str]] = None
    documents_required: Optional[List[str]] = None
    how_to_apply: Optional[List[str]] = None
    contact_information: Optional[str] = None

    # internal flags
    is_government: bool = False
    is_remote: bool = False
    is_international: bool = False
    is_fully_funded: bool = False
    source_closed: bool = False
    is_demo: bool = True

    # lifecycle / internal (not all exposed publicly)
    status: str = "PUBLISHED"
    verification_status: str = "Verified"
    confidence_score: int = 0
    content_hash: Optional[str] = None
    source_hash: Optional[str] = None

    source_last_checked: str = Field(default_factory=now_iso)
    discovered_at: str = Field(default_factory=now_iso)
    published_at: str = Field(default_factory=now_iso)
    updated_at: str = Field(default_factory=now_iso)


# ---- Report ----
class ReportCreate(BaseModel):
    opportunity_url: str = Field(..., max_length=500)
    issue_type: str = Field(..., max_length=60)
    message: str = Field(..., min_length=5, max_length=3000)


class Report(BaseDocument):
    opportunity_url: str
    issue_type: str
    message: str
    created_at: str = Field(default_factory=now_iso)
    resolved: bool = False


# ---- Contact ----
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: str = Field(..., max_length=180)
    subject: str = Field(..., min_length=2, max_length=200)
    message: str = Field(..., min_length=5, max_length=3000)


class Contact(BaseDocument):
    name: str
    email: str
    subject: str
    message: str
    created_at: str = Field(default_factory=now_iso)


# ---- Search log ----
class SearchLog(BaseDocument):
    query: str
    category: Optional[str] = None
    results_count: int = 0
    created_at: str = Field(default_factory=now_iso)

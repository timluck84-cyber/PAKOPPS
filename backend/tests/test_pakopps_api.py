"""PAKOPPS backend API tests."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://career-hub-pk-1.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

PRIVATE_FIELDS = {"confidence_score", "content_hash", "source_hash"}

EXPECTED_CATEGORIES = {
    "jobs", "government-jobs", "private-jobs", "remote-jobs", "internships",
    "scholarships", "fully-funded-scholarships", "admissions", "fellowships",
    "training-programs", "apprenticeships", "entry-tests", "competitive-exams",
    "government-programs", "international-opportunities",
}

EXPIRED_SLUG = "accounts-officer-bs-16-provincial-department-closed"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Config / taxonomy / stats ----------
def test_config(session):
    r = session.get(f"{API}/config")
    assert r.status_code == 200
    data = r.json()
    assert data["ads"]["enabled"] is False
    assert data["site_name"] == "PAKOPPS"


def test_taxonomy(session):
    r = session.get(f"{API}/taxonomy")
    assert r.status_code == 200
    d = r.json()
    for k in ("categories", "provinces", "cities", "qualifications", "experience", "popular_searches"):
        assert k in d and isinstance(d[k], list) and len(d[k]) > 0


def test_stats(session):
    r = session.get(f"{API}/stats")
    assert r.status_code == 200
    d = r.json()
    assert d["total_active"] > 0
    assert d["organizations"] > 0
    assert set(d["by_category"].keys()) == EXPECTED_CATEGORIES


# ---------- Home ----------
def test_home_sections(session):
    r = session.get(f"{API}/home")
    assert r.status_code == 200
    d = r.json()
    for k in ("latest", "closing_soon", "government_jobs", "private_jobs", "remote_jobs",
              "scholarships", "internships", "international", "popular_searches"):
        assert k in d, f"missing section {k}"
        assert isinstance(d[k], list)
    # No private fields exposed
    for item in d["latest"]:
        assert PRIVATE_FIELDS.isdisjoint(item.keys())
    # Expired record not present
    titles = [i["title"] for i in d["latest"] + d["government_jobs"] + d["closing_soon"]]
    assert not any("Closed" in t for t in titles)


# ---------- Opportunities listing ----------
def test_list_opportunities_default(session):
    r = session.get(f"{API}/opportunities")
    assert r.status_code == 200
    d = r.json()
    for k in ("items", "total", "page", "per_page", "total_pages"):
        assert k in d
    assert d["total"] > 0
    for item in d["items"]:
        assert PRIVATE_FIELDS.isdisjoint(item.keys())


def test_expired_excluded_by_default(session):
    r = session.get(f"{API}/opportunities", params={"per_page": 48})
    d = r.json()
    slugs = [i["slug"] for i in d["items"]]
    assert EXPIRED_SLUG not in slugs
    # with include_expired
    r2 = session.get(f"{API}/opportunities", params={"per_page": 48, "include_expired": "true"})
    slugs2 = [i["slug"] for i in r2.json()["items"]]
    # fetch all pages if needed
    found = EXPIRED_SLUG in slugs2
    if not found:
        total_pages = r2.json()["total_pages"]
        for p in range(2, total_pages + 1):
            rp = session.get(f"{API}/opportunities", params={"per_page": 48, "include_expired": "true", "page": p})
            if EXPIRED_SLUG in [i["slug"] for i in rp.json()["items"]]:
                found = True
                break
    assert found, "Expired record not reachable with include_expired=true"


def test_category_filter_government(session):
    r = session.get(f"{API}/opportunities", params={"category": "government-jobs", "per_page": 48})
    d = r.json()
    assert d["total"] > 0
    for i in d["items"]:
        assert i.get("opportunity_type") == "jobs"
        assert i.get("is_government") is True


def test_category_filter_remote(session):
    r = session.get(f"{API}/opportunities", params={"category": "remote-jobs", "per_page": 48})
    for i in r.json()["items"]:
        assert i.get("is_remote") is True


def test_category_filter_fully_funded(session):
    r = session.get(f"{API}/opportunities", params={"category": "fully-funded-scholarships", "per_page": 48})
    for i in r.json()["items"]:
        assert i.get("is_fully_funded") is True


def test_search_filters(session):
    r = session.get(f"{API}/opportunities", params={"q": "scholarship", "sort": "deadline", "page": 1, "per_page": 5})
    assert r.status_code == 200
    d = r.json()
    assert d["per_page"] == 5


def test_filters_province_remote(session):
    r = session.get(f"{API}/opportunities", params={"province": "Punjab"})
    for i in r.json()["items"]:
        assert i.get("province") == "Punjab"
    r2 = session.get(f"{API}/opportunities", params={"remote": "true"})
    for i in r2.json()["items"]:
        assert i.get("is_remote") is True


# ---------- Detail ----------
def test_opportunity_detail(session):
    # Pick a real slug from listing
    listing = session.get(f"{API}/opportunities", params={"per_page": 1}).json()
    slug = listing["items"][0]["slug"]
    r = session.get(f"{API}/opportunities/{slug}")
    assert r.status_code == 200
    d = r.json()
    assert d["slug"] == slug
    assert "related" in d and isinstance(d["related"], list)
    assert PRIVATE_FIELDS.isdisjoint(d.keys())
    for rel in d["related"]:
        assert PRIVATE_FIELDS.isdisjoint(rel.keys())


def test_opportunity_detail_404(session):
    r = session.get(f"{API}/opportunities/this-does-not-exist-xyz")
    assert r.status_code == 404


def test_expired_detail_accessible(session):
    r = session.get(f"{API}/opportunities/{EXPIRED_SLUG}")
    assert r.status_code == 200
    d = r.json()
    assert d["is_active"] is False or d.get("status") in ("Expired", "Closed")


# ---------- Autocomplete ----------
def test_autocomplete(session):
    r = session.get(f"{API}/autocomplete", params={"q": "sch"})
    assert r.status_code == 200
    d = r.json()
    for k in ("opportunities", "categories", "searches"):
        assert k in d and isinstance(d[k], list)


# ---------- Reports / Contact ----------
def test_report_ok(session):
    r = session.post(f"{API}/reports", json={
        "opportunity_url": "https://example.com/job",
        "issue_type": "expired",
        "message": "TEST_ This opportunity is already expired. Please remove."
    })
    assert r.status_code == 200
    assert r.json().get("ok") is True


def test_report_validation(session):
    r = session.post(f"{API}/reports", json={"opportunity_url": "", "issue_type": "", "message": "x"})
    assert r.status_code == 422


def test_contact_ok(session):
    r = session.post(f"{API}/contact", json={
        "name": "TEST User", "email": "test@example.com",
        "subject": "Hello PAKOPPS", "message": "TEST_ This is a test contact submission."
    })
    assert r.status_code == 200
    assert r.json().get("ok") is True


def test_contact_validation(session):
    r = session.post(f"{API}/contact", json={"name": "", "email": "notanemail", "subject": "", "message": ""})
    assert r.status_code == 422


# ---------- SEO ----------
def test_sitemap(session):
    r = session.get(f"{API}/sitemap.xml")
    assert r.status_code == 200
    assert "<urlset" in r.text
    assert "application/xml" in r.headers.get("content-type", "")


def test_robots(session):
    r = session.get(f"{API}/robots.txt")
    assert r.status_code == 200
    assert "Sitemap:" in r.text


# ---------- Career guides / Trust ----------
def test_career_guides_list(session):
    r = session.get(f"{API}/career-guides")
    assert r.status_code == 200
    assert isinstance(r.json(), list) and len(r.json()) > 0


def test_career_guide_detail(session):
    first = session.get(f"{API}/career-guides").json()[0]["slug"]
    r = session.get(f"{API}/career-guides/{first}")
    assert r.status_code == 200


def test_trust_pages(session):
    # Backend only exposes about, source-policy, editorial-policy via /api/trust/.
    # Other static pages (how-it-works, privacy-policy, terms, disclaimer) are rendered client-side.
    for slug in ("about", "source-policy", "editorial-policy"):
        r = session.get(f"{API}/trust/{slug}")
        assert r.status_code == 200, f"trust/{slug} failed"
    assert session.get(f"{API}/trust/unknown-xyz").status_code == 404

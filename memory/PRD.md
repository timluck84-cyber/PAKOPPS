# PAKOPPS — Product Requirements Document

## Original Problem Statement
Build PAKOPPS (Pakistan Opportunities Search Engine): a stunning, trustworthy, high-performance PUBLIC web platform that automatically discovers, categorizes, verifies, structures and publishes legitimate opportunities (jobs, scholarships, internships, admissions, fellowships, etc.) from public web sources, focused on Pakistan plus international opportunities for Pakistani applicants. No login/signup, no user dashboard, no admin panel. Automated quality/dedupe/expiry engines. SEO-optimized, mobile-first, AdSense-ready (ads disabled for now). Must remain genuinely useful even with ads off.

## Stack (adapted to environment)
- Frontend: React 19 (CRA/craco) + Tailwind + shadcn/ui + react-router + react-query
- Backend: FastAPI + MongoDB (Motor)
- AI: Emergent Universal LLM key via emergentintegrations (provider/model configurable via env; used by discovery pipeline's extraction step — not on user-facing request paths)
- Data: realistic DEMO seed (is_demo=true), ~36 records seeded idempotently on startup

## User Personas
- Pakistani students, fresh graduates, job seekers, professionals
- Scholarship/internship/admission seekers; Pakistani applicants seeking international opportunities

## Core Requirements (static)
- Public, anonymous, no auth, no admin panel
- Automated quality scoring, duplicate detection, lifecycle/expiry handling
- Factual-only structured content with source attribution + official link; never fabricate facts
- Powerful search + filters; premium detail pages; SEO; disabled ad slots; trust pages

## Architecture / Implemented (2026-06)
- Backend engines (`engines.py`): compute_status (NEW→PUBLISHED/CLOSING_SOON/EXPIRED/CLOSED), confidence_score (0–100, hidden publicly), content/source hashing (dedupe), critical-failure rejection, evaluate() pipeline
- Seed pipeline (`seed.py`): ~36 curated opportunities across all 15 categories incl. 1 intentionally expired record; each passed through engines; dedupe via unique content_hash index
- API (`routes.py`): /config, /taxonomy, /stats, /home, /opportunities (filters+sort+pagination+search), /opportunities/{slug} (+related), /autocomplete, /career-guides(+slug), /trust/{slug}, /reports, /contact, /sitemap.xml, /robots.txt. Internal fields stripped from all public responses. Expired hidden by default.
- Frontend: Home (hero, search, quick categories, stat counters, 8 opportunity sections, popular searches, browse-by, info cards), Listing (search + 15 category landing pages w/ unique intro + FAQ schema, filters, sort, pagination, empty state), premium OpportunityDetail (quick-facts, structured sections, JobPosting JSON-LD only for active jobs, source attribution, closed-banner for expired, related), Career Guides (7 guides), 7 trust/legal pages, Contact + Report forms, 404. Dark mode, mobile-first, data-testid coverage.
- SEO: dynamic title/meta/OG/Twitter/canonical/robots per page, JSON-LD (Organization, WebSite+SearchAction, BreadcrumbList, JobPosting, FAQ, Article), backend sitemap.xml + robots.txt, noindex on /search & report form & expired detail pages.
- Ads: centralized AdSlot (Top/InFeed/Sidebar/InContent/Bottom) driven by env ADS_ENABLED=false → policy-compliant disabled placeholders, no scripts loaded.

## Testing
- iteration_1: 24/24 backend pytest passing; 100% frontend flows; 0 defects. Backend tests at /app/backend/tests/test_pakopps_api.py.

## Backlog (prioritized)
- P1: Wire live discovery providers (search API + crawler) + schedule via cron skill; invoke AI extraction on real raw pages
- P1: MongoDB text index + relevance ranking when real data scales
- P2: Google Analytics / AdSense client id activation via env; cookie consent banner
- P2: Programmatic landing pages for city+category combos (only where enough content)
- P2: Move seed records to JSON for cleaner separation

## Notes
- AI extraction module present + provider-abstracted but not called on user paths (seed pre-structured).
- Contact email is placeholder (contact@pakopps.com) via CONTACT_EMAIL env.

// Full content for trust / legal / info pages. Genuinely useful, not filler.

export const STATIC_PAGES = {
    "about": {
        title: "About PAKOPPS",
        updated: "June 2026",
        intro: "PAKOPPS (Pakistan Opportunities Search Engine) is an automated public platform that discovers, verifies and structures legitimate opportunities from publicly available sources across the web.",
        sections: [
            { heading: "What the platform does", body: "PAKOPPS continuously discovers opportunities — jobs, government jobs, scholarships, internships, admissions, fellowships and more — from public sources. We extract the factual details, present them in a clean, consistent structure, and link you to the original official source so you can apply directly." },
            { heading: "Who it serves", body: "We serve Pakistani students, fresh graduates, job seekers and professionals, as well as Pakistani applicants seeking international opportunities. The entire platform is free and works anonymously — no registration, no login, no personal dashboard." },
            { heading: "How opportunities are discovered", body: "An automated discovery engine runs on a schedule, using legitimate public-web methods such as public careers pages, scholarship pages, university admission pages and public announcements. We respect robots restrictions, terms of use and copyright, and we do not bypass logins, paywalls or security mechanisms." },
            { heading: "How information is processed", body: "Every discovered item passes through an automated quality and verification pipeline. We check source accessibility, organisation identifiability, content quality, deadlines and application methods, and we detect duplicates. Weak, duplicate, incomplete, suspicious or expired items are rejected rather than published." },
            { heading: "How source attribution works", body: "We never reproduce entire source articles. We extract the facts and present them in our own structure, and every opportunity clearly names its source and links to the official page. We are not the employer, university or scholarship provider." },
            { heading: "How you should verify information", body: "Always open the official source and confirm the deadline, eligibility and application link before applying. If you spot an error, please use our Report an Opportunity form." },
        ],
    },
    "how-it-works": {
        title: "How It Works",
        updated: "June 2026",
        intro: "PAKOPPS automates the entire journey from discovery to a clean, verified opportunity page — so you can search, compare and apply with confidence.",
        sections: [
            { heading: "1. Automated discovery", body: "Our discovery engine runs on a schedule and finds opportunities from public sources using configurable search queries and source domains across categories and locations." },
            { heading: "2. Extraction & transformation", body: "We extract factual information and transform it into a structured opportunity page with sections like Quick Summary, Who Can Apply, Important Dates and Application Process. We never invent facts; missing information is marked as 'Not specified by source'." },
            { heading: "3. Automated verification", body: "Each item is scored on source quality, completeness, consistency and legitimacy. Items that fail critical checks — expired, duplicate, spam-like, missing a title or organisation, or inaccessible source — are rejected automatically." },
            { heading: "4. Duplicate detection", body: "When multiple sites report the same opportunity, we create a single canonical page and keep source references internally, so you never wade through thin duplicate pages." },
            { heading: "5. Lifecycle & expiry", body: "Every opportunity has a lifecycle. A scheduled process marks items as Closing Soon or Expired based on deadlines. Expired items are removed from active listings and search by default." },
            { heading: "6. You verify and apply", body: "Each page links to the official source. Always verify the final details there before applying." },
        ],
    },
    "source-policy": {
        title: "Source Policy",
        updated: "June 2026",
        intro: "We aggregate publicly available opportunity information and link users to the original/official source. Users should verify important details before applying.",
        sections: [
            { heading: "Public sources only", body: "We discover opportunities from publicly accessible pages, public announcements, RSS/XML feeds where available, and official careers, scholarship and admission pages. We do not access private, authenticated or paywalled content." },
            { heading: "Respecting source rights", body: "We respect robots restrictions, terms of use and copyright. We do not copy entire articles; we extract factual information and present it in our own structured format with clear attribution." },
            { heading: "Attribution & linking", body: "Every opportunity names its source and, where available, links to the official source page. Outbound links open normally — we never frame external websites in iframes." },
            { heading: "Corrections", body: "If a source indicates an opportunity has closed or changed, our system updates or removes it. You can also report issues via the Report an Opportunity form." },
        ],
    },
    "editorial-policy": {
        title: "Editorial & Quality Policy",
        updated: "June 2026",
        intro: "Because PAKOPPS has no manual approval workflow, quality is enforced automatically. This policy explains how we keep listings trustworthy.",
        sections: [
            { heading: "Automated validation", body: "Every opportunity is evaluated for a clear title, identifiable organisation, meaningful description, available deadline where applicable, and a valid application method. Items failing these checks are not published." },
            { heading: "Confidence scoring", body: "We compute an internal confidence score from source trust and completeness. High-confidence items are published; low-confidence or critically-flawed items are rejected. The internal score is never shown publicly." },
            { heading: "Duplicate detection", body: "We detect duplicates using source URLs, canonical URLs, title and description similarity, organisation, deadline and content hashing — producing one canonical page per opportunity." },
            { heading: "Expiry handling", body: "A scheduled expiry process marks opportunities as Expired or Closed. Expired jobs are removed from active JobPosting structured data and hidden from default listings, but may remain as historical information marked 'Applications Closed'." },
            { heading: "No fabricated data", body: "We never invent salaries, deadlines, eligibility, vacancies, organisations or application links. If a fact cannot be confidently extracted, it is omitted or marked unavailable." },
        ],
    },
    "privacy-policy": {
        title: "Privacy Policy",
        updated: "June 2026",
        intro: "We respect your privacy and collect as little personal data as possible. PAKOPPS works anonymously — there are no user accounts.",
        sections: [
            { heading: "Information we collect", body: "We do not require registration and do not collect names, passwords or profiles. We may collect anonymised, aggregate usage data (such as page views, searches and device type) to improve the service." },
            { heading: "Forms you submit", body: "If you use the Contact or Report an Opportunity forms, we store the details you provide solely to respond to or act on your message." },
            { heading: "Cookies & analytics", body: "We may use privacy-conscious analytics and, in future, advertising. Where consent is required under applicable law, we will request it. You can control cookies through your browser settings." },
            { heading: "Third-party links", body: "Opportunity pages link to official external sources. Those websites have their own privacy policies, which we do not control." },
            { heading: "Contact", body: "For any privacy questions, please reach us through the Contact page." },
        ],
    },
    "terms": {
        title: "Terms of Service",
        updated: "June 2026",
        intro: "By using PAKOPPS you agree to these terms. Please read them carefully.",
        sections: [
            { heading: "Nature of the service", body: "PAKOPPS is an information and search platform. We are not an employer, recruiter, university or scholarship provider, and we do not process applications. We link you to official sources." },
            { heading: "No warranty on third-party information", body: "We work hard to keep information accurate and current, but opportunities originate from third-party sources that may change. Always verify details on the official source before acting." },
            { heading: "Acceptable use", body: "You agree not to misuse the platform, attempt to disrupt it, or use it for unlawful purposes. Automated scraping of our pages is not permitted." },
            { heading: "Limitation of liability", body: "We are not liable for decisions made based on information found via the platform, or for the content or availability of external sources." },
            { heading: "Changes", body: "We may update these terms from time to time. Continued use constitutes acceptance of the updated terms." },
        ],
    },
    "disclaimer": {
        title: "Disclaimer",
        updated: "June 2026",
        intro: "Important information about how to use PAKOPPS safely and responsibly.",
        sections: [
            { heading: "Always verify on the official source", body: "Every opportunity links to its official source. Deadlines, eligibility and application methods can change — confirm them on the official page before applying." },
            { heading: "Beware of scams", body: "Legitimate employers and scholarship providers never ask for fees to be paid into personal accounts. Treat unrealistic offers and upfront-payment requests as warning signs." },
            { heading: "Not an endorsement", body: "Listing an opportunity on PAKOPPS is not an endorsement of the organisation or offer. We present publicly available information for your convenience." },
            { heading: "No guarantee of outcomes", body: "We do not guarantee employment, admission, funding or any particular outcome from using the platform." },
        ],
    },
};

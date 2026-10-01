"""Static configuration: taxonomy, source config, career guides and trust content.

Source domains, queries, categories and crawl frequency live here (config-driven),
not hardcoded across the app, per the discovery-engine requirement.
"""

# ---------------- Taxonomy ----------------
CATEGORIES = [
    {"slug": "jobs", "label": "Jobs", "type": "jobs", "icon": "briefcase"},
    {"slug": "government-jobs", "label": "Government Jobs", "type": "jobs", "icon": "landmark"},
    {"slug": "private-jobs", "label": "Private Jobs", "type": "jobs", "icon": "building-2"},
    {"slug": "remote-jobs", "label": "Remote Jobs", "type": "jobs", "icon": "wifi"},
    {"slug": "internships", "label": "Internships", "type": "internships", "icon": "graduation-cap"},
    {"slug": "scholarships", "label": "Scholarships", "type": "scholarships", "icon": "award"},
    {"slug": "fully-funded-scholarships", "label": "Fully Funded Scholarships", "type": "scholarships", "icon": "wallet"},
    {"slug": "admissions", "label": "Admissions", "type": "admissions", "icon": "school"},
    {"slug": "fellowships", "label": "Fellowships", "type": "fellowships", "icon": "users"},
    {"slug": "training-programs", "label": "Training Programs", "type": "training-programs", "icon": "clipboard-list"},
    {"slug": "apprenticeships", "label": "Apprenticeships", "type": "apprenticeships", "icon": "wrench"},
    {"slug": "entry-tests", "label": "Entry Tests", "type": "entry-tests", "icon": "file-check"},
    {"slug": "competitive-exams", "label": "Competitive Exams", "type": "competitive-exams", "icon": "trophy"},
    {"slug": "government-programs", "label": "Government Programs", "type": "government-programs", "icon": "flag"},
    {"slug": "international-opportunities", "label": "International Opportunities", "type": "international", "icon": "globe"},
]

PROVINCES = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad", "Gilgit-Baltistan", "Azad Kashmir"]
CITIES = ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Gujranwala", "Sialkot", "Hyderabad", "Abbottabad"]
QUALIFICATIONS = ["Matric", "Intermediate", "Diploma", "Bachelor", "Master", "MPhil", "PhD"]
EXPERIENCE = ["No experience", "Fresh graduate", "1-2 years", "2-5 years", "5+ years"]

POPULAR_SEARCHES = [
    "Government jobs 2026", "Fully funded scholarships", "IT jobs Lahore", "Bank jobs Pakistan",
    "Remote jobs", "PhD scholarships", "Internships Islamabad", "Teaching jobs Punjab",
    "Fresh graduate jobs", "FPSC jobs", "HEC scholarships", "Masters scholarships abroad",
]

# ---------------- Source / discovery configuration ----------------
SOURCE_CONFIG = {
    "providers": ["search_engine", "rss", "public_pages"],
    "crawl_frequency_hours": {"discovery": 2, "expiry": 1, "source_recheck": 12},
    "query_templates": [
        "Pakistan jobs {year}", "Pakistan government jobs {year}", "{province} government jobs {year}",
        "{city} jobs {year}", "bank jobs Pakistan", "teaching jobs Pakistan", "IT jobs Pakistan",
        "fresh graduate jobs Pakistan", "internships Pakistan", "remote jobs Pakistan",
        "fully funded scholarships {year}", "Pakistan scholarships {year}", "PhD scholarships Pakistan",
        "Masters scholarships Pakistan", "university admissions Pakistan", "fellowships Pakistan",
    ],
    "trusted_domains": [
        "fpsc.gov.pk", "ppsc.gop.pk", "spsc.gov.pk", "kppsc.gov.pk", "nts.org.pk",
        "hec.gov.pk", "fulbright.org", "chevening.org", "daad.de", "commonwealth.org",
    ],
    "respects": ["robots.txt", "terms_of_use", "no_captcha_bypass", "no_paywall_bypass"],
}

# ---------------- Career guides ----------------
CAREER_GUIDES = [
    {
        "slug": "how-to-make-a-professional-cv",
        "title": "How to Make a Professional CV in Pakistan (2026 Guide)",
        "excerpt": "A step-by-step guide to building a clean, ATS-friendly CV that gets shortlisted by Pakistani employers and international recruiters.",
        "read_time": "8 min read",
        "category": "CV & Resume",
        "sections": [
            {"heading": "Start with a clear professional summary", "body": "Open your CV with 2-3 lines describing who you are, your strongest skill, and the role you are targeting. Recruiters in Pakistan often scan the top third of the first page, so lead with your most relevant qualification and experience. Avoid generic phrases like 'hardworking team player' and instead state concrete strengths, e.g. 'Final-year Computer Science student with hands-on experience in React and Python.'"},
            {"heading": "Keep formatting simple and ATS-friendly", "body": "Many large organisations and banks use applicant tracking systems. Use a single-column layout, standard fonts (Calibri, Arial), clear section headings, and avoid tables, images or text boxes which parsers struggle to read. Save and submit as PDF unless the employer specifically asks for Word."},
            {"heading": "Quantify your achievements", "body": "Numbers build credibility. Instead of 'managed social media', write 'grew the page from 2,000 to 15,000 followers in 6 months'. For fresh graduates, quantify academic projects, volunteer work, or competition results."},
            {"heading": "Tailor the CV to each opportunity", "body": "Read the advertisement carefully and mirror its key requirements in your skills and experience sections. A CV tuned to the job description dramatically improves shortlisting chances."},
            {"heading": "Proofread and verify contact details", "body": "A single typo in your email or phone number can cost you an interview. Proofread twice, and make sure your email address looks professional."},
        ],
    },
    {
        "slug": "how-to-prepare-for-an-interview",
        "title": "How to Prepare for a Job Interview",
        "excerpt": "Practical interview preparation for fresh graduates and professionals, from research to common questions and follow-up.",
        "read_time": "7 min read",
        "category": "Interviews",
        "sections": [
            {"heading": "Research the organisation", "body": "Before the interview, read the organisation's official website, recent news, and the exact job description. Understanding their mission and products lets you answer 'why do you want to work here?' with specifics instead of generic flattery."},
            {"heading": "Prepare for common questions", "body": "Practice answers for 'tell me about yourself', 'what are your strengths and weaknesses', and 'where do you see yourself in five years'. Use the STAR method (Situation, Task, Action, Result) for behavioural questions."},
            {"heading": "Prepare questions to ask", "body": "Interviewers expect you to ask thoughtful questions about the role, team, and growth opportunities. This signals genuine interest and professionalism."},
            {"heading": "Dress and arrive appropriately", "body": "Dress formally and plan to arrive 10-15 minutes early. For online interviews, test your internet, camera, and microphone beforehand and choose a quiet, well-lit space."},
        ],
    },
    {
        "slug": "how-to-find-government-jobs-in-pakistan",
        "title": "How to Find Government Jobs in Pakistan",
        "excerpt": "Understand FPSC, PPSC, SPSC, KPPSC and NTS recruitment, how to apply correctly, and how to avoid missing deadlines.",
        "read_time": "9 min read",
        "category": "Government Jobs",
        "sections": [
            {"heading": "Know the main recruiting bodies", "body": "Federal posts are advertised by FPSC, while provincial posts go through PPSC (Punjab), SPSC (Sindh), KPPSC (Khyber Pakhtunkhwa) and BPSC (Balochistan). Many departments also test candidates through NTS. Always confirm advertisements on these official portals."},
            {"heading": "Check eligibility carefully", "body": "Government advertisements list precise age limits, domicile, quota, and qualification requirements. Read these before applying - ineligible applications are rejected without refund of the fee."},
            {"heading": "Apply before the deadline", "body": "Government deadlines are strict. Submit your online application and deposit the challan fee early to avoid last-day portal congestion."},
            {"heading": "Prepare for the written test", "body": "Most posts require a screening test covering general knowledge, English, maths, Islamic/Pakistan studies and subject-specific MCQs. Past papers and official syllabi are the best preparation resources."},
        ],
    },
    {
        "slug": "how-to-apply-for-scholarships",
        "title": "How to Apply for Scholarships (Local & International)",
        "excerpt": "From HEC to Fulbright and Chevening, learn how to build a strong scholarship application and avoid common mistakes.",
        "read_time": "10 min read",
        "category": "Scholarships",
        "sections": [
            {"heading": "Start early and track deadlines", "body": "Strong scholarship applications take weeks. Fully funded programmes like Fulbright, Chevening, DAAD and Commonwealth open months before their deadlines. Maintain a calendar of opening and closing dates."},
            {"heading": "Meet every eligibility requirement", "body": "Check academic criteria, CGPA, language test scores (IELTS/TOEFL), and nationality requirements. Applying when ineligible wastes effort - focus on scholarships you genuinely qualify for."},
            {"heading": "Write a compelling statement of purpose", "body": "Your personal statement should clearly explain your goals, why the programme fits them, and how you will contribute back. Be specific and authentic rather than using templates."},
            {"heading": "Secure strong references", "body": "Request recommendation letters early from professors or employers who know your work well. Give them your CV and goals so they can write specific, convincing letters."},
            {"heading": "Always verify on the official source", "body": "Scholarship scams are common. Legitimate scholarships never ask for processing fees via personal accounts. Always apply through the official provider's portal."},
        ],
    },
    {
        "slug": "how-to-identify-fake-job-advertisements",
        "title": "How to Identify Fake Job Advertisements & Scams",
        "excerpt": "Red flags that reveal fraudulent job and scholarship ads, and how to protect yourself and your money.",
        "read_time": "6 min read",
        "category": "Safety",
        "sections": [
            {"heading": "Be suspicious of upfront payments", "body": "No legitimate employer asks you to pay a 'registration', 'training', or 'security' fee to get a job. Government fees are always deposited via official bank challans, never to personal accounts."},
            {"heading": "Watch for unrealistic salaries", "body": "Offers promising very high salaries for little work or no qualifications are almost always scams. If it sounds too good to be true, it usually is."},
            {"heading": "Verify the organisation and contact details", "body": "Check whether the organisation exists, has an official website, and uses an official domain email. Generic Gmail/Hotmail addresses and WhatsApp-only communication are warning signs."},
            {"heading": "Confirm on the official source", "body": "Always cross-check the advertisement on the organisation's official careers page or the relevant public service commission portal before sharing documents or money."},
        ],
    },
    {
        "slug": "best-skills-for-fresh-graduates",
        "title": "Best Skills for Fresh Graduates in Pakistan",
        "excerpt": "The in-demand technical and soft skills that help fresh graduates stand out in a competitive job market.",
        "read_time": "7 min read",
        "category": "Career Growth",
        "sections": [
            {"heading": "Build a core technical skill", "body": "Whether it is programming, data analysis, digital marketing, accounting software, or design tools, employers value a demonstrable technical skill. Pick one aligned with your field and build a small portfolio of projects."},
            {"heading": "Develop communication skills", "body": "Clear written and spoken English, plus professional email etiquette, are consistently requested by Pakistani and international employers. Practice regularly and seek feedback."},
            {"heading": "Learn remote-work tools", "body": "Familiarity with tools like Git, Slack, Trello, Zoom and Google Workspace makes you ready for the growing remote job market."},
            {"heading": "Earn recognised certifications", "body": "Free and affordable certifications (Google, Coursera, Microsoft) add credibility to your CV and show initiative."},
        ],
    },
    {
        "slug": "how-to-apply-for-remote-jobs",
        "title": "How to Apply for Remote Jobs from Pakistan",
        "excerpt": "A practical roadmap to landing legitimate remote and freelance roles with international and local companies.",
        "read_time": "8 min read",
        "category": "Remote Work",
        "sections": [
            {"heading": "Set up a professional online presence", "body": "A polished LinkedIn profile and, for technical roles, a GitHub or portfolio site, are essential. Remote employers assess you largely through your online footprint."},
            {"heading": "Target genuinely remote-friendly roles", "body": "Look for advertisements that explicitly mention remote or work-from-home arrangements and clarify the time zone expectations before applying."},
            {"heading": "Prepare for asynchronous communication", "body": "Remote teams value clear, written updates. Demonstrate that you can communicate progress without constant supervision."},
            {"heading": "Protect yourself from remote scams", "body": "Never pay to work, and verify the company through its official website and employee reviews before sharing personal documents."},
        ],
    },
]

# ---------------- Trust pages (served to frontend) ----------------
TRUST_PAGES = {
    "about": {
        "title": "About PAKOPPS",
        "intro": "PAKOPPS (Pakistan Opportunities Search Engine) is an automated public platform that discovers, verifies and structures legitimate opportunities from publicly available sources across the web - jobs, government jobs, scholarships, internships, admissions and fellowships relevant to Pakistani applicants.",
    },
    "source-policy": {
        "title": "Source Policy",
        "intro": "We aggregate publicly available opportunity information and link users to the original/official source. Users should verify important details before applying.",
    },
    "editorial-policy": {
        "title": "Editorial & Quality Policy",
        "intro": "Every opportunity on PAKOPPS passes through an automated verification pipeline covering source accessibility, duplicate detection, quality scoring and expiry handling before publication.",
    },
}

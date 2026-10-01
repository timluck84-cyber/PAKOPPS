// Shared constants: navigation, category metadata, programmatic-SEO content.

export const NAV_LINKS = [
    { label: "Jobs", to: "/jobs" },
    { label: "Govt Jobs", to: "/government-jobs" },
    { label: "Private Jobs", to: "/private-jobs" },
    { label: "Remote", to: "/remote-jobs" },
    { label: "Scholarships", to: "/scholarships" },
    { label: "Internships", to: "/internships" },
    { label: "Admissions", to: "/admissions" },
    { label: "Fellowships", to: "/fellowships" },
];

export const QUICK_CATEGORIES = [
    { label: "Jobs", to: "/jobs", icon: "briefcase" },
    { label: "Government Jobs", to: "/government-jobs", icon: "landmark" },
    { label: "Private Jobs", to: "/private-jobs", icon: "building-2" },
    { label: "Remote Jobs", to: "/remote-jobs", icon: "wifi" },
    { label: "Scholarships", to: "/scholarships", icon: "award" },
    { label: "Internships", to: "/internships", icon: "graduation-cap" },
    { label: "Admissions", to: "/admissions", icon: "school" },
    { label: "Fellowships", to: "/fellowships", icon: "users" },
];

// Unique intro + FAQs per category for genuine, non-thin landing pages.
export const CATEGORY_CONTENT = {
    "jobs": {
        title: "Jobs in Pakistan",
        intro: "Browse the latest job openings across Pakistan from public and private organisations. Every listing links to the official source so you can verify details and apply directly.",
        faqs: [
            { q: "How often are jobs updated?", a: "Our discovery engine refreshes listings continuously and automatically removes expired postings so you only see active opportunities." },
            { q: "Is there any fee to apply?", a: "PAKOPPS is completely free. Any application fee is set by the employer and is listed on the official source." },
        ],
    },
    "government-jobs": {
        title: "Government Jobs in Pakistan",
        intro: "Find the latest federal and provincial government jobs advertised through FPSC, PPSC, SPSC, KPPSC, NTS and public departments. Each listing links to the official notification.",
        faqs: [
            { q: "Where are government jobs advertised?", a: "Federal posts appear via FPSC and provincial posts via the respective public service commissions. Always confirm on the official portal before applying." },
            { q: "How do I pay the application fee?", a: "Government fees are deposited through official bank challans only, never to personal accounts." },
        ],
    },
    "private-jobs": {
        title: "Private Sector Jobs in Pakistan",
        intro: "Explore private-sector career openings from leading Pakistani companies, banks and tech firms. Listings include role requirements, location and a direct link to apply.",
        faqs: [
            { q: "Are these jobs verified?", a: "Each listing passes an automated quality check and links to the employer's official careers page for verification." },
        ],
    },
    "remote-jobs": {
        title: "Remote Jobs in Pakistan",
        intro: "Discover work-from-home and remote roles open to candidates based in Pakistan, including fully remote positions with local and international employers.",
        faqs: [
            { q: "Are remote jobs legitimate?", a: "We screen listings for common scam signals, but you should always verify the employer and never pay to work." },
        ],
    },
    "internships": {
        title: "Internships in Pakistan",
        intro: "Kick-start your career with internships from top organisations. Find paid and experience-based internships for students and fresh graduates across fields.",
        faqs: [{ q: "Who can apply for internships?", a: "Most internships are open to current students or recent graduates. Check the eligibility on each listing." }],
    },
    "scholarships": {
        title: "Scholarships for Pakistani Students",
        intro: "Find local and international scholarships for undergraduate, master's and PhD studies. Each scholarship shows funding type, eligibility and the official application link.",
        faqs: [{ q: "How can I avoid scholarship scams?", a: "Legitimate scholarships never ask for processing fees via personal accounts. Always apply through the official provider." }],
    },
    "fully-funded-scholarships": {
        title: "Fully Funded Scholarships for Pakistani Students",
        intro: "Explore fully funded scholarships covering tuition, living stipend and travel - including Fulbright, Chevening, DAAD, Turkiye Burslari and the Chinese Government Scholarship.",
        faqs: [{ q: "What does fully funded mean?", a: "Fully funded scholarships typically cover tuition, a living allowance and often travel and insurance. Exact coverage is listed on each opportunity." }],
    },
    "admissions": {
        title: "University Admissions in Pakistan",
        intro: "Stay updated on open admissions at Pakistani universities, including entry-test schedules, deadlines and application links for undergraduate and graduate programmes.",
        faqs: [{ q: "Do I need an entry test?", a: "Many universities require an entry test such as NET, ECAT or an institutional test. Requirements are listed on each admission." }],
    },
    "fellowships": {
        title: "Fellowships in Pakistan",
        intro: "Find research, policy and postdoctoral fellowships offering stipends and professional development for graduates and early-career researchers.",
        faqs: [{ q: "Who offers fellowships?", a: "Fellowships are offered by research institutes, universities and government bodies. Each listing links to the official programme." }],
    },
    "training-programs": {
        title: "Training Programs in Pakistan",
        intro: "Build in-demand skills with free and subsidised training programmes in IT, freelancing, vocational trades and professional development.",
        faqs: [{ q: "Are these trainings free?", a: "Many government-backed programmes like DigiSkills and NAVTTC are free. Check each listing for details." }],
    },
    "apprenticeships": {
        title: "Apprenticeships in Pakistan",
        intro: "Gain hands-on technical experience through apprenticeship programmes with stipends and recognised completion certificates.",
        faqs: [{ q: "Do apprenticeships pay a stipend?", a: "Most apprenticeships offer a monthly stipend. The amount is listed on each opportunity where available." }],
    },
    "entry-tests": {
        title: "Entry Tests in Pakistan",
        intro: "Track registration and schedules for major entry tests including MDCAT, ECAT and university admission tests, with official links and deadlines.",
        faqs: [{ q: "When should I register?", a: "Register early, as entry-test portals often close before the exam date. Deadlines are shown on each listing." }],
    },
    "competitive-exams": {
        title: "Competitive Exams in Pakistan",
        intro: "Find registration details for competitive examinations such as CSS and other public service tests, including eligibility and official links.",
        faqs: [{ q: "What is the CSS exam?", a: "CSS is the Central Superior Services examination conducted by FPSC for recruitment to Pakistan's civil service groups." }],
    },
    "government-programs": {
        title: "Government Programs in Pakistan",
        intro: "Discover public welfare, youth and development programmes offering loans, training and support, with eligibility criteria and official application links.",
        faqs: [{ q: "Are these programmes free to apply?", a: "Government programmes do not charge application fees to personal accounts. Apply only through official portals." }],
    },
    "international-opportunities": {
        title: "International Opportunities for Pakistani Applicants",
        intro: "Explore international scholarships, remote jobs and programmes open to Pakistani applicants, with eligibility and official application links.",
        faqs: [{ q: "Can Pakistani students apply?", a: "Yes. These opportunities explicitly welcome Pakistani applicants. Always confirm nationality eligibility on the official source." }],
    },
};

export const SORT_OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "deadline", label: "Deadline" },
    { value: "relevance", label: "Relevance" },
];

export const FOOTER = {
    Explore: [
        { label: "Jobs", to: "/jobs" },
        { label: "Scholarships", to: "/scholarships" },
        { label: "Internships", to: "/internships" },
        { label: "Admissions", to: "/admissions" },
        { label: "Government Jobs", to: "/government-jobs" },
        { label: "Remote Jobs", to: "/remote-jobs" },
    ],
    Resources: [
        { label: "Career Guides", to: "/career-guides" },
        { label: "How It Works", to: "/how-it-works" },
        { label: "Source Policy", to: "/source-policy" },
        { label: "Editorial Policy", to: "/editorial-policy" },
        { label: "Report an Opportunity", to: "/report-an-opportunity" },
    ],
    Company: [
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
        { label: "Privacy Policy", to: "/privacy-policy" },
        { label: "Terms", to: "/terms" },
        { label: "Disclaimer", to: "/disclaimer" },
    ],
};

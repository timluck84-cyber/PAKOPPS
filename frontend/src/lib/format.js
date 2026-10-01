// Date / display helpers.

export function formatDate(value) {
    if (!value || value === "Not specified by source") return "Not specified by source";
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function daysUntil(value) {
    if (!value) return null;
    const d = new Date(value);
    if (isNaN(d)) return null;
    const diff = Math.ceil((d - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
}

export function deadlineLabel(value) {
    const n = daysUntil(value);
    if (n === null) return null;
    if (n < 0) return "Closed";
    if (n === 0) return "Closes today";
    if (n === 1) return "1 day left";
    if (n <= 7) return `${n} days left`;
    return formatDate(value);
}

export const NA = "Not specified by source";
export function show(v) {
    if (v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) return NA;
    return v;
}

export function categoryLabel(slug) {
    const map = {
        "jobs": "Job", "government-jobs": "Government Job", "private-jobs": "Private Job",
        "remote-jobs": "Remote Job", "internships": "Internship", "scholarships": "Scholarship",
        "fully-funded-scholarships": "Fully Funded Scholarship", "admissions": "Admission",
        "fellowships": "Fellowship", "training-programs": "Training Program",
        "apprenticeships": "Apprenticeship", "entry-tests": "Entry Test",
        "competitive-exams": "Competitive Exam", "government-programs": "Government Program",
        "international-opportunities": "International",
    };
    return map[slug] || "Opportunity";
}

// Map opportunity -> primary detail route prefix.
export function detailPath(opp) {
    return `/opportunities/${opp.slug}`;
}

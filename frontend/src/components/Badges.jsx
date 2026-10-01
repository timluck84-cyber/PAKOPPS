import { categoryLabel } from "@/lib/format";

const BASE = "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide";

export function Badge({ children, className = "", testId }) {
    return <span data-testid={testId} className={`${BASE} ${className}`}>{children}</span>;
}

export function OpportunityBadges({ opp, className = "" }) {
    const badges = [];
    if (opp.is_government) {
        badges.push(<Badge key="gov" className="border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">Government</Badge>);
    } else if (opp.opportunity_type === "jobs" && !opp.is_remote) {
        badges.push(<Badge key="pri" className="border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300">Private</Badge>);
    }
    if (opp.is_remote) {
        badges.push(<Badge key="rem" className="border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-300">Remote</Badge>);
    }
    if (opp.is_fully_funded) {
        badges.push(<Badge key="ff" className="border-purple-200 bg-purple-50 text-purple-800 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-300">Fully Funded</Badge>);
    }
    if (opp.is_international) {
        badges.push(<Badge key="intl" className="border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300">International</Badge>);
    }
    if (opp.status === "CLOSING_SOON") {
        badges.push(<Badge key="soon" className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300">Closing Soon</Badge>);
    }
    if (opp.status === "EXPIRED" || opp.status === "CLOSED") {
        badges.push(<Badge key="exp" className="border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">Applications Closed</Badge>);
    }
    return <div className={`flex flex-wrap gap-1.5 ${className}`}>{badges}</div>;
}

export function CategoryBadge({ opp }) {
    return (
        <Badge className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
            {categoryLabel(opp.category)}
        </Badge>
    );
}

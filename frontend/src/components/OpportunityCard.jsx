import { Link } from "react-router-dom";
import { MapPin, GraduationCap, CalendarClock, Clock, ArrowRight } from "lucide-react";
import { OpportunityBadges, CategoryBadge } from "@/components/Badges";
import { deadlineLabel, formatDate, show, detailPath } from "@/lib/format";

export default function OpportunityCard({ opp, index = 0 }) {
    const dl = deadlineLabel(opp.deadline);
    const closed = opp.status === "EXPIRED" || opp.status === "CLOSED";
    return (
        <article
            data-testid={`opportunity-card-${opp.slug}`}
            className="card-hover group flex h-full flex-col rounded-2xl border border-slate-200 bg-card p-5 shadow-sm hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:hover:border-slate-700"
        >
            <div className="mb-3 flex items-center justify-between gap-2">
                <CategoryBadge opp={opp} />
                {dl && (
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${opp.status === "CLOSING_SOON" ? "text-amber-600" : closed ? "text-slate-400" : "text-slate-500"}`}>
                        <CalendarClock className="h-3.5 w-3.5" /> {dl}
                    </span>
                )}
            </div>

            <h3 className="font-heading text-lg font-semibold leading-snug tracking-tight text-slate-900 dark:text-slate-100">
                <Link to={detailPath(opp)} data-testid={`opportunity-title-${opp.slug}`} className="transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
                    {opp.title}
                </Link>
            </h3>

            <p className="mt-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">{opp.organization}</p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{show(opp.location || opp.city || opp.country)}</span>
                {opp.education_level && <span className="inline-flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{opp.education_level}</span>}
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatDate(opp.published_at)}</span>
            </div>

            <OpportunityBadges opp={opp} className="mt-4" />

            <div className="mt-auto pt-5">
                <Link
                    to={detailPath(opp)}
                    data-testid={`view-details-${opp.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy dark:hover:text-blue-300"
                >
                    View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </article>
    );
}

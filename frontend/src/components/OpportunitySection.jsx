import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import OpportunityCard from "@/components/OpportunityCard";

export default function OpportunitySection({ title, subtitle, items, viewAllTo, testId }) {
    if (!items || items.length === 0) return null;
    return (
        <section data-testid={testId} className="py-8">
            <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">{title}</h2>
                    {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
                </div>
                {viewAllTo && (
                    <Link
                        to={viewAllTo}
                        data-testid={`${testId}-view-all`}
                        className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-navy sm:inline-flex dark:hover:text-blue-300"
                    >
                        View all <ArrowRight className="h-4 w-4" />
                    </Link>
                )}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.slice(0, 6).map((opp, i) => (
                    <OpportunityCard key={opp.slug} opp={opp} index={i} />
                ))}
            </div>
            {viewAllTo && (
                <Link to={viewAllTo} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue sm:hidden">
                    View all <ArrowRight className="h-4 w-4" />
                </Link>
            )}
        </section>
    );
}

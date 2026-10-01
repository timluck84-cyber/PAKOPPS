import { Link } from "react-router-dom";
import { SearchX } from "lucide-react";
import { QUICK_CATEGORIES } from "@/lib/constants";

export default function EmptyState({ query }) {
    return (
        <div data-testid="empty-state" className="rounded-2xl border border-slate-200 bg-card p-8 text-center dark:border-slate-800">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <SearchX className="h-7 w-7 text-slate-400" />
            </div>
            <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100">No opportunities found</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
                {query ? <>We couldn't find results for "<span className="font-medium">{query}</span>". Try different keywords, check your spelling, or browse a category below.</> : "Try adjusting your filters or browse a category below."}
            </p>
            <div className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2">
                {QUICK_CATEGORIES.map((c) => (
                    <Link key={c.to} to={c.to} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                        {c.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

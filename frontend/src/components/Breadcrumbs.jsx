import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ items }) {
    return (
        <nav aria-label="Breadcrumb" data-testid="breadcrumbs" className="flex flex-wrap items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            {items.map((it, i) => (
                <span key={it.to || it.name} className="inline-flex items-center gap-1">
                    {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-300" />}
                    {it.to && i < items.length - 1 ? (
                        <Link to={it.to} className="transition-colors hover:text-brand-blue">{it.name}</Link>
                    ) : (
                        <span className="font-medium text-slate-700 dark:text-slate-300">{it.name}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}

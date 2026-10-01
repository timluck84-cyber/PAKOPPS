import { Link } from "react-router-dom";
import { Compass, Home, Search } from "lucide-react";
import { useSEO } from "@/lib/seo";

export default function NotFound() {
    useSEO({ title: "Page Not Found", description: "The page you are looking for could not be found.", noindex: true });
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy"><Compass className="h-8 w-8 text-white" /></span>
            <p className="mt-6 font-heading text-6xl font-extrabold text-brand-navy dark:text-white">404</p>
            <h1 className="mt-2 font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">Page not found</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">The page you're looking for doesn't exist or has moved.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"><Home className="h-4 w-4" /> Go home</Link>
                <Link to="/search" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200"><Search className="h-4 w-4" /> Search</Link>
            </div>
        </div>
    );
}

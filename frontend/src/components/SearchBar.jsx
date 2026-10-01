import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, Briefcase, X } from "lucide-react";
import { autocomplete } from "@/lib/api";
import { detailPath } from "@/lib/format";

const RECENT_KEY = "pakopps-recent-searches";

function getRecent() {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
}
function addRecent(q) {
    const list = [q, ...getRecent().filter((x) => x !== q)].slice(0, 5);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
}

export default function SearchBar({ variant = "hero", initialQuery = "" }) {
    const [q, setQ] = useState(initialQuery);
    const [open, setOpen] = useState(false);
    const [results, setResults] = useState(null);
    const [recent, setRecent] = useState(getRecent());
    const navigate = useNavigate();
    const boxRef = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    useEffect(() => {
        if (!q || q.trim().length < 2) { setResults(null); return; }
        const t = setTimeout(async () => {
            try { setResults(await autocomplete(q.trim())); } catch { setResults(null); }
        }, 220);
        return () => clearTimeout(t);
    }, [q]);

    const submit = (value) => {
        const term = (value ?? q).trim();
        if (!term) { navigate("/search"); return; }
        addRecent(term);
        setOpen(false);
        navigate(`/search?q=${encodeURIComponent(term)}`);
    };

    const big = variant === "hero";
    return (
        <div ref={boxRef} className="relative w-full">
            <form
                onSubmit={(e) => { e.preventDefault(); submit(); }}
                className={`flex items-center gap-2 rounded-2xl border bg-white shadow-lg ${big ? "p-2 pl-4 border-white/20" : "p-1.5 pl-3 border-slate-200 shadow-sm dark:border-slate-700 dark:bg-slate-900"}`}
            >
                <Search className={`shrink-0 text-slate-400 ${big ? "h-5 w-5" : "h-4 w-4"}`} />
                <input
                    data-testid="search-input"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    onFocus={() => setOpen(true)}
                    placeholder="Search jobs, scholarships, internships, admissions..."
                    className={`w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 ${big ? "text-base" : "text-sm"}`}
                    aria-label="Search opportunities"
                />
                {q && (
                    <button type="button" aria-label="Clear" onClick={() => { setQ(""); setResults(null); }} className="shrink-0 rounded-full p-1 text-slate-400 hover:text-slate-600">
                        <X className="h-4 w-4" />
                    </button>
                )}
                <button
                    type="submit"
                    data-testid="search-submit"
                    className={`shrink-0 rounded-xl bg-brand-blue font-semibold text-white transition-colors hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${big ? "px-5 py-3 text-sm" : "px-4 py-2 text-sm"}`}
                >
                    {big ? "Search Opportunities" : "Search"}
                </button>
            </form>

            {open && (
                <div data-testid="search-suggestions" className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                    {results && results.opportunities?.length > 0 && (
                        <div className="p-2">
                            <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Opportunities</p>
                            {results.opportunities.map((o) => (
                                <button key={o.slug} onMouseDown={() => navigate(detailPath(o))} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                                    <Briefcase className="h-4 w-4 text-slate-400" /> <span className="truncate">{o.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                    {results && results.searches?.length > 0 && (
                        <div className="border-t border-slate-100 p-2 dark:border-slate-800">
                            {results.searches.map((s) => (
                                <button key={s} onMouseDown={() => submit(s)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                                    <Search className="h-4 w-4 text-slate-400" /> {s}
                                </button>
                            ))}
                        </div>
                    )}
                    {(!results || (results.opportunities?.length === 0 && results.searches?.length === 0)) && recent.length > 0 && (
                        <div className="p-2">
                            <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Recent searches</p>
                            {recent.map((s) => (
                                <button key={s} onMouseDown={() => submit(s)} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                                    <Clock className="h-4 w-4 text-slate-400" /> {s}
                                </button>
                            ))}
                        </div>
                    )}
                    {(!results && recent.length === 0) && (
                        <p className="px-4 py-3 text-sm text-slate-400">Start typing to search opportunities…</p>
                    )}
                </div>
            )}
        </div>
    );
}

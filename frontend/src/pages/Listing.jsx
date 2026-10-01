import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal, X } from "lucide-react";
import { listOpportunities, getTaxonomy } from "@/lib/api";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { CATEGORY_CONTENT, SORT_OPTIONS } from "@/lib/constants";
import SearchBar from "@/components/SearchBar";
import OpportunityCard from "@/components/OpportunityCard";
import EmptyState from "@/components/EmptyState";
import { GridSkeleton } from "@/components/Skeletons";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/ads/AdSlot";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TOGGLES = [
    { key: "remote", label: "Remote" },
    { key: "fully_funded", label: "Fully Funded" },
    { key: "international", label: "International" },
    { key: "closing_soon", label: "Closing Soon" },
];

export default function Listing({ categorySlug }) {
    const [params, setParams] = useSearchParams();
    const { data: taxonomy } = useQuery({ queryKey: ["taxonomy"], queryFn: getTaxonomy });

    const q = params.get("q") || "";
    const page = parseInt(params.get("page") || "1", 10);
    const sort = params.get("sort") || "newest";

    const query = useMemo(() => {
        const o = { page, per_page: 12, sort };
        if (categorySlug) o.category = categorySlug;
        if (q) o.q = q;
        ["province", "city", "qualification", "experience", "added"].forEach((k) => {
            if (params.get(k)) o[k] = params.get(k);
        });
        TOGGLES.forEach(({ key }) => { if (params.get(key) === "true") o[key] = true; });
        return o;
    }, [categorySlug, q, page, sort, params]);

    const { data, isLoading } = useQuery({ queryKey: ["opportunities", query], queryFn: () => listOpportunities(query) });

    const content = categorySlug ? CATEGORY_CONTENT[categorySlug] : null;
    const heading = content ? content.title : q ? `Search results for "${q}"` : "Search Opportunities";

    useSEO({
        title: heading,
        description: content ? content.intro : `Search and filter jobs, scholarships, internships and admissions on PAKOPPS.`,
        path: categorySlug ? `/${categorySlug}` : "/search",
        noindex: !categorySlug,
        jsonLd: categorySlug ? [
            breadcrumbSchema([{ name: "Home", to: "/" }, { name: content.title, to: `/${categorySlug}` }]),
            content.faqs?.length ? {
                "@context": "https://schema.org", "@type": "FAQPage",
                mainEntity: content.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            } : null,
        ] : null,
    });

    const update = (key, value) => {
        const next = new URLSearchParams(params);
        if (!value || value === "all") next.delete(key); else next.set(key, value);
        next.delete("page");
        setParams(next);
    };
    const toggle = (key) => update(key, params.get(key) === "true" ? "" : "true");
    const clearAll = () => setParams(q ? new URLSearchParams({ q }) : new URLSearchParams());

    const activeFilterCount = ["province", "city", "qualification", "experience"].filter((k) => params.get(k)).length + TOGGLES.filter((t) => params.get(t.key) === "true").length;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: heading }]} />

            <div className="mt-4">
                <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">{heading}</h1>
                {content && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">{content.intro}</p>}
            </div>

            <div className="mt-6 max-w-2xl"><SearchBar variant="compact" initialQuery={q} /></div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
                {/* Filters */}
                <aside className="lg:sticky lg:top-20 lg:self-start" data-testid="filters">
                    <div className="rounded-2xl border border-slate-200 bg-card p-5 dark:border-slate-800">
                        <div className="mb-4 flex items-center justify-between">
                            <span className="inline-flex items-center gap-2 font-heading text-sm font-bold text-slate-900 dark:text-slate-100"><SlidersHorizontal className="h-4 w-4" /> Filters</span>
                            {activeFilterCount > 0 && (
                                <button data-testid="clear-filters" onClick={clearAll} className="inline-flex items-center gap-1 text-xs font-medium text-brand-blue">
                                    <X className="h-3 w-3" /> Clear
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            <FilterSelect label="Province" testId="filter-province" value={params.get("province")} options={taxonomy?.provinces} onChange={(v) => update("province", v)} />
                            <FilterSelect label="City" testId="filter-city" value={params.get("city")} options={taxonomy?.cities} onChange={(v) => update("city", v)} />
                            <FilterSelect label="Qualification" testId="filter-qualification" value={params.get("qualification")} options={taxonomy?.qualifications} onChange={(v) => update("qualification", v)} />
                            <FilterSelect label="Experience" testId="filter-experience" value={params.get("experience")} options={taxonomy?.experience} onChange={(v) => update("experience", v)} />

                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Quick filters</p>
                                <div className="flex flex-wrap gap-2">
                                    {TOGGLES.map((t) => {
                                        const on = params.get(t.key) === "true";
                                        return (
                                            <button key={t.key} data-testid={`toggle-${t.key}`} onClick={() => toggle(t.key)} className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${on ? "border-brand-blue bg-brand-blue text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-blue dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                {t.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 hidden lg:block"><AdSlot slot="sidebar" /></div>
                </aside>

                {/* Results */}
                <div>
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="text-sm text-slate-500 dark:text-slate-400" data-testid="results-count">
                            {isLoading ? "Searching…" : `${data?.total ?? 0} ${data?.total === 1 ? "result" : "results"}`}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">Sort</span>
                            <Select value={sort} onValueChange={(v) => update("sort", v)}>
                                <SelectTrigger data-testid="sort-select" className="h-9 w-[130px]"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {isLoading ? (
                        <GridSkeleton />
                    ) : data?.items?.length ? (
                        <>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {data.items.map((opp, i) => (
                                    <OpportunityCard key={opp.slug} opp={opp} index={i} />
                                ))}
                            </div>
                            {data.total_pages > 1 && (
                                <div className="mt-8 flex items-center justify-center gap-2" data-testid="pagination">
                                    <button disabled={page <= 1} onClick={() => update("page", String(page - 1))} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300">Previous</button>
                                    <span className="px-2 text-sm text-slate-500">Page {page} of {data.total_pages}</span>
                                    <button disabled={page >= data.total_pages} onClick={() => update("page", String(page + 1))} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300">Next</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <EmptyState query={q} />
                    )}
                </div>
            </div>

            {/* Category FAQ / info */}
            {content?.faqs?.length > 0 && (
                <section className="mt-12 max-w-3xl">
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Frequently asked questions</h2>
                    <Accordion type="single" collapsible className="mt-4">
                        {content.faqs.map((f, i) => (
                            <AccordionItem key={i} value={`faq-${i}`}>
                                <AccordionTrigger className="text-left text-sm font-semibold">{f.q}</AccordionTrigger>
                                <AccordionContent className="text-sm text-slate-600 dark:text-slate-400">{f.a}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
            )}
        </div>
    );
}

function FilterSelect({ label, value, options, onChange, testId }) {
    return (
        <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
            <Select value={value || "all"} onValueChange={onChange}>
                <SelectTrigger data-testid={testId} className="h-9"><SelectValue placeholder={`Any ${label.toLowerCase()}`} /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Any {label.toLowerCase()}</SelectItem>
                    {(options || []).map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
    );
}

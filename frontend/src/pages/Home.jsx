import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, Search as SearchIcon, BadgeCheck, ExternalLink, ArrowRight, TrendingUp, Building2, CalendarClock } from "lucide-react";
import { getHome, getStats, getTaxonomy } from "@/lib/api";
import { useSEO, orgSchema, websiteSchema } from "@/lib/seo";
import SearchBar from "@/components/SearchBar";
import OpportunitySection from "@/components/OpportunitySection";
import { GridSkeleton } from "@/components/Skeletons";
import AdSlot from "@/components/ads/AdSlot";
import Icon from "@/components/Icon";
import { QUICK_CATEGORIES } from "@/lib/constants";

const INFO_CARDS = [
    { icon: SearchIcon, title: "How the platform works", body: "PAKOPPS automatically discovers opportunities from public sources, structures the key facts, and links you to the official source." },
    { icon: BadgeCheck, title: "How to search effectively", body: "Use specific keywords, then narrow results with filters for category, province, city, qualification and experience." },
    { icon: ShieldCheck, title: "How to verify an opportunity", body: "Every listing shows its source. Always open the official source and confirm the deadline, eligibility and application link." },
    { icon: ExternalLink, title: "How to apply safely", body: "Never pay to apply to a personal account. Legitimate government fees use official challans. Beware of unrealistic offers." },
];

function Counter({ label, value, icon: I }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
            <I className="h-5 w-5 text-brand-emerald" />
            <div>
                <p className="font-heading text-xl font-bold text-white">{value ?? "—"}</p>
                <p className="text-xs text-slate-300">{label}</p>
            </div>
        </div>
    );
}

function BrowseBy({ title, items, param, testId }) {
    return (
        <div data-testid={testId}>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
                {items.map((it) => (
                    <Link key={it} to={`/search?${param}=${encodeURIComponent(it)}`} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                        {it}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    const { data: home, isLoading } = useQuery({ queryKey: ["home"], queryFn: getHome });
    const { data: stats } = useQuery({ queryKey: ["stats"], queryFn: getStats });
    const { data: taxonomy } = useQuery({ queryKey: ["taxonomy"], queryFn: getTaxonomy });

    useSEO({
        title: "Find Jobs, Scholarships & Opportunities in Pakistan",
        description: "Search thousands of jobs, government jobs, scholarships, internships, admissions and fellowships from across the web — all in one trusted place. Free, no sign-up required.",
        path: "/",
        jsonLd: [orgSchema(), websiteSchema()],
    });

    return (
        <div>
            {/* HERO */}
            <section className="hero-mesh">
                <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                        <TrendingUp className="h-3.5 w-3.5 text-brand-emerald" /> Pakistan's automated opportunity search engine
                    </span>
                    <h1 className="fade-up mt-6 font-heading text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Find Jobs, Scholarships & Opportunities in Pakistan
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                        Search thousands of opportunities, scholarships, internships, admissions and career openings from across the web — all in one place.
                    </p>
                    <div className="mx-auto mt-8 max-w-2xl">
                        <SearchBar variant="hero" />
                    </div>
                    <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2">
                        {QUICK_CATEGORIES.map((c) => (
                            <Link key={c.to} to={c.to} data-testid={`hero-cat-${c.to.replace("/", "")}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-slate-100 transition-colors hover:border-brand-emerald hover:bg-white/10">
                                <Icon name={c.icon} className="h-3.5 w-3.5 text-brand-emerald" /> {c.label}
                            </Link>
                        ))}
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                        <Counter label="Active opportunities" value={stats?.total_active} icon={SearchIcon} />
                        <Counter label="Closing this week" value={stats?.closing_soon} icon={CalendarClock} />
                        <Counter label="Organizations" value={stats?.organizations} icon={Building2} />
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="pt-8"><AdSlot slot="top" /></div>

                {isLoading ? (
                    <div className="py-8"><GridSkeleton /></div>
                ) : (
                    <>
                        <OpportunitySection testId="section-latest" title="Latest Opportunities" subtitle="Freshly discovered and verified" items={home?.latest} viewAllTo="/search?sort=newest" />
                        <OpportunitySection testId="section-closing" title="Closing Soon" subtitle="Deadlines within the next 7 days" items={home?.closing_soon} viewAllTo="/search?closing_soon=true" />

                        <AdSlot slot="in-feed" className="my-4" />

                        <OpportunitySection testId="section-government" title="Government Jobs" items={home?.government_jobs} viewAllTo="/government-jobs" />
                        <OpportunitySection testId="section-private" title="Private Jobs" items={home?.private_jobs} viewAllTo="/private-jobs" />
                        <OpportunitySection testId="section-remote" title="Remote Jobs" items={home?.remote_jobs} viewAllTo="/remote-jobs" />
                        <OpportunitySection testId="section-scholarships" title="Scholarships" items={home?.scholarships} viewAllTo="/scholarships" />
                        <OpportunitySection testId="section-internships" title="Internships" items={home?.internships} viewAllTo="/internships" />
                        <OpportunitySection testId="section-international" title="International Opportunities" items={home?.international} viewAllTo="/international-opportunities" />
                    </>
                )}

                {/* Popular searches */}
                <section className="py-8" data-testid="popular-searches">
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Popular Searches</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {(home?.popular_searches || []).map((s) => (
                            <Link key={s} to={`/search?q=${encodeURIComponent(s)}`} className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                                {s}
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Browse by */}
                <section className="grid gap-8 py-8 sm:grid-cols-3">
                    <BrowseBy testId="browse-qualification" title="Browse by Qualification" items={taxonomy?.qualifications || []} param="qualification" />
                    <BrowseBy testId="browse-province" title="Browse by Province" items={taxonomy?.provinces || []} param="province" />
                    <BrowseBy testId="browse-city" title="Browse by City" items={(taxonomy?.cities || []).slice(0, 10)} param="city" />
                </section>

                <AdSlot slot="bottom" className="my-6" />

                {/* Info content */}
                <section className="py-10">
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">A trustworthy way to find real opportunities</h2>
                    <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">PAKOPPS is a research and search platform, not an employer. We help you discover opportunities and always point you to the official source so you can verify details before applying.</p>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {INFO_CARDS.map((c) => (
                            <div key={c.title} className="rounded-2xl border border-slate-200 bg-card p-5 dark:border-slate-800">
                                <c.icon className="h-6 w-6 text-brand-blue" />
                                <h3 className="mt-3 font-heading text-base font-semibold text-slate-900 dark:text-slate-100">{c.title}</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{c.body}</p>
                            </div>
                        ))}
                    </div>
                    <Link to="/career-guides" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-navy dark:hover:text-blue-300">
                        Explore career guides <ArrowRight className="h-4 w-4" />
                    </Link>
                </section>
            </div>
        </div>
    );
}

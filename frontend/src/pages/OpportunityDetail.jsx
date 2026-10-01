import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    ExternalLink, MapPin, GraduationCap, Briefcase, CalendarClock, Users, Wallet,
    FileText, ShieldCheck, AlertTriangle, Building2, ClipboardCheck, CheckCircle2,
} from "lucide-react";
import { getOpportunity } from "@/lib/api";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { formatDate, deadlineLabel, show, NA, categoryLabel, detailPath } from "@/lib/format";
import { OpportunityBadges } from "@/components/Badges";
import Breadcrumbs from "@/components/Breadcrumbs";
import OpportunityCard from "@/components/OpportunityCard";
import AdSlot from "@/components/ads/AdSlot";
import { GridSkeleton } from "@/components/Skeletons";

function Section({ icon: I, title, children, testId }) {
    return (
        <section data-testid={testId} className="border-t border-slate-200 py-6 first:border-t-0 first:pt-0 dark:border-slate-800">
            <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-slate-900 dark:text-slate-100">
                <I className="h-5 w-5 text-brand-blue" /> {title}
            </h2>
            <div className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>
        </section>
    );
}

function Bullets({ items }) {
    if (!items || items.length === 0) return <p className="text-slate-400">{NA}</p>;
    return (
        <ul className="space-y-2">
            {items.map((it, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-emerald" /><span>{it}</span></li>
            ))}
        </ul>
    );
}

function Fact({ icon: I, label, value }) {
    return (
        <div className="flex items-start gap-3 py-2.5">
            <I className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <div className="min-w-0">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{value}</p>
            </div>
        </div>
    );
}

export default function OpportunityDetail() {
    const { slug } = useParams();
    const { data: opp, isLoading, isError } = useQuery({ queryKey: ["opportunity", slug], queryFn: () => getOpportunity(slug) });

    const closed = opp && (opp.status === "EXPIRED" || opp.status === "CLOSED");
    const isJob = opp?.opportunity_type === "jobs";

    const jsonLd = [];
    if (opp) {
        jsonLd.push(breadcrumbSchema([
            { name: "Home", to: "/" },
            { name: categoryLabel(opp.category), to: `/${opp.category}` },
            { name: opp.title, to: detailPath(opp) },
        ]));
        // JobPosting ONLY for genuine, active single jobs
        if (isJob && !closed) {
            jsonLd.push({
                "@context": "https://schema.org", "@type": "JobPosting",
                title: opp.title, description: opp.description,
                datePosted: (opp.published_at || "").slice(0, 10),
                validThrough: opp.deadline && opp.deadline !== NA ? opp.deadline : undefined,
                employmentType: opp.employment_type || undefined,
                hiringOrganization: { "@type": "Organization", name: opp.organization },
                jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: opp.city || undefined, addressRegion: opp.province || undefined, addressCountry: opp.country || "PK" } },
                directApply: Boolean(opp.application_url),
                ...(opp.is_remote ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "Pakistan" } } : {}),
            });
        }
    }

    useSEO({
        title: opp ? opp.title : "Opportunity",
        description: opp ? `${opp.title} at ${opp.organization}. ${(opp.description || "").slice(0, 150)}` : undefined,
        path: `/opportunities/${slug}`,
        noindex: closed,
        jsonLd: opp ? jsonLd : null,
    });

    if (isLoading) {
        return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="h-8 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" /><div className="mt-8"><GridSkeleton count={3} /></div></div>;
    }
    if (isError || !opp) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-20 text-center">
                <h1 className="font-heading text-2xl font-bold text-slate-900 dark:text-slate-100">Opportunity not found</h1>
                <p className="mt-2 text-slate-500">It may have been removed or the link is incorrect.</p>
                <Link to="/search" className="mt-6 inline-block rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white">Search opportunities</Link>
            </div>
        );
    }

    const apply = opp.application_url || opp.official_url;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: categoryLabel(opp.category), to: `/${opp.category}` }, { name: opp.title }]} />

            <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_340px]">
                {/* Main */}
                <article>
                    <OpportunityBadges opp={opp} className="mb-3" />
                    <h1 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">{opp.title}</h1>
                    <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300"><Building2 className="h-4 w-4" />{opp.organization}</span>
                        <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{show(opp.location || opp.city || opp.country)}</span>
                    </p>

                    {closed && (
                        <div data-testid="closed-banner" className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                            <div><p className="font-semibold">Applications Closed</p><p className="mt-0.5">This opportunity's deadline has passed. It remains available as historical information. Please check the official source for current openings.</p></div>
                        </div>
                    )}

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-card p-5 dark:border-slate-800 sm:p-6">
                        <Section icon={FileText} title="Quick Summary" testId="section-summary"><p>{opp.description}</p></Section>
                        <Section icon={Users} title="Who Can Apply?" testId="section-eligibility"><Bullets items={opp.eligibility} /></Section>
                        {opp.requirements?.length > 0 && <Section icon={ClipboardCheck} title="Key Requirements" testId="section-requirements"><Bullets items={opp.requirements} /></Section>}

                        <Section icon={CalendarClock} title="Important Dates" testId="section-dates">
                            <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-xs text-slate-400">Opening Date</p><p className="font-medium">{opp.opening_date ? formatDate(opp.opening_date) : NA}</p></div>
                                <div><p className="text-xs text-slate-400">Deadline</p><p className="font-medium text-slate-900 dark:text-slate-100">{opp.deadline ? formatDate(opp.deadline) : NA}</p></div>
                            </div>
                        </Section>

                        <AdSlot slot="in-content" className="my-4" />

                        <Section icon={Briefcase} title="How to Apply" testId="section-apply"><Bullets items={opp.how_to_apply} /></Section>
                        {opp.documents_required?.length > 0 && <Section icon={FileText} title="Required Documents" testId="section-documents"><Bullets items={opp.documents_required} /></Section>}

                        <Section icon={ShieldCheck} title="Official Source" testId="section-source">
                            <p>Source: <span className="font-medium text-slate-800 dark:text-slate-200">{opp.source_name}</span></p>
                            <p className="mt-1 text-xs text-slate-400">Last verified: {formatDate(opp.source_last_checked)}</p>
                            {opp.official_url && (
                                <a href={opp.official_url} target="_blank" rel="noopener noreferrer nofollow" data-testid="official-source-link" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline">
                                    View Official Source <ExternalLink className="h-4 w-4" />
                                </a>
                            )}
                            <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">Always verify final details on the official source before applying. PAKOPPS is not the employer, university or scholarship provider.</p>
                        </Section>
                    </div>
                </article>

                {/* Sidebar quick facts */}
                <aside className="lg:sticky lg:top-20 lg:self-start">
                    <div className="rounded-2xl border border-slate-200 bg-card p-5 dark:border-slate-800">
                        <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Quick Facts</h2>
                        {opp.deadline && opp.deadline !== NA && (
                            <div className={`mt-3 rounded-xl p-3 text-center ${opp.status === "CLOSING_SOON" ? "bg-amber-50 dark:bg-amber-950/40" : "bg-slate-50 dark:bg-slate-800/60"}`}>
                                <p className="text-xs text-slate-400">Application Deadline</p>
                                <p className="font-heading text-lg font-bold text-slate-900 dark:text-slate-100">{formatDate(opp.deadline)}</p>
                                {!closed && <p className="text-xs font-semibold text-amber-600">{deadlineLabel(opp.deadline)}</p>}
                            </div>
                        )}
                        <div className="mt-2 divide-y divide-slate-100 dark:divide-slate-800">
                            <Fact icon={GraduationCap} label="Qualification" value={show(opp.qualification || opp.education_level)} />
                            <Fact icon={Briefcase} label="Experience" value={show(opp.experience_required)} />
                            {(opp.salary || opp.stipend) && <Fact icon={Wallet} label={opp.stipend ? "Stipend" : "Salary"} value={opp.salary || opp.stipend} />}
                            {opp.vacancies && <Fact icon={Users} label="Vacancies" value={opp.vacancies} />}
                            {opp.funding_type && <Fact icon={Wallet} label="Funding" value={opp.funding_type} />}
                            {opp.application_fee && <Fact icon={FileText} label="Application Fee" value={opp.application_fee} />}
                            <Fact icon={MapPin} label="Location" value={show(opp.location || opp.city || opp.country)} />
                        </div>

                        {apply && !closed ? (
                            <a href={apply} target="_blank" rel="noopener noreferrer nofollow" data-testid="apply-official-button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                Apply on Official Site <ExternalLink className="h-4 w-4" />
                            </a>
                        ) : (
                            <div className="mt-4 rounded-xl bg-slate-100 px-5 py-3 text-center text-sm font-semibold text-slate-500 dark:bg-slate-800">Applications Closed</div>
                        )}
                        <Link to="/report-an-opportunity" className="mt-3 block text-center text-xs text-slate-400 hover:text-brand-blue">Report an issue with this listing</Link>
                    </div>
                </aside>
            </div>

            {/* Related */}
            {opp.related?.length > 0 && (
                <section className="mt-12" data-testid="related-opportunities">
                    <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Related Opportunities</h2>
                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {opp.related.slice(0, 3).map((r) => <OpportunityCard key={r.slug} opp={r} />)}
                    </div>
                </section>
            )}
        </div>
    );
}

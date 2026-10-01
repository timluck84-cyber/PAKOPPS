import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { getGuide } from "@/lib/api";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/ads/AdSlot";
import NotFound from "@/pages/NotFound";

export default function CareerGuideDetail() {
    const { slug } = useParams();
    const { data: guide, isLoading, isError } = useQuery({ queryKey: ["guide", slug], queryFn: () => getGuide(slug) });

    useSEO({
        title: guide?.title,
        description: guide?.excerpt,
        path: `/career-guides/${slug}`,
        jsonLd: guide ? [
            breadcrumbSchema([{ name: "Home", to: "/" }, { name: "Career Guides", to: "/career-guides" }, { name: guide.title, to: `/career-guides/${slug}` }]),
            { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.excerpt, author: { "@type": "Organization", name: "PAKOPPS" } },
        ] : null,
    });

    if (isLoading) return <div className="mx-auto max-w-3xl px-4 py-16"><div className="h-8 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" /></div>;
    if (isError || !guide) return <NotFound />;

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Career Guides", to: "/career-guides" }, { name: guide.title }]} />
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{guide.category}</span>
            <h1 className="mt-3 font-heading text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">{guide.title}</h1>
            <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-400"><Clock className="h-3.5 w-3.5" />{guide.read_time}</p>
            <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300">{guide.excerpt}</p>

            <AdSlot slot="top" className="my-6" />

            <div className="mt-6 space-y-8">
                {guide.sections.map((s, i) => (
                    <section key={i}>
                        <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100">{s.heading}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.body}</p>
                    </section>
                ))}
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900/40">
                <p className="font-heading text-lg font-bold text-slate-900 dark:text-slate-100">Ready to find your next opportunity?</p>
                <Link to="/search" className="mt-3 inline-block rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy">Search opportunities</Link>
            </div>
        </div>
    );
}

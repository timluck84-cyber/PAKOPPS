import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ArrowRight, Clock } from "lucide-react";
import { listGuides } from "@/lib/api";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function CareerGuides() {
    const { data: guides, isLoading } = useQuery({ queryKey: ["guides"], queryFn: listGuides });
    useSEO({
        title: "Career Guides & Resources",
        description: "Free, practical career guides for Pakistani students and professionals: CV writing, interviews, government jobs, scholarships, remote work and avoiding job scams.",
        path: "/career-guides",
        jsonLd: breadcrumbSchema([{ name: "Home", to: "/" }, { name: "Career Guides", to: "/career-guides" }]),
    });

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Career Guides" }]} />
            <div className="mt-4 max-w-3xl">
                <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">Career Guides & Resources</h1>
                <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">Practical, no-nonsense guides to help you find opportunities, apply effectively and stay safe from scams — written for Pakistani students, graduates and professionals.</p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {(isLoading ? Array.from({ length: 6 }) : guides)?.map((g, i) =>
                    g ? (
                        <Link key={g.slug} to={`/career-guides/${g.slug}`} data-testid={`guide-card-${g.slug}`} className="card-hover group flex flex-col rounded-2xl border border-slate-200 bg-card p-5 shadow-sm hover:border-slate-300 hover:shadow-md dark:border-slate-800">
                            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"><BookOpen className="h-3 w-3" />{g.category}</span>
                            <h2 className="mt-3 font-heading text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-blue dark:text-slate-100">{g.title}</h2>
                            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{g.excerpt}</p>
                            <div className="mt-auto flex items-center justify-between pt-4 text-xs text-slate-400">
                                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{g.read_time}</span>
                                <span className="inline-flex items-center gap-1 font-semibold text-brand-blue">Read <ArrowRight className="h-3.5 w-3.5" /></span>
                            </div>
                        </Link>
                    ) : (
                        <div key={i} className="h-52 animate-pulse rounded-2xl border border-slate-200 bg-card dark:border-slate-800" />
                    )
                )}
            </div>
        </div>
    );
}

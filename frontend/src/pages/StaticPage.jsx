import { useParams } from "react-router-dom";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { STATIC_PAGES } from "@/lib/staticContent";
import Breadcrumbs from "@/components/Breadcrumbs";
import NotFound from "@/pages/NotFound";

export default function StaticPage({ slug: slugProp }) {
    const params = useParams();
    const slug = slugProp || params.slug;
    const page = STATIC_PAGES[slug];

    useSEO({
        title: page?.title,
        description: page?.intro,
        path: `/${slug}`,
        jsonLd: page ? breadcrumbSchema([{ name: "Home", to: "/" }, { name: page.title, to: `/${slug}` }]) : null,
    });

    if (!page) return <NotFound />;

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: page.title }]} />
            <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">{page.title}</h1>
            {page.updated && <p className="mt-1 text-xs text-slate-400">Last updated: {page.updated}</p>}
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{page.intro}</p>

            <div className="mt-8 space-y-8">
                {page.sections.map((s, i) => (
                    <section key={i}>
                        <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-slate-100">{s.heading}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.body}</p>
                    </section>
                ))}
            </div>
        </div>
    );
}

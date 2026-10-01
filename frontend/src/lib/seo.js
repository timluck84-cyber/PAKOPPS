import { useEffect } from "react";

function setMeta(attr, key, content) {
    if (content === undefined || content === null) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
}

function setLink(rel, href) {
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
    }
    el.setAttribute("href", href);
}

const SITE = "PAKOPPS";
const BASE = process.env.REACT_APP_BACKEND_URL || "";

// Manages document title, meta, canonical, robots and JSON-LD for each page (SPA SEO).
export function useSEO({ title, description, path, image, noindex, jsonLd } = {}) {
    useEffect(() => {
        const fullTitle = title ? `${title} | ${SITE}` : `${SITE} | Jobs, Scholarships & Opportunities in Pakistan`;
        document.title = fullTitle;

        if (description) setMeta("name", "description", description);
        setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

        const url = `${BASE}${path || window.location.pathname}`;
        setLink("canonical", url);

        setMeta("property", "og:title", fullTitle);
        if (description) setMeta("property", "og:description", description);
        setMeta("property", "og:type", "website");
        setMeta("property", "og:url", url);
        setMeta("property", "og:site_name", SITE);
        if (image) setMeta("property", "og:image", image);

        setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
        setMeta("name", "twitter:title", fullTitle);
        if (description) setMeta("name", "twitter:description", description);
        if (image) setMeta("name", "twitter:image", image);

        // JSON-LD
        const existing = document.head.querySelectorAll('script[data-seo-jsonld="true"]');
        existing.forEach((n) => n.remove());
        if (jsonLd) {
            const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
            blocks.filter(Boolean).forEach((block) => {
                const s = document.createElement("script");
                s.type = "application/ld+json";
                s.setAttribute("data-seo-jsonld", "true");
                s.text = JSON.stringify(block);
                document.head.appendChild(s);
            });
        }
        window.scrollTo(0, 0);
    }, [title, description, path, image, noindex, JSON.stringify(jsonLd)]);
}

export function orgSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE,
        url: BASE,
        description: "Automated public search engine for jobs, scholarships, internships and opportunities in Pakistan.",
    };
}

export function websiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE,
        url: BASE,
        potentialAction: {
            "@type": "SearchAction",
            target: `${BASE}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };
}

export function breadcrumbSchema(items) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
            item: `${BASE}${it.to}`,
        })),
    };
}

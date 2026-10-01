import { Link } from "react-router-dom";
import { Compass, Mail } from "lucide-react";
import { FOOTER } from "@/lib/constants";
import { useAppConfig } from "@/lib/ConfigContext";

export default function Footer() {
    const config = useAppConfig();
    return (
        <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-navy">
                                <Compass className="h-5 w-5 text-white" />
                            </span>
                            <span className="font-heading text-lg font-extrabold tracking-tight text-brand-navy dark:text-white">PAK<span className="text-brand-emerald">OPPS</span></span>
                        </div>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            Pakistan Opportunities Search Engine. We discover and structure public opportunities and link you to the official source.
                        </p>
                        <a href={`mailto:${config.contact_email}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:underline">
                            <Mail className="h-4 w-4" /> {config.contact_email}
                        </a>
                    </div>

                    {Object.entries(FOOTER).map(([section, links]) => (
                        <div key={section}>
                            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-slate-100">{section}</h3>
                            <ul className="mt-4 space-y-2.5">
                                {links.map((l) => (
                                    <li key={l.to}>
                                        <Link to={l.to} data-testid={`footer-${l.to.replace(/\//g, "")}`} className="text-sm text-slate-500 transition-colors hover:text-brand-blue dark:text-slate-400">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 dark:border-slate-800 sm:flex-row sm:items-center">
                    <p>© 2026 PAKOPPS. All rights reserved.</p>
                    <p>Always verify final details on the official source before applying.</p>
                </div>
            </div>
        </footer>
    );
}

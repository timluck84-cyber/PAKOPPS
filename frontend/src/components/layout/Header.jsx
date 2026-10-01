import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, Compass } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constants";
import ThemeToggle from "@/components/ThemeToggle";

function Logo() {
    return (
        <Link to="/" data-testid="logo-link" className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-navy">
                <Compass className="h-5 w-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-brand-emerald dark:border-slate-900" />
            </span>
            <span className="font-heading text-xl font-extrabold tracking-tight text-brand-navy dark:text-white">
                PAK<span className="text-brand-emerald">OPPS</span>
            </span>
        </Link>
    );
}

export default function Header() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <Logo />

                <nav className="hidden items-center gap-1 lg:flex">
                    {NAV_LINKS.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            data-testid={`nav-${l.to.replace("/", "")}`}
                            className={({ isActive }) =>
                                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? "text-brand-blue" : "text-slate-600 hover:text-brand-navy dark:text-slate-300 dark:hover:text-white"}`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        data-testid="header-search-btn"
                        onClick={() => navigate("/search")}
                        aria-label="Search"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <Search className="h-5 w-5" />
                    </button>
                    <ThemeToggle />

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button data-testid="mobile-menu-btn" aria-label="Open menu" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 lg:hidden dark:border-slate-700 dark:text-slate-300">
                                <Menu className="h-5 w-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72">
                            <div className="mt-6 flex flex-col gap-1">
                                {NAV_LINKS.map((l) => (
                                    <SheetClose asChild key={l.to}>
                                        <NavLink
                                            to={l.to}
                                            data-testid={`mobile-nav-${l.to.replace("/", "")}`}
                                            className={({ isActive }) => `rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? "bg-slate-100 text-brand-blue dark:bg-slate-800" : "text-slate-700 dark:text-slate-200"}`}
                                        >
                                            {l.label}
                                        </NavLink>
                                    </SheetClose>
                                ))}
                                <SheetClose asChild>
                                    <Link to="/career-guides" className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200">Career Guides</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link to="/how-it-works" className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200">How It Works</Link>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

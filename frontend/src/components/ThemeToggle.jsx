import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("pakopps-theme") === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (dark) root.classList.add("dark");
        else root.classList.remove("dark");
        localStorage.setItem("pakopps-theme", dark ? "dark" : "light");
    }, [dark]);

    return (
        <button
            data-testid="theme-toggle"
            onClick={() => setDark((v) => !v)}
            aria-label="Toggle dark mode"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    );
}

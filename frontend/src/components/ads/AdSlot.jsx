import { useAppConfig } from "@/lib/ConfigContext";

// Centralized, policy-compliant ad slot. Loads nothing when ADS_ENABLED=false;
// renders a subtle, clearly-labelled placeholder (dev/preview only) that is visually
// distinct from publisher content. Never placed beside interactive controls.
const SIZES = {
    top: "min-h-[90px]",
    "in-feed": "min-h-[120px]",
    sidebar: "min-h-[600px]",
    "in-content": "min-h-[120px]",
    bottom: "min-h-[120px]",
};

export default function AdSlot({ slot = "in-content", className = "" }) {
    const config = useAppConfig();
    const enabled = config?.ads?.enabled;

    if (!enabled) {
        // Placeholder only — no ad scripts loaded. Clearly marked, non-deceptive.
        return (
            <aside
                data-testid={`ad-slot-${slot}`}
                aria-label="Advertisement placeholder"
                className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 text-slate-400 dark:border-slate-700 dark:bg-slate-900/40 ${SIZES[slot] || SIZES["in-content"]} ${className}`}
            >
                <span className="text-[10px] font-semibold uppercase tracking-widest">Advertisement</span>
                <span className="mt-1 text-[11px]">Ad space ({slot}) · disabled</span>
            </aside>
        );
    }

    // When enabled later, the configured provider is loaded asynchronously elsewhere.
    return (
        <aside
            data-testid={`ad-slot-${slot}`}
            data-ad-slot={config?.ads?.slots?.[slot === "in-feed" ? "in_feed" : slot] || ""}
            data-ad-client={config?.ads?.client_id || ""}
            className={`${SIZES[slot] || SIZES["in-content"]} ${className}`}
        />
    );
}

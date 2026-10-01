import { useState } from "react";
import { Flag, Send } from "lucide-react";
import { toast } from "sonner";
import { createReport } from "@/lib/api";
import { useSEO } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ISSUE_TYPES = ["Expired", "Incorrect information", "Broken application link", "Duplicate", "Suspicious listing", "Other"];

export default function ReportOpportunity() {
    const [form, setForm] = useState({ opportunity_url: "", issue_type: "", message: "" });
    const [sending, setSending] = useState(false);
    // Report form is a utility page — not indexed.
    useSEO({ title: "Report an Opportunity", description: "Report an expired, incorrect, duplicate or suspicious opportunity listing.", path: "/report-an-opportunity", noindex: true });

    const submit = async (e) => {
        e.preventDefault();
        if (!form.issue_type) { toast.error("Please select an issue type"); return; }
        setSending(true);
        try {
            const res = await createReport(form);
            toast.success(res.message || "Report received");
            setForm({ opportunity_url: "", issue_type: "", message: "" });
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Report an Opportunity" }]} />
            <div className="mt-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/40"><Flag className="h-5 w-5 text-brand-gold" /></span>
                <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Report an Issue</h1>
            </div>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">Spotted an expired, incorrect, duplicate or suspicious listing? Let us know — no account needed. Your report helps keep PAKOPPS accurate for everyone.</p>

            <form onSubmit={submit} data-testid="report-form" className="mt-8 rounded-2xl border border-slate-200 bg-card p-6 dark:border-slate-800">
                <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Opportunity URL</label>
                    <Input data-testid="report-url" required value={form.opportunity_url} onChange={(e) => setForm((f) => ({ ...f, opportunity_url: e.target.value }))} className="mt-1.5" placeholder="https://..." /></div>
                <div className="mt-4"><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Issue type</label>
                    <Select value={form.issue_type} onValueChange={(v) => setForm((f) => ({ ...f, issue_type: v }))}>
                        <SelectTrigger data-testid="report-issue-type" className="mt-1.5"><SelectValue placeholder="Select an issue type" /></SelectTrigger>
                        <SelectContent>{ISSUE_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select></div>
                <div className="mt-4"><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                    <Textarea data-testid="report-message" required value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className="mt-1.5 min-h-[120px]" placeholder="Describe the issue..." /></div>
                <button type="submit" disabled={sending} data-testid="report-submit" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy disabled:opacity-60">
                    {sending ? "Submitting…" : <>Submit Report <Send className="h-4 w-4" /></>}
                </button>
            </form>
        </div>
    );
}

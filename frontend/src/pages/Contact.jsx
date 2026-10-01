import { useState } from "react";
import { Mail, Send, MapPin } from "lucide-react";
import { toast } from "sonner";
import { createContact } from "@/lib/api";
import { useSEO } from "@/lib/seo";
import { useAppConfig } from "@/lib/ConfigContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
    const config = useAppConfig();
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sending, setSending] = useState(false);
    useSEO({ title: "Contact Us", description: "Get in touch with the PAKOPPS team. We welcome feedback, corrections and partnership enquiries.", path: "/contact" });

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const submit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await createContact(form);
            toast.success(res.message || "Message sent");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ name: "Home", to: "/" }, { name: "Contact" }]} />
            <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">Contact Us</h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600 dark:text-slate-400">Have feedback, a correction, or a partnership enquiry? Send us a message and we'll get back to you.</p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
                <form onSubmit={submit} data-testid="contact-form" className="rounded-2xl border border-slate-200 bg-card p-6 dark:border-slate-800">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label><Input data-testid="contact-name" required value={form.name} onChange={set("name")} className="mt-1.5" placeholder="Your name" /></div>
                        <div><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label><Input data-testid="contact-email" required type="email" value={form.email} onChange={set("email")} className="mt-1.5" placeholder="you@example.com" /></div>
                    </div>
                    <div className="mt-4"><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Subject</label><Input data-testid="contact-subject" required value={form.subject} onChange={set("subject")} className="mt-1.5" placeholder="How can we help?" /></div>
                    <div className="mt-4"><label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label><Textarea data-testid="contact-message" required value={form.message} onChange={set("message")} className="mt-1.5 min-h-[140px]" placeholder="Write your message..." /></div>
                    <button type="submit" disabled={sending} data-testid="contact-submit" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy disabled:opacity-60">
                        {sending ? "Sending…" : <>Send Message <Send className="h-4 w-4" /></>}
                    </button>
                </form>

                <aside className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-card p-5 dark:border-slate-800">
                        <Mail className="h-5 w-5 text-brand-blue" />
                        <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Email</p>
                        <a href={`mailto:${config.contact_email}`} className="text-sm text-brand-blue hover:underline">{config.contact_email}</a>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-card p-5 dark:border-slate-800">
                        <MapPin className="h-5 w-5 text-brand-emerald" />
                        <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Coverage</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Pakistan & international opportunities for Pakistani applicants.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
}

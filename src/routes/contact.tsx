import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/lib/site";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Arnav Physiotherapy — Jhansi" },
      { name: "description", content: `Visit or contact ${site.name} in Jhansi. Call, email or send us a message.` },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your recovery"
        subtitle="Call, WhatsApp, or send us a message — we usually reply the same day."
        breadcrumbs={[{ label: "Contact" }]} />

      <section className="py-14 md:py-20">
        <div className="container-page grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            {[
              { Icon: MapPin, title: "Visit us", body: site.address },
              { Icon: Phone, title: "Call", body: `${site.phone1} · ${site.phone2}` },
              { Icon: Mail, title: "Email", body: site.email },
              { Icon: Clock, title: "Hours", body: site.hours },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-teal text-white"><Icon className="h-5 w-5" /></span>
                <div>
                  <div className="text-sm font-bold">{title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{body}</div>
                </div>
              </div>
            ))}
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-6 py-3 text-sm font-semibold shadow-soft w-max">
              <MessageCircle className="h-4 w-4" /> WhatsApp us instantly
            </a>
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <iframe
                title="Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
                className="w-full h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Thanks! We'll get back to you shortly.");
              (e.target as HTMLFormElement).reset();
            }}
            className="rounded-3xl bg-white border border-border p-6 md:p-8 shadow-card space-y-4"
          >
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name"><input required className="input" placeholder="Your name" /></Field>
              <Field label="Phone"><input required className="input" placeholder="+91" /></Field>
            </div>
            <Field label="Email"><input type="email" required className="input" placeholder="you@example.com" /></Field>
            <Field label="Subject"><input className="input" placeholder="Reason for contact" /></Field>
            <Field label="Message"><textarea required rows={5} className="input resize-none" placeholder="Tell us a bit about what you're experiencing…" /></Field>
            <button type="submit" className="inline-flex items-center gap-2 rounded-full gradient-teal px-6 py-3 text-sm font-semibold text-white shadow-soft">
              <Send className="h-4 w-4" /> Send message
            </button>
            {sent && <p className="text-xs text-primary">Thanks — we've received your message.</p>}
            <style>{`.input{width:100%;border:1px solid var(--border);border-radius:14px;padding:12px 14px;font-size:14px;background:white;outline:none;transition:border-color .2s, box-shadow .2s;}.input:focus{border-color:var(--primary);box-shadow:0 0 0 4px color-mix(in oklab, var(--primary) 15%, transparent);}`}</style>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-foreground/70">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

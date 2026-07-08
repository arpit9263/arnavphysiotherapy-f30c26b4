import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command as CommandPrimitive } from "cmdk";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { services, conditions, blogs, faqs, galleryItems } from "@/lib/data";
import { site } from "@/lib/site";
import {
  Activity, HeartPulse, HelpCircle, Image as ImageIcon, Newspaper,
  Stethoscope, TrendingUp, Search, Sparkles, ArrowRight, Command as CmdIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const POPULAR = [
  { label: "Back Pain", to: "/conditions/back-pain" },
  { label: "Sports Injury", to: "/services/sports-rehabilitation" },
  { label: "Frozen Shoulder", to: "/conditions/frozen-shoulder" },
  { label: "Dry Needling", to: "/services/dry-needling" },
  { label: "Book Appointment", to: "/book" },
];

const RECENTS_KEY = "arnav_recents";

/** Distinct color chip per group so the popup feels multi-color. */
const groupTheme = {
  recent:     { chip: "bg-slate-100 text-slate-600",   dot: "bg-slate-400" },
  popular:    { chip: "bg-teal-100 text-teal-700",     dot: "bg-teal-500" },
  services:   { chip: "bg-teal-100 text-teal-700",     dot: "bg-teal-500" },
  conditions: { chip: "bg-rose-100 text-rose-700",     dot: "bg-rose-500" },
  pages:      { chip: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
  gallery:    { chip: "bg-amber-100 text-amber-700",   dot: "bg-amber-500" },
  blogs:      { chip: "bg-sky-100 text-sky-700",       dot: "bg-sky-500" },
  faqs:       { chip: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
};

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [recents, setRecents] = useState<{ label: string; to: string }[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(RECENTS_KEY);
      if (raw) setRecents(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, [open]);

  const go = (to: string, label: string) => {
    try {
      const next = [{ label, to }, ...recents.filter((r) => r.to !== to)].slice(0, 5);
      window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    onOpenChange(false);
    navigate({ to });
  };

  const items = useMemo(
    () => ({
      services: services.map((s) => ({ label: s.name, to: `/services/${s.slug}`, hint: s.short })),
      conditions: conditions.map((c) => ({ label: c.name, to: `/conditions/${c.slug}`, hint: c.summary })),
      pages: [
        { label: "About the Clinic", to: "/about" },
        { label: `${site.doctor} — Profile`, to: "/team" },
        { label: "Gallery", to: "/gallery" },
        { label: "Testimonials", to: "/testimonials" },
        { label: "Contact", to: "/contact" },
        { label: "Book Appointment", to: "/book" },
      ] as { label: string; to: string }[],
      blogs: blogs.map((b) => ({ label: b.title, to: `/blog/${b.slug}`, hint: b.excerpt })),
      faqs: faqs.map((f, i) => ({ label: f.q, to: `/faq#q-${i}`, hint: f.a.slice(0, 80) })),
      gallery: galleryItems.slice(0, 8).map((g) => ({ label: g.title, to: "/gallery", hint: g.category })),
    }),
    [],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-2xl border-0 bg-transparent shadow-none">
        <div className="rounded-3xl overflow-hidden bg-white shadow-[0_40px_100px_-20px_rgba(15,23,42,0.4)] border border-border/60">
          {/* Colorful gradient header */}
          <div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-teal-500 via-sky-500 to-violet-600 text-white overflow-hidden">
            <div className="absolute -top-16 -right-10 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-amber-300/30 blur-3xl" />
            <div className="relative flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/20 backdrop-blur border border-white/25">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] opacity-90">Search Arnav Physio</div>
                <div className="text-lg font-bold leading-tight">What are you looking for today?</div>
              </div>
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md bg-white/15 border border-white/25 px-2 py-1 text-[10px] font-semibold">
                <CmdIcon className="h-3 w-3" /> K
              </kbd>
            </div>

            <CommandPrimitive className="mt-4">
              <div className="flex items-center gap-2 rounded-2xl bg-white/95 text-foreground px-3.5 py-2.5 shadow-lg">
                <Search className="h-4 w-4 text-primary" />
                <CommandPrimitive.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Try 'back pain', 'sports rehab', 'dry needling'…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-[11px] text-muted-foreground hover:text-foreground">
                    Clear
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {POPULAR.slice(0, 5).map((p) => (
                  <button
                    key={p.to}
                    onClick={() => go(p.to, p.label)}
                    className="text-[11px] font-medium rounded-full bg-white/15 hover:bg-white/25 border border-white/25 backdrop-blur px-3 py-1 transition"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <CommandPrimitive.List className="mt-4 max-h-[420px] overflow-y-auto rounded-2xl bg-white text-foreground -mx-6 -mb-4 px-4 py-3 border-t border-border/60">
                <CommandPrimitive.Empty className="py-8 text-center">
                  <div className="text-sm font-medium">No results found</div>
                  <div className="text-xs text-muted-foreground mt-1">Try "back pain", "sports", or "dry needling".</div>
                </CommandPrimitive.Empty>

                {recents.length > 0 && (
                  <Group name="Recent" theme={groupTheme.recent}>
                    {recents.map((r) => (
                      <Item key={r.to} theme={groupTheme.recent} icon={TrendingUp} label={r.label} onSelect={() => go(r.to, r.label)} />
                    ))}
                  </Group>
                )}

                <Group name="Services" theme={groupTheme.services}>
                  {items.services.map((s) => (
                    <Item key={s.to} theme={groupTheme.services} icon={Activity} label={s.label} hint={s.hint} onSelect={() => go(s.to, s.label)} />
                  ))}
                </Group>

                <Group name="Conditions" theme={groupTheme.conditions}>
                  {items.conditions.map((c) => (
                    <Item key={c.to} theme={groupTheme.conditions} icon={HeartPulse} label={c.label} hint={c.hint} onSelect={() => go(c.to, c.label)} />
                  ))}
                </Group>

                <Group name="Pages" theme={groupTheme.pages}>
                  {items.pages.map((p) => (
                    <Item key={p.to} theme={groupTheme.pages} icon={Stethoscope} label={p.label} onSelect={() => go(p.to, p.label)} />
                  ))}
                </Group>

                <Group name="Gallery" theme={groupTheme.gallery}>
                  {items.gallery.map((g, i) => (
                    <Item key={`${g.label}-${i}`} theme={groupTheme.gallery} icon={ImageIcon} label={g.label} hint={g.hint} onSelect={() => go(g.to, g.label)} />
                  ))}
                </Group>

                <Group name="Articles" theme={groupTheme.blogs}>
                  {items.blogs.map((b) => (
                    <Item key={b.to} theme={groupTheme.blogs} icon={Newspaper} label={b.label} onSelect={() => go(b.to, b.label)} />
                  ))}
                </Group>

                <Group name="FAQs" theme={groupTheme.faqs}>
                  {items.faqs.map((f) => (
                    <Item key={f.to} theme={groupTheme.faqs} icon={HelpCircle} label={f.label} hint={f.hint} onSelect={() => go(f.to, f.label)} />
                  ))}
                </Group>
              </CommandPrimitive.List>
            </CommandPrimitive>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Group({ name, theme, children }: { name: string; theme: { chip: string; dot: string }; children: React.ReactNode }) {
  return (
    <CommandPrimitive.Group
      heading={
        <div className="flex items-center gap-2 px-1 py-2">
          <span className={cn("h-1.5 w-1.5 rounded-full", theme.dot)} />
          <span className={cn("text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full", theme.chip)}>{name}</span>
        </div>
      }
      className="mb-1"
    >
      {children}
    </CommandPrimitive.Group>
  );
}

function Item({
  theme,
  icon: Icon,
  label,
  hint,
  onSelect,
}: {
  theme: { chip: string; dot: string };
  icon: any;
  label: string;
  hint?: string;
  onSelect: () => void;
}) {
  return (
    <CommandPrimitive.Item
      value={`${label} ${hint ?? ""}`}
      onSelect={onSelect}
      className="group flex items-center gap-3 rounded-xl px-2.5 py-2 cursor-pointer data-[selected=true]:bg-muted transition"
    >
      <div className={cn("grid h-8 w-8 place-items-center rounded-lg shrink-0", theme.chip)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-foreground truncate">{label}</div>
        {hint && <div className="text-[11.5px] text-muted-foreground truncate">{hint}</div>}
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-data-[selected=true]:opacity-100 transition" />
    </CommandPrimitive.Item>
  );
}

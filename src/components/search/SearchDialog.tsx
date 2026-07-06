import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { services, conditions, blogs, faqs, galleryItems } from "@/lib/data";
import { site } from "@/lib/site";
import { Activity, HeartPulse, HelpCircle, Image as ImageIcon, Newspaper, Stethoscope, TrendingUp } from "lucide-react";

const POPULAR = [
  { label: "Back Pain", to: "/conditions/back-pain" },
  { label: "Sports Injury", to: "/services/sports-rehabilitation" },
  { label: "Frozen Shoulder", to: "/conditions/frozen-shoulder" },
  { label: "Dry Needling", to: "/services/dry-needling" },
  { label: "Book Appointment", to: "/book" },
];

const RECENTS_KEY = "arnav_recents";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [recents, setRecents] = useState<{ label: string; to: string }[]>([]);

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
      ],
      blogs: blogs.map((b) => ({ label: b.title, to: `/blog/${b.slug}`, hint: b.excerpt })),
      faqs: faqs.map((f, i) => ({ label: f.q, to: `/faq#q-${i}`, hint: f.a.slice(0, 80) })),
      gallery: galleryItems.slice(0, 8).map((g) => ({ label: g.title, to: "/gallery", hint: g.category })),
    }),
    [],
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search services, conditions, treatments, doctor…" />
      <CommandList className="max-h-[480px]">
        <CommandEmpty>
          <div className="py-6 text-center">
            <p className="text-sm font-medium">No results found</p>
            <p className="text-xs text-muted-foreground mt-1">Try "back pain", "sports", or "dry needling".</p>
          </div>
        </CommandEmpty>

        {recents.length > 0 && (
          <>
            <CommandGroup heading="Recent">
              {recents.map((r) => (
                <CommandItem key={r.to} value={`recent ${r.label}`} onSelect={() => go(r.to, r.label)}>
                  <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" /> {r.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        <CommandGroup heading="Popular">
          {POPULAR.map((p) => (
            <CommandItem key={p.to} value={`popular ${p.label}`} onSelect={() => go(p.to, p.label)}>
              <TrendingUp className="h-4 w-4 mr-2 text-primary" /> {p.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Services">
          {items.services.map((s) => (
            <CommandItem key={s.to} value={`service ${s.label} ${s.hint}`} onSelect={() => go(s.to, s.label)}>
              <Activity className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">{s.label}</span>
              <span className="ml-2 text-xs text-muted-foreground truncate">{s.hint}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Conditions">
          {items.conditions.map((c) => (
            <CommandItem key={c.to} value={`condition ${c.label} ${c.hint}`} onSelect={() => go(c.to, c.label)}>
              <HeartPulse className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">{c.label}</span>
              <span className="ml-2 text-xs text-muted-foreground truncate">{c.hint}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Pages">
          {items.pages.map((p) => (
            <CommandItem key={p.to} value={`page ${p.label}`} onSelect={() => go(p.to, p.label)}>
              <Stethoscope className="h-4 w-4 mr-2 text-muted-foreground" /> {p.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Gallery">
          {items.gallery.map((g, i) => (
            <CommandItem key={`${g.label}-${i}`} value={`gallery ${g.label} ${g.hint}`} onSelect={() => go(g.to, g.label)}>
              <ImageIcon className="h-4 w-4 mr-2 text-muted-foreground" /> {g.label}
              <span className="ml-2 text-xs text-muted-foreground">{g.hint}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Articles">
          {items.blogs.map((b) => (
            <CommandItem key={b.to} value={`blog ${b.label}`} onSelect={() => go(b.to, b.label)}>
              <Newspaper className="h-4 w-4 mr-2 text-muted-foreground" /> {b.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="FAQs">
          {items.faqs.map((f) => (
            <CommandItem key={f.to} value={`faq ${f.label} ${f.hint}`} onSelect={() => go(f.to, f.label)}>
              <HelpCircle className="h-4 w-4 mr-2 text-muted-foreground" /> {f.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

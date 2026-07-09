import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Phone, Mail, Search, Instagram, Facebook, Youtube, Linkedin,
  ChevronDown, Stethoscope, HeartPulse, Activity, Zap, Dumbbell, Brain,
  Bone, Sparkles, Users, Image as ImageIcon, BookOpen, MessageSquare,
  Info, HelpCircle, Calendar, Star,
} from "lucide-react";
import { nav, site } from "@/lib/site";
import { services, conditions } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/search/SearchDialog";

const serviceIcons: Record<string, any> = {
  "manual-therapy": HeartPulse,
  "exercise-therapy": Dumbbell,
  "electrotherapy": Zap,
  "dry-needling": Activity,
  "shockwave-therapy": Zap,
  "sports-rehabilitation": Dumbbell,
  "cupping-therapy": Sparkles,
  "neurological-physiotherapy": Brain,
};
const conditionIcons: Record<string, any> = {
  "back-pain": Bone,
  "neck-pain": Bone,
  "shoulder-pain": Activity,
  "knee-pain": Bone,
  "sciatica": Activity,
  "slip-disc": Bone,
  "frozen-shoulder": Activity,
  "sports-injury": Dumbbell,
  "arthritis": Bone,
  "stroke-rehab": Brain,
  "neurological-rehab": Brain,
  "post-surgery-rehab": HeartPulse,
};

type MegaItem = { to: string; label: string; desc: string; Icon: any; img?: string };
type MegaTheme = {
  gradient: string;      // utility class
  chip: string;          // small text/badge color
  soft: string;          // soft bg tint
  ring: string;          // hover ring
  layout: "grid" | "list" | "stack" | "mosaic";
  title: string;
  blurb: string;
  cta: string;
};

const megaThemes: Record<string, MegaTheme> = {
  "/services": {
    gradient: "gradient-teal",
    chip: "text-teal-600 bg-teal-50",
    soft: "from-teal-50/70 to-white",
    ring: "hover:ring-teal-300/60",
    layout: "grid",
    title: "Our Treatments",
    blurb: "Hands-on, evidence-based physiotherapy tailored to your goal.",
    cta: "Explore all services",
  },
  "/conditions": {
    gradient: "gradient-rose",
    chip: "text-rose-600 bg-rose-50",
    soft: "from-rose-50/70 to-white",
    ring: "hover:ring-rose-300/60",
    layout: "list",
    title: "Conditions We Treat",
    blurb: "From back pain to stroke recovery — we've got a plan for it.",
    cta: "See all conditions",
  },
  "/about": {
    gradient: "gradient-violet",
    chip: "text-violet-600 bg-violet-50",
    soft: "from-violet-50/70 to-white",
    ring: "hover:ring-violet-300/60",
    layout: "stack",
    title: "About Arnav Physio",
    blurb: "Meet the team, our philosophy and what patients say about us.",
    cta: "About the clinic",
  },
  "/gallery": {
    gradient: "gradient-amber",
    chip: "text-amber-600 bg-amber-50",
    soft: "from-amber-50/70 to-white",
    ring: "hover:ring-amber-300/60",
    layout: "mosaic",
    title: "Explore & Connect",
    blurb: "Photos, articles and quick ways to reach out.",
    cta: "Open gallery",
  },
};

function buildMega(kind: string): MegaItem[] | null {
  if (kind === "/services") {
    return services.slice(0, 8).map((s) => ({
      to: `/services/${s.slug}`,
      label: s.name,
      desc: s.short,
      Icon: serviceIcons[s.slug] || Stethoscope,
    }));
  }
  if (kind === "/conditions") {
    return conditions.slice(0, 8).map((c) => ({
      to: `/conditions/${c.slug}`,
      label: c.name,
      desc: c.summary,
      Icon: conditionIcons[c.slug] || HeartPulse,
      img: c.image,
    }));
  }
  if (kind === "/about") {
    return [
      { to: "/about", label: "Our Story", desc: "Who we are and what drives us.", Icon: Info },
      { to: "/team", label: "Our Team", desc: "Meet Dr. Dushyant Singh & specialists.", Icon: Users },
      { to: "/testimonials", label: "Testimonials", desc: "Real recovery stories from patients.", Icon: Star },
      { to: "/faq", label: "FAQs", desc: "Answers to common questions.", Icon: HelpCircle },
    ];
  }
  if (kind === "/gallery") {
    return [
      { to: "/gallery", label: "Clinic Gallery", desc: "Facilities, treatments and results.", Icon: ImageIcon },
      { to: "/blog", label: "Health Blog", desc: "Tips, guides & wellness reads.", Icon: BookOpen },
      { to: "/contact", label: "Contact", desc: "Reach out — we'll get back fast.", Icon: MessageSquare },
      { to: "/book", label: "Book Now", desc: "Reserve a personalised session.", Icon: Calendar },
    ];
  }
  return null;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") setOpenMega(null);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden md:block gradient-teal text-white text-[13px]">
        <div className="container-page flex h-10 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 opacity-90 hover:opacity-100">
              <Mail className="h-3.5 w-3.5" /> {site.email}
            </a>
            <a href={`tel:${site.phoneRaw1}`} className="flex items-center gap-2 opacity-90 hover:opacity-100">
              <Phone className="h-3.5 w-3.5" /> {site.phone1}
            </a>
            <span className="opacity-80">{site.hours}</span>
          </div>
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, href: site.social.facebook },
              { Icon: Instagram, href: site.social.instagram },
              { Icon: Youtube, href: site.social.youtube },
              { Icon: Linkedin, href: site.social.linkedin },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="opacity-90 hover:opacity-100">
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          "transition-all duration-300 border-b",
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] border-border/60"
            : "bg-white/90 backdrop-blur-md border-transparent",
        )}
      >
        <div className="container-page flex h-[70px] items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <LogoMark />
            <div className="flex flex-col leading-none">
              <span className="text-[17px] font-bold tracking-tight text-foreground">Arnav</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Physiotherapy</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpenMega(null)}>
            {nav.map((n) => {
              const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
              const mega = buildMega(n.to);
              return (
                <div
                  key={n.to}
                  className="relative"
                  onMouseEnter={() => setOpenMega(mega ? n.to : null)}
                >
                  <Link
                    to={n.to}
                    className={cn(
                      "relative flex items-center gap-1 px-3 py-2 text-[14px] font-medium transition-colors",
                      active ? "text-primary" : "text-foreground/80 hover:text-primary",
                    )}
                  >
                    {n.label}
                    {mega && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {mega && openMega === n.to && (
                      <MegaPopover
                        theme={megaThemes[n.to]}
                        items={mega}
                        navTo={n.to}
                        navLabel={n.label}
                        onClose={() => setOpenMega(null)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-border pl-3 pr-1.5 py-1.5 text-xs text-foreground/60 hover:text-primary hover:border-primary/40 transition"
            >
              <Search className="h-3.5 w-3.5" /> Search
              <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground border border-border">⌘K</kbd>
            </button>
            <button
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/70"
            >
              <Search className="h-4 w-4" />
            </button>

            <Link
              to="/book"
              className="hidden sm:inline-flex items-center gap-2 rounded-full gradient-teal px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              Book Appointment
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border bg-white"
            >
              <div className="container-page py-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
                {nav.map((n) => {
                  const mega = buildMega(n.to);
                  const active = mobileSub === n.to;
                  return (
                    <div key={n.to} className="border-b border-border/60 last:border-0">
                      <div className="flex items-center">
                        <Link
                          to={n.to}
                          className="flex-1 px-3 py-3 rounded-xl text-[15px] font-medium text-foreground/90"
                        >
                          {n.label}
                        </Link>
                        {mega && (
                          <button
                            aria-label="Toggle"
                            onClick={() => setMobileSub(active ? null : n.to)}
                            className="p-3 text-foreground/60"
                          >
                            <ChevronDown className={cn("h-4 w-4 transition", active && "rotate-180")} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {mega && active && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-3 pb-3"
                          >
                            <div className="grid gap-1">
                              {mega.map((m) => (
                                <Link key={m.to} to={m.to} className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted">
                                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                                    <m.Icon className="h-3.5 w-3.5" />
                                  </div>
                                  <span className="text-sm text-foreground/80">{m.label}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
                <Link to="/book" className="mt-3 text-center rounded-full gradient-teal px-5 py-3 text-sm font-semibold text-white">
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

function LogoMark() {
  return (
    <div className="relative grid h-10 w-10 place-items-center rounded-2xl gradient-teal shadow-soft">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
        <path d="M9 11l2 2 4-4" />
      </svg>
    </div>
  );
}

function MegaPopover({
  theme,
  items,
  navTo,
  navLabel,
  onClose,
}: {
  theme: MegaTheme;
  items: MegaItem[];
  navTo: string;
  navLabel: string;
  onClose: () => void;
}) {
  const wrap = (children: React.ReactNode, widthClass = "w-[680px]") => (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-40"
    >
      <div className={cn("rounded-3xl border border-border/70 bg-white shadow-[0_30px_80px_-25px_rgba(15,23,42,0.35)] overflow-hidden", widthClass)}>
        {/* Colored header strip */}
        <div className={cn("relative px-5 py-4 text-white", theme.gradient)}>
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] opacity-80">{navLabel}</div>
              <div className="text-lg font-bold leading-tight mt-0.5">{theme.title}</div>
            </div>
            <Link to="/book" onClick={onClose} className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur px-3.5 py-1.5 text-[11px] font-semibold border border-white/25">
              Book Now
            </Link>
          </div>
          <p className="relative mt-1.5 text-[12px] opacity-90 max-w-md">{theme.blurb}</p>
        </div>
        {children}
        <div className={cn("bg-gradient-to-br px-5 py-3 border-t border-border/60 flex items-center justify-between", theme.soft)}>
          <Link to={navTo} onClick={onClose} className={cn("text-[12px] font-semibold inline-flex items-center gap-1 px-2.5 py-1 rounded-full", theme.chip)}>
            {theme.cta} →
          </Link>
          <span className="text-[11px] text-muted-foreground">Press <kbd className="rounded bg-white border border-border px-1.5 py-0.5 text-[10px] font-semibold">Esc</kbd> to close</span>
        </div>
      </div>
    </motion.div>
  );

  if (theme.layout === "grid") {
    return wrap(
      <div className="p-4 grid grid-cols-2 gap-1.5">
        {items.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            onClick={onClose}
            className={cn("group flex gap-3 rounded-2xl p-3 ring-1 ring-transparent transition-all hover:bg-muted/50", theme.ring)}
          >
            <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-soft group-hover:scale-110 transition", theme.gradient)}>
              <m.Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-foreground truncate">{m.label}</div>
              <div className="text-[11.5px] text-muted-foreground leading-snug line-clamp-2 mt-0.5">{m.desc}</div>
            </div>
          </Link>
        ))}
      </div>,
      "w-[680px]",
    );
  }

  if (theme.layout === "list") {
    return wrap(
      <div className="p-3 grid grid-cols-2 gap-1.5">
        {items.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            onClick={onClose}
            className="group flex items-center gap-3 rounded-2xl p-2 hover:bg-rose-50/70 transition"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-rose-100 bg-rose-50">
              {m.img ? (
                <SafeImg src={m.img} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="grid h-full w-full place-items-center text-rose-600"><m.Icon className="h-5 w-5" /></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-foreground truncate group-hover:text-rose-600 transition">{m.label}</div>
              <div className="text-[11px] text-muted-foreground line-clamp-2 leading-snug">{m.desc}</div>
            </div>
          </Link>
        ))}
      </div>,
      "w-[680px]",
    );
  }

  if (theme.layout === "stack") {
    return wrap(
      <div className="p-4 grid gap-2">
        {items.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            onClick={onClose}
            className="group relative overflow-hidden flex items-center gap-4 rounded-2xl p-3.5 bg-gradient-to-r from-violet-50/60 to-white border border-violet-100 hover:border-violet-300 hover:shadow-soft transition"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-violet text-white shadow-soft group-hover:scale-110 group-hover:rotate-3 transition">
              <m.Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13.5px] font-bold text-foreground truncate">{m.label}</div>
              <div className="text-[12px] text-muted-foreground line-clamp-1">{m.desc}</div>
            </div>
            <div className="text-violet-600 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition">Open →</div>
          </Link>
        ))}
      </div>,
      "w-[540px]",
    );
  }

  // mosaic (gallery)
  return wrap(
    <div className="p-4 grid grid-cols-2 gap-2.5">
      {items.map((m, i) => (
        <Link
          key={m.to}
          to={m.to}
          onClick={onClose}
          className={cn(
            "group relative overflow-hidden rounded-2xl p-4 border border-amber-100 hover:border-amber-300 transition min-h-[92px]",
            i === 0 ? "col-span-2 bg-gradient-to-br from-amber-100 via-amber-50 to-white" : "bg-gradient-to-br from-amber-50/70 to-white",
          )}
        >
          <div className="flex items-start justify-between">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-amber text-white shadow-soft group-hover:scale-110 transition">
              <m.Icon className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <div className="mt-3 text-[14px] font-bold text-foreground">{m.label}</div>
          <div className="text-[11.5px] text-muted-foreground line-clamp-2 mt-0.5">{m.desc}</div>
        </Link>
      ))}
    </div>,
    "w-[560px]",
  );
}

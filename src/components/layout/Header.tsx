import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, Search, Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/search/SearchDialog";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // ⌘K / Ctrl-K to open search
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
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
      <div className={cn("transition-all duration-300", scrolled ? "glass-nav shadow-soft" : "bg-white/80 backdrop-blur-md")}>
        <div className="container-page flex h-[70px] items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <LogoMark />
            <div className="flex flex-col leading-none">
              <span className="text-[17px] font-bold tracking-tight text-foreground">Arnav</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Physiotherapy</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((n) => {
              const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "relative px-3 py-2 text-[14px] font-medium transition-colors",
                    active ? "text-primary" : "text-foreground/80 hover:text-primary"
                  )}
                >
                  {n.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-primary"
                    />
                  )}
                </Link>
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
              <div className="container-page py-4 flex flex-col gap-1">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="px-3 py-3 rounded-xl text-[15px] font-medium text-foreground/90 hover:bg-muted"
                  >
                    {n.label}
                  </Link>
                ))}
                <Link to="/book" className="mt-2 text-center rounded-full gradient-teal px-5 py-3 text-sm font-semibold text-white">
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <div className="relative grid h-10 w-10 place-items-center rounded-2xl gradient-teal shadow-soft">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
        <path d="M9 11l2 2 4-4" />
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


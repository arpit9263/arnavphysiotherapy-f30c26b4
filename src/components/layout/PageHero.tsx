import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Home, ChevronRight, Sparkles } from "lucide-react";

// Unified single-theme (teal) page hero across all routes.
// The `accent` prop is kept for backwards compatibility but ignored.
type Accent = "teal" | "coral" | "violet" | "amber" | "rose" | "sky";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs = [],
  image = "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=2000&q=80",
  accent: _accent = "teal",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: { label: string; to?: string }[];
  image?: string;
  accent?: Accent;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
      />
      {/* Unified teal scrim */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-800 to-cyan-900 opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/45" />

      {/* Decorative blobs (single theme) */}
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-teal-400/30 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative container-page pt-14 pb-16 md:pt-24 md:pb-24 text-center">
        <nav className="flex items-center justify-center gap-1.5 text-xs text-white/80 mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-white transition"><Home className="h-3 w-3" /> Home</Link>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" />
              {b.to ? <Link to={b.to} className="hover:text-white transition">{b.label}</Link> : <span className="text-white font-semibold">{b.label}</span>}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border bg-teal-400/20 text-teal-50 border-teal-300/40 backdrop-blur px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
          >
            <Sparkles className="h-3 w-3" /> {eyebrow}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

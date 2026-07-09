import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Home, ChevronRight, Sparkles } from "lucide-react";

type Accent = "teal" | "coral" | "violet" | "amber" | "rose" | "sky";

const accentMap: Record<Accent, { grad: string; ring: string; chip: string; blob1: string; blob2: string }> = {
  teal:   { grad: "from-teal-600 via-teal-700 to-cyan-800",       ring: "ring-teal-300/40",   chip: "bg-teal-400/20 text-teal-50 border-teal-300/40",       blob1: "bg-teal-400/30",   blob2: "bg-cyan-400/25" },
  coral:  { grad: "from-orange-600 via-rose-600 to-rose-700",     ring: "ring-orange-300/40", chip: "bg-orange-400/20 text-orange-50 border-orange-300/40", blob1: "bg-orange-400/30", blob2: "bg-rose-400/25" },
  violet: { grad: "from-violet-700 via-indigo-700 to-purple-800", ring: "ring-violet-300/40", chip: "bg-violet-400/20 text-violet-50 border-violet-300/40", blob1: "bg-violet-400/30", blob2: "bg-indigo-400/25" },
  amber:  { grad: "from-amber-500 via-orange-600 to-red-600",     ring: "ring-amber-300/40",  chip: "bg-amber-400/20 text-amber-50 border-amber-300/40",    blob1: "bg-amber-400/30",  blob2: "bg-orange-400/25" },
  rose:   { grad: "from-rose-600 via-pink-600 to-fuchsia-700",    ring: "ring-rose-300/40",   chip: "bg-rose-400/20 text-rose-50 border-rose-300/40",       blob1: "bg-rose-400/30",   blob2: "bg-pink-400/25" },
  sky:    { grad: "from-sky-600 via-blue-700 to-indigo-800",      ring: "ring-sky-300/40",    chip: "bg-sky-400/20 text-sky-50 border-sky-300/40",          blob1: "bg-sky-400/30",    blob2: "bg-blue-400/25" },
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs = [],
  image = "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=2000&q=80",
  accent = "teal",
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
  const a = accentMap[accent];
  return (
    <section className="relative overflow-hidden">
      {/* Background image + strong colorful scrim */}
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-br ${a.grad} opacity-90`} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

      {/* Decorative blobs */}
      <div className={`absolute -left-24 top-16 h-72 w-72 rounded-full ${a.blob1} blur-3xl`} />
      <div className={`absolute -right-24 bottom-0 h-80 w-80 rounded-full ${a.blob2} blur-3xl`} />

      {/* Dotted grid overlay */}
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
            className={`inline-flex items-center gap-1.5 rounded-full border ${a.chip} backdrop-blur px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]`}
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

      {/* Bottom fade to page */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

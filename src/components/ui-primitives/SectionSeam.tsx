import { motion } from "framer-motion";

/**
 * Elegant seam between sections. Renders a soft top gradient bleed plus a hair
 * rule with an animated pulse dot, so sections feel *connected* rather than
 * stacked. Place directly between two <section>s.
 */
export function SectionSeam({ tone = "light" }: { tone?: "light" | "dark" }) {
  const grad =
    tone === "dark"
      ? "from-transparent via-white/10 to-transparent"
      : "from-transparent via-border to-transparent";
  return (
    <div className="relative h-16 md:h-24" aria-hidden>
      <div className={`absolute inset-x-0 top-1/2 h-px bg-gradient-to-r ${grad}`} />
      <motion.span
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-2 w-2 place-items-center rounded-full bg-primary/70 shadow-[0_0_0_6px_rgba(20,184,166,0.10)]"
      />
    </div>
  );
}

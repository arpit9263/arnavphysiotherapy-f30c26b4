import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeartPulse, Dumbbell, Brain, Zap, ArrowRight } from "lucide-react";

/**
 * Restored compact feature strip — overlaps the hero, four icon-led pills.
 * Polished version of the original design.
 */
const items = [
  {
    icon: HeartPulse,
    kicker: "Personalised Plan",
    title: "Start Your Recovery",
    desc: "One-on-one assessment and a plan built around your goals.",
    to: "/services/manual-therapy",
    tone: "from-teal-50 via-white to-white",
    iconBg: "gradient-teal",
    accent: "text-teal-600",
    glow: "bg-teal-400/20",
  },
  {
    icon: Dumbbell,
    kicker: "Sports Rehab",
    title: "Return to Sport Stronger",
    desc: "Return-to-play pathway led by an MPT (Sports) specialist.",
    to: "/services/sports-rehabilitation",
    tone: "from-orange-50 via-white to-white",
    iconBg: "gradient-coral",
    accent: "text-orange-600",
    glow: "bg-orange-400/20",
  },
  {
    icon: Brain,
    kicker: "Neuro Rehab",
    title: "Regain Movement",
    desc: "Post-stroke, Parkinson's & neurological recovery programmes.",
    to: "/services/neurological-physiotherapy",
    tone: "from-violet-50 via-white to-white",
    iconBg: "gradient-violet",
    accent: "text-violet-600",
    glow: "bg-violet-400/20",
  },
  {
    icon: Zap,
    kicker: "Chronic Pain",
    title: "Release Deep Pain",
    desc: "Dry needling, shockwave & manual therapy that actually works.",
    to: "/services/dry-needling",
    tone: "from-amber-50 via-white to-white",
    iconBg: "gradient-amber",
    accent: "text-amber-600",
    glow: "bg-amber-400/20",
  },
];

export function QuickServices() {
  return (
    <section className="relative -mt-16 md:-mt-24 z-10">
      <div className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link
                to={it.to}
                className={`group relative block h-full rounded-3xl bg-gradient-to-br ${it.tone} border border-border/60 p-6 shadow-card hover:shadow-glow hover:-translate-y-1.5 transition-all duration-500 overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-teal text-white shadow-soft group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    {it.kicker}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-foreground leading-snug">{it.title}</h3>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed line-clamp-2">{it.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

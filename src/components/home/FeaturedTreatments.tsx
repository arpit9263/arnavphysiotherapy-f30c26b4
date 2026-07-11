import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, HeartPulse, Dumbbell, Activity, Brain } from "lucide-react";
import { SectionHeader } from "@/components/ui-primitives/Section";

const cards = [
  {
    eyebrow: "Expert Care",
    title: "Expert Physiotherapy Care",
    desc: "One-to-one assessment and hands-on treatment led by qualified physiotherapists.",
    to: "/services/manual-therapy",
    Icon: HeartPulse,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    tag: "Manual Therapy",
    iconBg: "gradient-teal",
    scrim: "from-teal-900/75",
    badge: "text-teal-700",
    arrow: "text-teal-700",
  },
  {
    eyebrow: "Personalised",
    title: "Wellness Programmes",
    desc: "Structured exercise, posture and lifestyle plans for long-term prevention.",
    to: "/services/exercise-therapy",
    Icon: Activity,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
    tag: "Exercise Therapy",
    iconBg: "gradient-emerald",
    scrim: "from-emerald-900/75",
    badge: "text-emerald-700",
    arrow: "text-emerald-700",
  },
  {
    eyebrow: "Trusted Recovery",
    title: "Sports Rehabilitation",
    desc: "Return-to-play pathways for athletes — from acute injury to peak performance.",
    to: "/services/sports-rehabilitation",
    Icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1200&q=80",
    tag: "Sports Rehab",
    iconBg: "gradient-coral",
    scrim: "from-orange-900/75",
    badge: "text-orange-700",
    arrow: "text-orange-700",
  },
  {
    eyebrow: "Long-Term Support",
    title: "Neurological Rehab",
    desc: "Post-stroke, Parkinson's and neuro-recovery programmes with measurable outcomes.",
    to: "/services/neurological-physiotherapy",
    Icon: Brain,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
    tag: "Neuro Rehab",
    iconBg: "gradient-violet",
    scrim: "from-violet-900/75",
    badge: "text-violet-700",
    arrow: "text-violet-700",
  },
];

export function FeaturedTreatments() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeader
          eyebrow="What We Do"
          title="Care built around your recovery"
          subtitle="Four core programmes that cover almost every patient at Arnav Physiotherapy — each led by a specialist, backed by evidence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <Link
                to={c.to}
                className="group relative flex flex-col h-full rounded-3xl bg-white border border-border/60 ring-card hover:-translate-y-1.5 hover:shadow-glow transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden rounded-t-3xl">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg"; }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${c.scrim} via-transparent to-transparent opacity-90`} />
                  <span className={`absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${c.badge} border border-white shadow-sm`}>
                    {c.eyebrow}
                  </span>
                </div>

                {/* Icon badge — sits on the seam */}
                <div
                  className={`absolute left-5 top-[9.75rem] z-10 grid h-11 w-11 place-items-center rounded-2xl ${c.iconBg} text-white shadow-lg ring-4 ring-white group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}
                  aria-hidden
                >
                  <c.Icon className="h-5 w-5" strokeWidth={2} />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 pt-8">
                  <h3 className="text-[15.5px] font-bold text-foreground leading-snug tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed flex-1">{c.desc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.18em]">{c.tag}</span>
                    <span className={`inline-flex items-center gap-1 text-[12px] font-semibold ${c.arrow} group-hover:gap-2.5 transition-all`}>
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


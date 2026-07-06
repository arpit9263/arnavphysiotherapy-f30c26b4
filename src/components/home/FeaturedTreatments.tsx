import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    eyebrow: "Start Your Recovery",
    title: "Expert Physiotherapy Care",
    to: "/services/manual-therapy",
    bg: "bg-[#E6F5F3]",
    accent: "text-primary",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "Personalised",
    title: "Wellness Programmes",
    to: "/services/exercise-therapy",
    bg: "bg-[#FDECE4]",
    accent: "text-[oklch(0.55_0.15_35)]",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "Trusted Recovery",
    title: "Sports Rehabilitation",
    to: "/services/sports-rehabilitation",
    bg: "bg-[#E9F3E6]",
    accent: "text-[oklch(0.45_0.12_140)]",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "Long-Term Support",
    title: "Neurological Rehab",
    to: "/services/neurological-physiotherapy",
    bg: "bg-[#FFF4D6]",
    accent: "text-[oklch(0.55_0.14_75)]",
    image: "https://images.unsplash.com/photo-1631815588090-d1bcbe9a8537?auto=format&fit=crop&w=900&q=80",
  },
];

export function FeaturedTreatments() {
  return (
    <section className="pt-16 md:pt-24 pb-4">
      <div className="container-page grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <Link
              to={c.to}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl ${c.bg} p-6 h-[280px] card-lift card-lift-hover`}
            >
              <div>
                <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${c.accent}`}>{c.eyebrow}</div>
                <h3 className="mt-3 text-2xl font-bold text-foreground leading-tight max-w-[10ch]">{c.title}</h3>
              </div>
              <span className="inline-flex w-max items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-soft group-hover:gap-3 transition-all">
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 object-cover rounded-2xl opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

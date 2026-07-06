import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, Trophy, HandMetal, Heart, Home as HomeIcon } from "lucide-react";

const quick = [
  { icon: Activity, name: "Pain Relief", desc: "Targeted therapy for lasting relief.", to: "/services/manual-therapy", color: "text-primary bg-primary/10" },
  { icon: Trophy, name: "Sports Injury", desc: "Return-to-play rehabilitation.", to: "/services/sports-rehabilitation", color: "text-brand-cyan bg-brand-cyan/10" },
  { icon: HandMetal, name: "Manual Therapy", desc: "Hands-on techniques that work.", to: "/services/manual-therapy", color: "text-primary-glow bg-primary-glow/10" },
  { icon: Heart, name: "Post-Surgery Rehab", desc: "Expert care after surgery.", to: "/services/exercise-therapy", color: "text-[oklch(0.65_0.18_25)] bg-[oklch(0.95_0.05_25)]" },
  { icon: HomeIcon, name: "Home Physiotherapy", desc: "Care in the comfort of home.", to: "/contact", color: "text-[oklch(0.55_0.15_280)] bg-[oklch(0.95_0.04_280)]" },
];

export function QuickServices() {
  return (
    <section className="relative -mt-8 md:-mt-14 z-10">
      <div className="container-page">
        <div className="rounded-3xl bg-white shadow-card border border-border p-4 md:p-6 grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
          {quick.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link
                to={q.to}
                className="group flex flex-col items-start gap-3 rounded-2xl p-4 md:p-5 hover:bg-muted transition-all"
              >
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${q.color} group-hover:scale-110 transition`}>
                  <q.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-foreground">{q.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{q.desc}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

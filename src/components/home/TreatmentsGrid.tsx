import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";

export function TreatmentsGrid() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container-page">
        <SectionHeader eyebrow="Our Treatments" title="Effective Physiotherapy Solutions" subtitle="A complete toolkit of evidence-based treatments — combined into a plan that's uniquely yours." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            >
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group block rounded-3xl bg-white border border-border shadow-card overflow-hidden card-lift card-lift-hover h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition">{s.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">{s.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

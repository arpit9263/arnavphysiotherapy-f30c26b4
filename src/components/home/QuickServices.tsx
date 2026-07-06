import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";

/**
 * Home feature cards — large imagery, curved corners, layered shadows,
 * smooth hover reveals. Replaces the flat icon-only strip.
 */
const featured = [
  {
    slug: "manual-therapy",
    label: "Start Your Recovery",
    kicker: "Personalised Plan",
  },
  {
    slug: "sports-rehabilitation",
    label: "Return to Sport Stronger",
    kicker: "Sports Rehab",
  },
  {
    slug: "neurological-physiotherapy",
    label: "Expert Physiotherapy Care",
    kicker: "Neuro Rehab",
  },
  {
    slug: "dry-needling",
    label: "Release Chronic Pain",
    kicker: "Dry Needling",
  },
];

export function QuickServices() {
  const items = featured
    .map((f) => ({ ...f, service: services.find((s) => s.slug === f.slug)! }))
    .filter((x) => x.service);

  return (
    <section className="relative -mt-10 md:-mt-20 z-10">
      <div className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link
                to="/services/$slug"
                params={{ slug: it.slug }}
                className="group relative block rounded-3xl overflow-hidden bg-white shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-1.5 border border-border/60 aspect-[4/5]"
              >
                <img
                  src={it.service.image}
                  alt={it.label}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.05_220)]/95 via-[oklch(0.22_0.05_220)]/40 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <span className="inline-flex w-max items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                    {it.kicker}
                  </span>
                  <h3 className="mt-3 text-xl md:text-2xl font-bold leading-tight">{it.label}</h3>
                  <p className="mt-1.5 text-sm text-white/85 line-clamp-2">{it.service.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
                {/* Corner glow */}
                <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary-glow/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

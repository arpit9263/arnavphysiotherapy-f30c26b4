import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { conditions } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";

export function ConditionsSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };
  return (
    <section className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeader eyebrow="We Treat" title="Conditions We Help With" subtitle="From everyday aches to complex recoveries — we design a plan that fits you." />
        <div className="relative">
          <button aria-label="Scroll left" onClick={() => scroll(-1)}
            className="hidden md:grid absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 place-items-center rounded-full bg-white border border-border shadow-soft hover:bg-muted">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div ref={ref} className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1">
            {conditions.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                className="snap-start"
              >
                <Link to="/conditions/$slug" params={{ slug: c.slug }} className="group flex flex-col items-center gap-3 w-[120px] md:w-[140px]">
                  <div className="relative h-[110px] w-[110px] md:h-[130px] md:w-[130px] rounded-full overflow-hidden border border-border shadow-soft group-hover:shadow-glow transition-all">
                    <img src={c.image} alt={c.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 ring-4 ring-white/60 rounded-full pointer-events-none" />
                  </div>
                  <div className="text-sm font-semibold text-foreground text-center group-hover:text-primary transition">{c.name}</div>
                </Link>
              </motion.div>
            ))}
          </div>
          <button aria-label="Scroll right" onClick={() => scroll(1)}
            className="hidden md:grid absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 place-items-center rounded-full bg-white border border-border shadow-soft hover:bg-muted">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

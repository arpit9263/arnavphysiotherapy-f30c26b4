import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { services } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";

export function TreatmentsGrid() {
  const autoplay = useRef(Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true, containScroll: "trimSnaps" },
    [autoplay.current],
  );
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              Our Treatments
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Effective Physiotherapy Solutions</h2>
            <p className="mt-3 text-[15px] text-muted-foreground">
              Evidence-based treatments — combined into a plan that's uniquely yours.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button
                aria-label="Previous"
                onClick={prev}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full gradient-teal px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="overflow-hidden -mx-2 px-2" ref={emblaRef}>
          <div className="flex gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                className="shrink-0 basis-[80%] sm:basis-[48%] md:basis-[33%] lg:basis-[25%] xl:basis-[22%]"
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group block h-full rounded-3xl bg-white border border-border shadow-card overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[16px] font-bold text-foreground group-hover:text-primary transition line-clamp-1">
                      {s.name}
                    </h3>
                    <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed line-clamp-2">{s.short}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:gap-2.5 transition-all">
                      Learn More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex md:hidden items-center justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === selected ? "w-8 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { conditions } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";

/**
 * Autoplay carousel of conditions we treat. Pauses on hover,
 * supports touch, prev/next controls and dot navigation.
 */
export function ConditionsSlider() {
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false, containScroll: "trimSnaps" },
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
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-surface">
      <div className="container-page">
        <SectionHeader
          eyebrow="We Treat"
          title="Conditions We Help With"
          subtitle="From everyday aches to complex recoveries — we design a plan that fits you."
        />

        <div className="relative">
          <button
            aria-label="Previous conditions"
            onClick={prev}
            className="hidden md:grid absolute -left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 place-items-center rounded-full bg-white border border-border shadow-soft hover:bg-primary hover:text-white hover:border-primary transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5 md:gap-6">
              {conditions.map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                  className="shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[30%] xl:basis-[24%]"
                >
                  <Link
                    to="/conditions/$slug"
                    params={{ slug: c.slug }}
                    className="group block h-full rounded-3xl bg-white border border-border shadow-card overflow-hidden hover:shadow-glow hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="aspect-[5/4] overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition">{c.name}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">{c.summary}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                        Learn more <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            aria-label="Next conditions"
            onClick={next}
            className="hidden md:grid absolute -right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 place-items-center rounded-full bg-white border border-border shadow-soft hover:bg-primary hover:text-white hover:border-primary transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === selected ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

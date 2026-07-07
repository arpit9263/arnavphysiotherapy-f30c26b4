import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { conditions } from "@/lib/data";
import { SectionHeader } from "@/components/ui-primitives/Section";

/**
 * Original circular condition cards, polished — round image with title below,
 * autoplay carousel, click routes to condition detail page.
 */
export function ConditionsSlider() {
  const autoplay = useRef(Autoplay({ delay: 3200, stopOnInteraction: false, stopOnMouseEnter: true }));
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
    <section className="py-20 md:py-28 bg-gradient-to-b from-white via-brand-mint/40 to-white relative overflow-hidden">
      <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 -right-20 h-72 w-72 rounded-full bg-brand-cyan/10 blur-3xl" />
      <div className="container-page relative">
        <SectionHeader
          eyebrow="We Treat"
          title="Conditions We Help With"
          subtitle="From everyday aches to complex recoveries — we design a plan that fits you."
        />

        <div className="relative">
          <button
            aria-label="Previous"
            onClick={prev}
            className="hidden md:grid absolute -left-4 top-[38%] -translate-y-1/2 z-20 h-11 w-11 place-items-center rounded-full bg-white border border-border shadow-soft hover:bg-primary hover:text-white hover:border-primary transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 md:gap-8 py-4">
              {conditions.map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                  className="shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-[16.66%]"
                >
                  <Link
                    to="/conditions/$slug"
                    params={{ slug: c.slug }}
                    className="group flex flex-col items-center text-center"
                  >
                    <div className="relative">
                      {/* Decorative ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-brand-cyan/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110" />
                      <div className="relative h-32 w-32 md:h-36 md:w-36 rounded-full p-1 bg-gradient-to-br from-primary to-brand-cyan shadow-card group-hover:shadow-glow group-hover:-translate-y-1 transition-all duration-500">
                        <div className="h-full w-full rounded-full bg-white p-1.5">
                          <div className="h-full w-full overflow-hidden rounded-full ring-2 ring-white">
                            <img
                              src={c.image}
                              alt={c.name}
                              loading="lazy"
                              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="mt-4 text-sm md:text-[15px] font-bold text-foreground group-hover:text-primary transition-colors">
                      {c.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 max-w-[16ch]">
                      {c.summary.split("—")[0].split(",")[0]}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            aria-label="Next"
            onClick={next}
            className="hidden md:grid absolute -right-4 top-[38%] -translate-y-1/2 z-20 h-11 w-11 place-items-center rounded-full bg-white border border-border shadow-soft hover:bg-primary hover:text-white hover:border-primary transition"
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

        <div className="mt-10 text-center">
          <Link
            to="/conditions"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-white px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition"
          >
            View All Conditions
          </Link>
        </div>
      </div>
    </section>
  );
}

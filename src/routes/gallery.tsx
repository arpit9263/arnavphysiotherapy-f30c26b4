import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { galleryItems, type GalleryItem } from "@/lib/data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Arnav Physiotherapy Centre, Jhansi" },
      { name: "description", content: "Take a tour of our clinic, equipment and treatment sessions at Arnav Physiotherapy Centre, Jhansi." },
      { property: "og:title", content: "Gallery — Arnav Physiotherapy Centre" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const CATEGORIES = ["All", "Clinic", "Treatments", "Equipment", "Sessions"] as const;

function GalleryPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const items = useMemo<GalleryItem[]>(
    () => (filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter)),
    [filter],
  );

  const close = useCallback(() => setOpenIdx(null), []);
  const next = useCallback(() => setOpenIdx((i) => (i === null ? i : (i + 1) % items.length)), [items.length]);
  const prev = useCallback(() => setOpenIdx((i) => (i === null ? i : (i - 1 + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (openIdx === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [openIdx, close, next, prev]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inside Arnav Physio"
        subtitle="A calm, modern clinic built around recovery — clinic space, equipment and real treatment sessions."
        breadcrumbs={[{ label: "Gallery" }]}
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          {/* Category filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={
                  "rounded-full px-5 py-2 text-sm font-semibold transition " +
                  (filter === c
                    ? "gradient-teal text-white shadow-soft"
                    : "bg-white border border-border text-foreground/70 hover:text-primary hover:border-primary/40")
                }
              >
                {c}
              </button>
            ))}
          </div>

          {/* Masonry grid via CSS columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
            <AnimatePresence>
              {items.map((it, i) => (
                <motion.button
                  key={it.src}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                  onClick={() => setOpenIdx(i)}
                  className="group block w-full break-inside-avoid rounded-3xl overflow-hidden bg-white border border-border shadow-card hover:shadow-glow transition-all"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={it.src}
                      alt={it.title}
                      loading="lazy"
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                      <div className="text-xs font-bold uppercase tracking-widest text-white/80">{it.category}</div>
                      <div className="text-sm font-semibold">{it.title}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {openIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.figure
              key={items[openIdx].src}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl max-h-[85vh] flex flex-col items-center gap-4"
            >
              <img src={items[openIdx].src} alt={items[openIdx].title} className="max-h-[75vh] w-auto rounded-2xl object-contain" />
              <figcaption className="text-white/90 text-sm">
                <span className="font-bold text-white">{items[openIdx].title}</span>
                <span className="mx-2 opacity-50">•</span>
                <span className="opacity-80">{items[openIdx].category}</span>
                <span className="mx-2 opacity-50">•</span>
                <span className="opacity-60">{openIdx + 1} / {items.length}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

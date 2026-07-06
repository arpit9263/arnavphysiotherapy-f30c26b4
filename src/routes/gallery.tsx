import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { galleryImages } from "@/lib/data";
import { motion } from "framer-motion";
import { BookCTA } from "@/components/home/BookCTA";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Inside Arnav Physiotherapy Centre" },
      { name: "description", content: "A look inside our clinic in Jhansi — treatment rooms, equipment and therapy sessions." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Inside our clinic"
        subtitle="A calm, private space designed to help you focus on recovery."
        breadcrumbs={[{ label: "Gallery" }]} />
      <section className="py-14 md:py-20">
        <div className="container-page columns-2 md:columns-3 lg:columns-4 gap-4">
          {galleryImages.concat(galleryImages).map((src, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl shadow-soft group">
              <img src={src} alt="" loading="lazy" className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${i % 4 === 0 ? "h-72" : i % 3 === 0 ? "h-64" : "h-56"}`} />
            </motion.div>
          ))}
        </div>
      </section>
      <BookCTA />
    </>
  );
}

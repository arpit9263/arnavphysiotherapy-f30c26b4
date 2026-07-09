import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/layout/PageHero";
import { AboutBlock } from "@/components/home/AboutBlock";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { WhyChoose } from "@/components/home/WhyChoose";
import { TeamGrid } from "@/components/home/TeamGrid";
import { BookCTA } from "@/components/home/BookCTA";
import { motion } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Arnav Physiotherapy Centre — Jhansi" },
      { name: "description", content: "Learn about Arnav Physiotherapy Centre, led by Dr. Dushyant Singh (BPT, MPT Sports) — a modern, evidence-based rehabilitation practice in Jhansi." },
      { property: "og:title", content: "About Arnav Physiotherapy Centre" },
      { property: "og:description", content: "A modern, evidence-based rehabilitation practice in Jhansi." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { n: "10+", l: "Years of practice" },
  { n: "5,000+", l: "Patients treated" },
  { n: "12+", l: "Conditions treated" },
  { n: "98%", l: "Would recommend" },
];

function AboutPage() {
  return (
    <>
      <PageHero
        accent="violet"
        eyebrow="About Us"
        title="A quieter, more human way to recover"
        subtitle="We are a modern physiotherapy and rehabilitation practice in Jhansi, blending evidence-based care with genuine, unhurried attention."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="py-14 md:py-20">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.l}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-3xl bg-surface p-6 text-center border border-border">
              <div className="text-3xl md:text-4xl font-bold text-gradient-teal">{s.n}</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <AboutBlock />
      <WhyChoose />
      <ProcessTimeline />
      <TeamGrid />
      <BookCTA />
    </>
  );
}

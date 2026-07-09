import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui-primitives/Section";

/**
 * Interactive body-area finder — click a body part, get matched conditions & treatment.
 * A unique, tactile section that helps visitors self-navigate to the right care.
 */
type Area = {
  id: string;
  label: string;
  // approximate % coords on the illustrated silhouette
  x: number;
  y: number;
  conditions: { name: string; to: string }[];
  treatment: { name: string; to: string };
  blurb: string;
};

const areas: Area[] = [
  {
    id: "neck",
    label: "Neck",
    x: 50, y: 14,
    blurb: "Stiff neck, cervical pain and posture-related aches from long desk hours.",
    conditions: [
      { name: "Neck Pain", to: "/conditions/neck-pain" },
      { name: "Cervical Stiffness", to: "/conditions/neck-pain" },
    ],
    treatment: { name: "Manual Therapy", to: "/services/manual-therapy" },
  },
  {
    id: "shoulder",
    label: "Shoulder",
    x: 30, y: 22,
    blurb: "Frozen shoulder, rotator cuff strain and overhead-movement pain.",
    conditions: [
      { name: "Frozen Shoulder", to: "/conditions/frozen-shoulder" },
      { name: "Shoulder Pain", to: "/conditions/shoulder-pain" },
    ],
    treatment: { name: "Dry Needling", to: "/services/dry-needling" },
  },
  {
    id: "back",
    label: "Back",
    x: 50, y: 36,
    blurb: "Lower-back pain, slip disc and sciatica from lifting or long sitting.",
    conditions: [
      { name: "Back Pain", to: "/conditions/back-pain" },
      { name: "Slip Disc", to: "/conditions/slip-disc" },
      { name: "Sciatica", to: "/conditions/sciatica" },
    ],
    treatment: { name: "Exercise Therapy", to: "/services/exercise-therapy" },
  },
  {
    id: "knee",
    label: "Knee",
    x: 44, y: 68,
    blurb: "Runner's knee, arthritis flare-ups and post-surgical knee recovery.",
    conditions: [
      { name: "Knee Pain", to: "/conditions/knee-pain" },
      { name: "Arthritis", to: "/conditions/arthritis" },
      { name: "Post-Surgery Rehab", to: "/conditions/post-surgery-rehab" },
    ],
    treatment: { name: "Sports Rehabilitation", to: "/services/sports-rehabilitation" },
  },
  {
    id: "neuro",
    label: "Neuro",
    x: 68, y: 14,
    blurb: "Post-stroke recovery, Parkinson's mobility and balance training.",
    conditions: [
      { name: "Stroke Rehab", to: "/conditions/stroke-rehab" },
      { name: "Neurological Rehab", to: "/conditions/neurological-rehab" },
    ],
    treatment: { name: "Neurological Physiotherapy", to: "/services/neurological-physiotherapy" },
  },
  {
    id: "sports",
    label: "Sports Injury",
    x: 30, y: 68,
    blurb: "ACL rehab, ankle sprains and return-to-play conditioning for athletes.",
    conditions: [
      { name: "Sports Injury", to: "/conditions/sports-injury" },
    ],
    treatment: { name: "Sports Rehabilitation", to: "/services/sports-rehabilitation" },
  },
];

export function BodyMapFinder() {
  const [active, setActive] = useState<string>(areas[2].id);
  const current = areas.find((a) => a.id === active)!;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-teal-50/40 via-white to-white">
      <div className="container-page">
        <SectionHeader
          eyebrow="Where Does It Hurt?"
          title="Find the Right Care in One Tap"
          subtitle="Tap the area of your body that's bothering you — we'll show you the conditions we treat there and the recommended physiotherapy programme."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1.1fr] gap-8 lg:gap-12 items-center">
          {/* Interactive silhouette */}
          <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-3xl bg-gradient-to-br from-teal-100/70 via-white to-cyan-50/60 border border-border/60 shadow-card overflow-hidden">
            {/* backdrop grid */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(20,184,166,0.12) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* Body silhouette (simple SVG) */}
            <svg
              viewBox="0 0 100 130"
              className="absolute inset-0 h-full w-full text-teal-600/25"
              fill="currentColor"
              aria-hidden
            >
              {/* head */}
              <circle cx="50" cy="12" r="7" />
              {/* torso */}
              <path d="M35 22 Q50 20 65 22 L68 55 Q50 60 32 55 Z" />
              {/* arms */}
              <path d="M35 23 L22 55 L26 57 L38 30 Z" />
              <path d="M65 23 L78 55 L74 57 L62 30 Z" />
              {/* legs */}
              <path d="M38 55 L36 95 L42 95 L46 58 Z" />
              <path d="M62 55 L64 95 L58 95 L54 58 Z" />
              {/* feet */}
              <ellipse cx="39" cy="98" rx="5" ry="2.5" />
              <ellipse cx="61" cy="98" rx="5" ry="2.5" />
            </svg>

            {/* Hotspots */}
            {areas.map((a) => {
              const on = a.id === active;
              return (
                <button
                  key={a.id}
                  onClick={() => setActive(a.id)}
                  onMouseEnter={() => setActive(a.id)}
                  aria-label={a.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${a.x}%`, top: `${a.y}%` }}
                >
                  <span
                    className={`block h-4 w-4 rounded-full transition-all duration-300 ${
                      on
                        ? "bg-teal-500 ring-4 ring-teal-200 scale-125"
                        : "bg-white ring-2 ring-teal-500 group-hover:scale-125"
                    }`}
                  />
                  {on && (
                    <motion.span
                      layoutId="area-ping"
                      className="absolute inset-0 rounded-full bg-teal-400/50 animate-ping"
                    />
                  )}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition ${
                      on ? "bg-teal-600 text-white shadow" : "bg-white text-teal-700 border border-teal-200"
                    }`}
                  >
                    {a.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Details panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-3xl bg-white border border-border/70 shadow-card p-6 md:p-8"
            >
              <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 text-teal-700 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
                <Sparkles className="h-3 w-3" /> {current.label} Care
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Programmes for your <span className="text-teal-700">{current.label.toLowerCase()}</span>
              </h3>
              <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">{current.blurb}</p>

              <div className="mt-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Common conditions</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {current.conditions.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-teal-50/60 hover:bg-teal-100 text-teal-800 px-3 py-1.5 text-xs font-semibold transition"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-700 text-white p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">Recommended</div>
                  <div className="mt-1 text-lg font-bold leading-tight truncate">{current.treatment.name}</div>
                </div>
                <Link
                  to={current.treatment.to}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white text-teal-700 px-4 py-2 text-xs font-bold hover:gap-2.5 transition-all"
                >
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-4 text-[11.5px] text-muted-foreground">
                Not sure?{" "}
                <Link to="/book" className="font-semibold text-teal-700 hover:underline">
                  Book a free 10-min consultation
                </Link>{" "}
                — we'll guide you.
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

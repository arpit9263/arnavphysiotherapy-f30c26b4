import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Bone, Activity, Brain, Zap, Dumbbell, HeartPulse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui-primitives/Section";

/**
 * Interactive body-area finder — pick a body region, get matched conditions & treatment.
 * Each region carries its own accent colour so the section reads as a colourful map,
 * not a monochrome silhouette.
 */
type Area = {
  id: string;
  label: string;
  x: number; // % coords on silhouette
  y: number;
  Icon: LucideIcon;
  accent: {
    ring: string;        // ring around active dot
    dot: string;         // active dot bg
    chipOn: string;      // active chip
    chipOff: string;     // inactive chip
    grad: string;        // gradient utility for CTA + icon bg
    soft: string;        // soft bg tint for details card border
    text: string;        // accent text
    pill: string;        // conditions pill background
  };
  conditions: { name: string; to: string }[];
  treatment: { name: string; to: string };
  blurb: string;
};

const areas: Area[] = [
  {
    id: "neck", label: "Neck", x: 50, y: 14, Icon: Bone,
    accent: {
      ring: "ring-sky-200", dot: "bg-sky-500", chipOn: "bg-sky-600 text-white",
      chipOff: "bg-white text-sky-700 border-sky-200", grad: "gradient-sky",
      soft: "border-sky-100", text: "text-sky-700", pill: "border-sky-200 bg-sky-50/60 hover:bg-sky-100 text-sky-800",
    },
    blurb: "Stiff neck, cervical pain and posture-related aches from long desk hours.",
    conditions: [
      { name: "Neck Pain", to: "/conditions/neck-pain" },
      { name: "Cervical Stiffness", to: "/conditions/neck-pain" },
    ],
    treatment: { name: "Manual Therapy", to: "/services/manual-therapy" },
  },
  {
    id: "shoulder", label: "Shoulder", x: 30, y: 22, Icon: Activity,
    accent: {
      ring: "ring-orange-200", dot: "bg-orange-500", chipOn: "bg-orange-600 text-white",
      chipOff: "bg-white text-orange-700 border-orange-200", grad: "gradient-coral",
      soft: "border-orange-100", text: "text-orange-700", pill: "border-orange-200 bg-orange-50/60 hover:bg-orange-100 text-orange-800",
    },
    blurb: "Frozen shoulder, rotator cuff strain and overhead-movement pain.",
    conditions: [
      { name: "Frozen Shoulder", to: "/conditions/frozen-shoulder" },
      { name: "Shoulder Pain", to: "/conditions/shoulder-pain" },
    ],
    treatment: { name: "Dry Needling", to: "/services/dry-needling" },
  },
  {
    id: "back", label: "Back", x: 50, y: 36, Icon: Zap,
    accent: {
      ring: "ring-teal-200", dot: "bg-teal-500", chipOn: "bg-teal-600 text-white",
      chipOff: "bg-white text-teal-700 border-teal-200", grad: "gradient-teal",
      soft: "border-teal-100", text: "text-teal-700", pill: "border-teal-200 bg-teal-50/60 hover:bg-teal-100 text-teal-800",
    },
    blurb: "Lower-back pain, slip disc and sciatica from lifting or long sitting.",
    conditions: [
      { name: "Back Pain", to: "/conditions/back-pain" },
      { name: "Slip Disc", to: "/conditions/slip-disc" },
      { name: "Sciatica", to: "/conditions/sciatica" },
    ],
    treatment: { name: "Exercise Therapy", to: "/services/exercise-therapy" },
  },
  {
    id: "knee", label: "Knee", x: 44, y: 68, Icon: HeartPulse,
    accent: {
      ring: "ring-rose-200", dot: "bg-rose-500", chipOn: "bg-rose-600 text-white",
      chipOff: "bg-white text-rose-700 border-rose-200", grad: "gradient-rose",
      soft: "border-rose-100", text: "text-rose-700", pill: "border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-800",
    },
    blurb: "Runner's knee, arthritis flare-ups and post-surgical knee recovery.",
    conditions: [
      { name: "Knee Pain", to: "/conditions/knee-pain" },
      { name: "Arthritis", to: "/conditions/arthritis" },
      { name: "Post-Surgery Rehab", to: "/conditions/post-surgery-rehab" },
    ],
    treatment: { name: "Sports Rehabilitation", to: "/services/sports-rehabilitation" },
  },
  {
    id: "neuro", label: "Neuro", x: 68, y: 14, Icon: Brain,
    accent: {
      ring: "ring-violet-200", dot: "bg-violet-500", chipOn: "bg-violet-600 text-white",
      chipOff: "bg-white text-violet-700 border-violet-200", grad: "gradient-violet",
      soft: "border-violet-100", text: "text-violet-700", pill: "border-violet-200 bg-violet-50/60 hover:bg-violet-100 text-violet-800",
    },
    blurb: "Post-stroke recovery, Parkinson's mobility and balance training.",
    conditions: [
      { name: "Stroke Rehab", to: "/conditions/stroke-rehab" },
      { name: "Neurological Rehab", to: "/conditions/neurological-rehab" },
    ],
    treatment: { name: "Neurological Physiotherapy", to: "/services/neurological-physiotherapy" },
  },
  {
    id: "sports", label: "Sports Injury", x: 30, y: 68, Icon: Dumbbell,
    accent: {
      ring: "ring-amber-200", dot: "bg-amber-500", chipOn: "bg-amber-600 text-white",
      chipOff: "bg-white text-amber-700 border-amber-200", grad: "gradient-amber",
      soft: "border-amber-100", text: "text-amber-700", pill: "border-amber-200 bg-amber-50/60 hover:bg-amber-100 text-amber-800",
    },
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
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-white">
      <div className="container-page">
        <SectionHeader
          eyebrow="Where Does It Hurt?"
          title="Find the Right Care in One Tap"
          subtitle="Tap the area of your body that's bothering you — we'll show you the conditions we treat there and the recommended physiotherapy programme."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1.1fr] gap-8 lg:gap-12 items-center">
          {/* Interactive silhouette */}
          <div className="relative mx-auto w-full max-w-md aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-white via-slate-50 to-teal-50/50 border border-border/60 shadow-card overflow-hidden">
            {/* backdrop dot grid */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: "radial-gradient(rgba(15,118,110,0.10) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            {/* Soft colour blobs */}
            <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-sky-200/50 blur-3xl" />
            <div className="absolute right-4 top-24 h-32 w-32 rounded-full bg-violet-200/50 blur-3xl" />
            <div className="absolute left-1/2 bottom-6 -translate-x-1/2 h-40 w-40 rounded-full bg-teal-200/50 blur-3xl" />

            {/* Improved anatomical silhouette */}
            <svg
              viewBox="0 0 100 130"
              className="absolute inset-0 h-full w-full text-slate-700/15"
              aria-hidden
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <g fill="url(#bodyGrad)">
                {/* head */}
                <ellipse cx="50" cy="12" rx="7.2" ry="8" />
                {/* neck */}
                <rect x="47" y="19" width="6" height="4" rx="1.5" />
                {/* torso */}
                <path d="M34 24 Q50 21 66 24 L69 46 Q68 58 63 62 Q50 65 37 62 Q32 58 31 46 Z" />
                {/* shoulders */}
                <ellipse cx="33" cy="26" rx="5" ry="4" />
                <ellipse cx="67" cy="26" rx="5" ry="4" />
                {/* arms */}
                <path d="M28 28 Q22 46 20 62 L24 62 Q28 46 32 30 Z" />
                <path d="M72 28 Q78 46 80 62 L76 62 Q72 46 68 30 Z" />
                {/* forearms */}
                <path d="M20 62 Q19 76 20 88 L24 88 Q25 76 24 62 Z" />
                <path d="M80 62 Q81 76 80 88 L76 88 Q75 76 76 62 Z" />
                {/* hips */}
                <path d="M34 60 Q50 66 66 60 L67 70 Q50 74 33 70 Z" />
                {/* thighs */}
                <path d="M36 70 Q38 88 40 100 L46 100 Q48 84 48 70 Z" />
                <path d="M64 70 Q62 88 60 100 L54 100 Q52 84 52 70 Z" />
                {/* shins */}
                <path d="M40 100 Q41 114 42 122 L46 122 Q47 112 46 100 Z" />
                <path d="M60 100 Q59 114 58 122 L54 122 Q53 112 54 100 Z" />
              </g>
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
                        ? `${a.accent.dot} ring-4 ${a.accent.ring} scale-125`
                        : `bg-white ring-2 ${a.accent.ring} group-hover:scale-125`
                    }`}
                  />
                  {on && (
                    <motion.span
                      layoutId="area-ping"
                      className={`absolute inset-0 rounded-full ${a.accent.dot} opacity-40 animate-ping`}
                    />
                  )}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 mt-2 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border transition ${
                      on ? `${a.accent.chipOn} border-transparent shadow` : a.accent.chipOff
                    }`}
                  >
                    <a.Icon className="h-2.5 w-2.5" />
                    {a.label}
                  </span>
                </button>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap justify-center gap-1.5 text-[9px] font-semibold text-muted-foreground">
              {areas.map((a) => (
                <button
                  key={`legend-${a.id}`}
                  onClick={() => setActive(a.id)}
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 transition ${
                    a.id === active ? `${a.accent.chipOn} border-transparent` : "bg-white/80 border-border/70 hover:bg-white"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${a.accent.dot}`} />
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Details panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className={`relative rounded-[2rem] bg-white border-2 ${current.accent.soft} shadow-card p-6 md:p-8`}
            >
              <div className={`inline-flex items-center gap-1.5 rounded-full ${current.accent.chipOn} px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] shadow-sm`}>
                <current.Icon className="h-3 w-3" /> {current.label} Care
              </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Programmes for your{" "}
                <span className={current.accent.text}>{current.label.toLowerCase()}</span>
              </h3>
              <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed">{current.blurb}</p>

              <div className="mt-6">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Common conditions</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {current.conditions.map((c) => (
                    <Link
                      key={c.to}
                      to={c.to}
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${current.accent.pill}`}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className={`mt-6 rounded-2xl ${current.accent.grad} text-white p-5 flex items-center justify-between gap-4 shadow-lg`}>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/80">Recommended</div>
                  <div className="mt-1 text-lg font-bold leading-tight truncate">{current.treatment.name}</div>
                </div>
                <Link
                  to={current.treatment.to}
                  className={`shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white ${current.accent.text} px-4 py-2 text-xs font-bold hover:gap-2.5 transition-all`}
                >
                  Explore <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-4 text-[11.5px] text-muted-foreground">
                Not sure?{" "}
                <Link to="/book" className={`font-semibold ${current.accent.text} hover:underline`}>
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

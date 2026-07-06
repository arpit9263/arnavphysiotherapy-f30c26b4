import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, ArrowRight, ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Award } from "lucide-react";
import { services } from "@/lib/data";

const rotating = [
  "Pain-Free Living",
  "Athletic Recovery",
  "Everyday Movement",
  "A Stronger You",
];

const slides = [
  {
    eyebrow: "Move Better • Live Pain-Free",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80",
  },
  {
    eyebrow: "Evidence-Based • Personalised Care",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=2000&q=80",
  },
  {
    eyebrow: "Recover Faster • Return Stronger",
    image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=2000&q=80",
  },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [service, setService] = useState("all");

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((v) => (v + 1) % rotating.length), 2600);
    return () => clearInterval(t);
  }, []);

  const s = slides[i];

  return (
    <section className="relative overflow-hidden">
      {/* Background image — front and centre, only a soft scrim on top */}
      <div className="absolute inset-0 bg-[oklch(0.18_0.04_220)]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img src={s.image} alt="" className="w-full h-full object-cover" />
          {/* Subtle darkening only where the copy sits */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>


      {/* floating decorations */}
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-glow/25 blur-3xl animate-float" />
      <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-brand-cyan/20 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      {/* arrows */}
      <button
        aria-label="Previous"
        onClick={() => setI((v) => (v - 1 + slides.length) % slides.length)}
        className="hidden md:grid absolute left-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 place-items-center rounded-full bg-white/80 backdrop-blur border border-border shadow-soft hover:bg-white transition"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        aria-label="Next"
        onClick={() => setI((v) => (v + 1) % slides.length)}
        className="hidden md:grid absolute right-6 top-1/2 -translate-y-1/2 z-10 h-11 w-11 place-items-center rounded-full bg-white/80 backdrop-blur border border-border shadow-soft hover:bg-white transition"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      <div className="relative container-page pt-16 md:pt-24 pb-16 md:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={s.eyebrow}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-primary/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary shadow-soft"
              >
                <Sparkles className="h-3 w-3" /> {s.eyebrow}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-[40px] sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] text-foreground"
          >
            Expert Physiotherapy
            <br className="hidden sm:block" /> for{" "}
            <span className="relative inline-block align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotating[wordIdx]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-gradient-teal inline-block"
                >
                  {rotating[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Personalised, evidence-based physiotherapy and rehabilitation in Jhansi — helping you recover
            faster, move freely and get back to what you love.
          </motion.p>

          {/* Search bar */}
          <motion.form
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 mx-auto max-w-2xl"
          >
            <div className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur border border-border p-1.5 shadow-glow">
              <div className="relative">
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="appearance-none bg-transparent pl-5 pr-9 py-3 text-sm font-medium text-foreground outline-none rounded-full cursor-pointer border-r border-border"
                >
                  <option value="all">All Services</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search treatments, conditions…"
                className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button aria-label="Search" className="grid h-11 w-11 shrink-0 place-items-center rounded-full gradient-teal text-white shadow-soft hover:scale-105 transition">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link to="/book" className="inline-flex items-center gap-2 rounded-full gradient-teal px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition">
              Book Appointment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-border px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition">
              Explore Services
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs md:text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Certified Physiotherapists</span>
            <span className="h-4 w-px bg-border hidden md:inline-block" />
            <span className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Led by MPT (Sports)</span>
            <span className="h-4 w-px bg-border hidden md:inline-block" />
            <span>10+ years serving Jhansi</span>
          </motion.div>

          {/* dots */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {slides.map((_, k) => (
              <button
                key={k}
                aria-label={`Slide ${k + 1}`}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-2 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

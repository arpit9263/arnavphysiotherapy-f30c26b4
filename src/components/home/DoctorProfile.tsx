import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Check, GraduationCap, HeartPulse, ShieldCheck, Star } from "lucide-react";
import { Eyebrow } from "@/components/ui-primitives/Section";
import { doctorProfile, site } from "@/lib/site";

export function DoctorProfile() {
  return (
    <section className="py-20 md:py-28 bg-surface" id="doctor">
      <div className="container-page grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 relative"
        >
          <div className="absolute -left-6 -top-6 h-32 w-32 rounded-3xl bg-primary/10 -z-10" />
          <div className="absolute -right-6 -bottom-6 h-40 w-40 rounded-full bg-brand-cyan/15 -z-10" />
          <img
            src={doctorProfile.image}
            alt={`${doctorProfile.name} — ${doctorProfile.title}`}
            loading="lazy"
            className="rounded-3xl shadow-glow w-full aspect-[4/5] object-cover"
          />
          <div className="absolute -right-4 bottom-8 md:right-6 md:bottom-14 rounded-2xl bg-white shadow-card border border-border px-5 py-4 flex items-center gap-3 max-w-[240px]">
            <div className="grid h-11 w-11 place-items-center rounded-xl gradient-teal text-white font-bold">10+</div>
            <div>
              <div className="text-sm font-bold">Years of practice</div>
              <div className="text-xs text-muted-foreground">{doctorProfile.role}</div>
            </div>
          </div>
        </motion.div>

        {/* Content column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7"
        >
          <Eyebrow>Meet Your Physiotherapist</Eyebrow>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">
            {doctorProfile.name}
          </h2>
          <p className="mt-2 text-primary font-semibold">{doctorProfile.title}</p>

          <blockquote className="mt-6 border-l-4 border-primary/50 pl-5 text-muted-foreground italic leading-relaxed">
            "{doctorProfile.philosophy}"
          </blockquote>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <InfoBlock icon={GraduationCap} title="Qualifications" items={doctorProfile.qualifications} />
            <InfoBlock icon={Star} title="Specializations" items={doctorProfile.specializations} />
            <InfoBlock icon={ShieldCheck} title="Certifications" items={doctorProfile.certifications} />
            <InfoBlock icon={Award} title="Recognitions" items={doctorProfile.awards} />
          </div>

          <div className="mt-8 rounded-2xl bg-white border border-border p-5">
            <div className="flex items-center gap-2 text-sm font-bold">
              <HeartPulse className="h-4 w-4 text-primary" /> Why patients choose {doctorProfile.name}
            </div>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2">
              {doctorProfile.reasons.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-foreground/80">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full gradient-teal px-7 py-3.5 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition"
            >
              Book with {doctorProfile.name.split(" ").slice(-1)[0]}
            </Link>
            <a
              href={`tel:${site.phoneRaw1}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition"
            >
              Call {site.phone1}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoBlock({ icon: Icon, title, items }: { icon: typeof Award; title: string; items: string[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-bold text-foreground">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        {title}
      </div>
      <ul className="mt-3 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="text-sm text-muted-foreground leading-relaxed pl-1">
            • {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

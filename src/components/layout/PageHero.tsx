import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Home, ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/ui-primitives/Section";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs = [],
  image = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: { label: string; to?: string }[];
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/70 to-white" />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-glow/25 blur-3xl animate-float" />
      <div className="relative container-page pt-16 pb-14 md:pt-24 md:pb-20 text-center">
        <nav className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-6">
          <Link to="/" className="flex items-center gap-1 hover:text-primary"><Home className="h-3 w-3" /> Home</Link>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3" />
              {b.to ? <Link to={b.to} className="hover:text-primary">{b.label}</Link> : <span className="text-foreground">{b.label}</span>}
            </span>
          ))}
        </nav>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-3 text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-3xl mx-auto leading-[1.1]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

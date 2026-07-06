import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Linkedin, Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { site, nav } from "@/lib/site";
import { services, conditions } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-24 bg-[oklch(0.22_0.03_220)] text-white/85">
      <div className="container-page py-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-5">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-10 w-10 place-items-center rounded-2xl gradient-teal">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
                <path d="M9 11l2 2 4-4" />
              </svg>
            </div>
            <div className="leading-none">
              <div className="text-lg font-bold text-white">Arnav</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-glow">Physiotherapy</div>
            </div>
          </Link>
          <p className="text-sm text-white/70 max-w-sm">
            Evidence-based physiotherapy and rehabilitation in Jhansi — led by {site.doctor}, {site.credentials}.
          </p>
          <div className="flex gap-2">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-primary transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Quick Links" items={nav.map((n) => ({ label: n.label, to: n.to }))} />
        <FooterCol
          title="Services"
          items={services.slice(0, 6).map((s) => ({ label: s.name, to: `/services/${s.slug}` }))}
        />
        <FooterCol
          title="We Treat"
          items={conditions.slice(0, 6).map((c) => ({ label: c.name, to: `/conditions/${c.slug}` }))}
        />

        <div className="lg:col-span-4 space-y-4">
          <h4 className="text-white font-semibold">Get in touch</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-primary-glow shrink-0" />{site.address}</li>
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-primary-glow shrink-0" />
              <div>
                <a href={`tel:${site.phoneRaw1}`} className="block hover:text-white">{site.phone1}</a>
                <a href={`tel:${site.phoneRaw2}`} className="block hover:text-white">{site.phone2}</a>
              </div>
            </li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 text-primary-glow shrink-0" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex gap-3"><Clock className="h-4 w-4 mt-0.5 text-primary-glow shrink-0" />{site.hours}</li>
          </ul>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 rounded-full bg-white/10 p-1.5 pl-4">
            <input type="email" required placeholder="Your email for wellness tips" className="bg-transparent flex-1 outline-none text-sm placeholder:text-white/50" />
            <button className="grid h-9 w-9 place-items-center rounded-full gradient-teal"><ArrowRight className="h-4 w-4" /></button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <h4 className="text-white font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.to}>
            <Link to={it.to} className="text-white/70 hover:text-white transition">{it.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

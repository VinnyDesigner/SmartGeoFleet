import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Satellite, ChevronDown, ArrowRight } from "lucide-react";
import { solutions, industries, features } from "@/lib/site-data";

type Mega = { label: string; items: { slug: string; title: string; short: string }[]; base: string };

const megas: Mega[] = [
  { label: "Solutions", base: "/solutions", items: solutions.slice(0, 8).map((s) => ({ slug: s.slug, title: s.title, short: s.short })) },
  { label: "Industries", base: "/industries", items: industries.map((s) => ({ slug: s.slug, title: s.title, short: s.short })) },
  { label: "Features", base: "/features", items: features.slice(0, 8).map((s) => ({ slug: s.slug, title: s.title, short: s.short })) },
];

const simple = [
  { label: "Resources", href: "/resources" as const },
  { label: "Company", href: "/about" as const },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseLeave={() => setActive(null)}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || active ? "bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between text-white">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#00FFA3] text-[#0F172A] shadow-[0_0_30px_rgba(0,212,255,0.4)]">
            <Satellite className="w-5 h-5" strokeWidth={2.5} />
          </span>
          <span>SmartGeoFleet</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm text-white/80">
          {megas.map((m) => (
            <div key={m.label} className="relative" onMouseEnter={() => setActive(m.label)}>
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg hover:text-white">
                {m.label} <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {simple.map((s) => (
            <Link key={s.href} to={s.href} onMouseEnter={() => setActive(null)} className="px-4 py-2 rounded-lg hover:text-white" activeProps={{ className: "text-white" }}>
              {s.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/contact" className="text-sm text-white/80 hover:text-white">Contact</Link>
          <Link to="/book-demo" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00FFA3] text-[#0F172A] px-5 py-2 text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(0,212,255,0.6)] hover:opacity-90">
            Book Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button className="lg:hidden text-white" onClick={() => setOpen((s) => !s)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block absolute inset-x-0 top-16 bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/10"
          >
            {megas.filter((m) => m.label === active).map((m) => (
              <div key={m.label} className="mx-auto max-w-7xl px-6 py-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#00D4FF]">{m.label}</p>
                    <h3 className="font-display text-2xl font-bold text-white mt-1">Explore {m.label.toLowerCase()}</h3>
                  </div>
                  <Link to={m.base} className="text-sm text-white/70 hover:text-white flex items-center gap-2">
                    View all <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {m.items.map((it) => {
                    const to = m.base === "/solutions" ? "/solutions/$slug" : m.base === "/industries" ? "/industries/$slug" : "/features/$slug";
                    return (
                      <Link
                        key={it.slug}
                        to={to}
                        params={{ slug: it.slug }}
                        onClick={() => setActive(null)}
                        className="group p-4 rounded-xl border border-white/10 hover:border-[#00D4FF]/50 hover:bg-white/5 transition"
                      >
                        <div className="text-white font-semibold text-sm">{it.title}</div>
                        <div className="text-white/55 text-xs mt-1 leading-relaxed">{it.short}</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#0F172A]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-1 text-white/85">
              {megas.map((m) => (
                <Link key={m.label} to={m.base} onClick={() => setOpen(false)} className="py-2">{m.label}</Link>
              ))}
              {simple.map((s) => (
                <Link key={s.href} to={s.href} onClick={() => setOpen(false)} className="py-2">{s.label}</Link>
              ))}
              <Link to="/contact" onClick={() => setOpen(false)} className="py-2">Contact</Link>
              <Link to="/book-demo" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00FFA3] text-[#0F172A] px-5 py-2 text-sm font-semibold text-center">
                Book Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

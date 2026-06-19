import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Satellite } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Features", href: "#features" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0F172A]/85 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between text-white">
        <a href="#home" className="flex items-center">
          <img src="/mylr-logo-white.png" alt="mylr.ai Logo" className="h-8 md:h-10 w-auto object-contain" />
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-sm text-white/75">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#contact" className="text-sm text-white/80 hover:text-white">Sign in</a>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5BA829] to-[#8CE036] text-[#0F172A] px-5 py-2 text-sm font-semibold shadow-[0_10px_30px_-10px_rgba(0,212,255,0.6)] hover:opacity-90 transition"
          >
            Book Demo
          </a>
        </div>

        <button className="lg:hidden text-white" onClick={() => setOpen((s) => !s)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#0F172A]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-3 text-white/80">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2">
                  {l.label}
                </a>
              ))}
              <a href="#cta" className="mt-2 rounded-full bg-gradient-to-r from-[#5BA829] to-[#8CE036] text-[#0F172A] px-5 py-2 text-sm font-semibold text-center">
                Book Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

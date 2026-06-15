import { ReactNode } from "react";
import { motion } from "framer-motion";

export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative bg-[#0F172A] text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#00D4FF]/20 blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#00FFA3]/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        {eyebrow && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-[#00FFA3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" /> {eyebrow}
          </motion.div>
        )}
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-5 font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-lg lg:text-xl text-white/70 max-w-2xl">
            {subtitle}
          </motion.p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}

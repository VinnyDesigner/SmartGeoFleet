import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Item } from "@/lib/site-data";

export function ItemGrid({ items, base, eyebrow }: { items: Item[]; base: "/solutions/$slug" | "/industries/$slug" | "/features/$slug"; eyebrow?: string }) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {eyebrow && <p className="text-xs uppercase tracking-widest text-[#0F172A]/50">{eyebrow}</p>}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div key={it.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link to={base} params={{ slug: it.slug }} className="group block h-full p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#0F172A]/30 hover:shadow-lg transition bg-white">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#00D4FF]/15 to-[#00FFA3]/15 text-[#0F172A]"><Icon className="w-5 h-5" /></span>
                  <h3 className="mt-5 font-display font-semibold text-xl">{it.title}</h3>
                  <p className="mt-2 text-sm text-[#0F172A]/65 leading-relaxed">{it.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#0F172A] group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

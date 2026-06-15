import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Item } from "@/lib/site-data";
import { PageHero } from "./PageHero";
import { CTASection } from "./CTASection";

export function ItemDetail({ item, kind, related }: { item: Item; kind: "Solution" | "Industry" | "Feature"; related: { slug: string; title: string; short: string; to: "/solutions/$slug" | "/industries/$slug" | "/features/$slug" }[] }) {
  const Icon = item.icon;
  return (
    <>
      <PageHero eyebrow={kind} title={item.title} subtitle={item.description}>
        <div className="flex flex-wrap gap-3">
          <Link to="/book-demo" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00FFA3] text-[#0F172A] px-5 py-2.5 text-sm font-semibold">
            Book a demo <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 text-white px-5 py-2.5 text-sm font-semibold hover:bg-white/5">
            Talk to sales
          </Link>
        </div>
      </PageHero>

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-8">
          {item.metrics.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl bg-white border border-[#E2E8F0] p-8 shadow-sm">
              <div className="text-5xl font-display font-bold text-[#0F172A]">{m.value}</div>
              <div className="mt-2 text-sm text-[#0F172A]/60">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#00D4FF]/15 to-[#00FFA3]/15 text-[#0F172A]"><Icon className="w-6 h-6" /></span>
              <span className="text-xs uppercase tracking-widest text-[#0F172A]/50">Benefits</span>
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl tracking-tight">Why teams choose this</h2>
            <ul className="mt-8 space-y-4">
              {item.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 grid place-items-center w-5 h-5 rounded-full bg-[#00FFA3]/20 text-[#0F172A]"><Check className="w-3 h-3" /></span>
                  <span className="text-[#0F172A]/80">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {item.features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-6 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0F172A]/20 hover:shadow-md transition">
                <h4 className="font-display font-semibold text-lg">{f.title}</h4>
                <p className="mt-2 text-sm text-[#0F172A]/65 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[#00D4FF]">Inside the platform</p>
            <h2 className="mt-3 font-display font-bold text-4xl lg:text-5xl">A live look at {item.title}</h2>
            <p className="mt-4 text-white/65">A unified command center streams telemetry, scores behavior and triggers workflows the second they're needed.</p>
          </div>
          <div className="mt-12 grid lg:grid-cols-3 gap-6">
            {["Real-time map", "Live events", "AI insights"].map((t, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between text-xs text-white/55">
                  <span>{t}</span><span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00FFA3] animate-pulse" />LIVE</span>
                </div>
                <div className="mt-4 h-40 rounded-xl bg-gradient-to-br from-[#00D4FF]/10 via-transparent to-[#00FFA3]/10 border border-white/5 grid place-items-center">
                  <Icon className="w-10 h-10 text-white/30" />
                </div>
                <div className="mt-4 space-y-2">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="flex items-center justify-between text-xs text-white/60">
                      <span>Metric {k + 1}</span>
                      <span className="text-[#00FFA3]">{(Math.random() * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs uppercase tracking-widest text-[#0F172A]/50">Explore more</p>
          <h2 className="mt-2 font-display font-bold text-3xl lg:text-4xl">Related {kind.toLowerCase()}s</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} to={r.to} params={{ slug: r.slug }} className="group p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#0F172A]/30 hover:shadow-md transition">
                <h4 className="font-display font-semibold text-lg flex items-center justify-between">
                  {r.title} <ChevronRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition" />
                </h4>
                <p className="mt-2 text-sm text-[#0F172A]/65">{r.short}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

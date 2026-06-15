import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";
import { cases } from "@/lib/site-data";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — SmartGeoFleet" },
      { name: "description", content: "Real fleets, real numbers. Read how leading operators transformed their fleets with SmartGeoFleet." },
      { property: "og:title", content: "SmartGeoFleet Case Studies" },
      { property: "og:description", content: "Customer outcomes across industries." },
      { property: "og:url", content: "/case-studies" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CasesIndex,
});

function CasesIndex() {
  const [industry, setIndustry] = useState("All");
  const [q, setQ] = useState("");
  const filters = useMemo(() => ["All", ...Array.from(new Set(cases.map((c) => c.industry)))], []);
  const list = cases.filter((c) => (industry === "All" || c.industry === industry) && (c.client + c.headline).toLowerCase().includes(q.toLowerCase()));
  return (
    <PageShell crumbs={[{ label: "Case Studies" }]}>
      <PageHero eyebrow="Case Studies" title="Real fleets. Measurable results." subtitle="See how leading operators across industries scale safer, faster and leaner with SmartGeoFleet.">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search case studies…" className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00D4FF]/60" />
        </div>
      </PageHero>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((c) => (
              <button key={c} onClick={() => setIndustry(c)} className={`px-4 py-1.5 rounded-full text-sm border transition ${industry === c ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white text-[#0F172A]/70 border-[#E2E8F0] hover:border-[#0F172A]/30"}`}>{c}</button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {list.map((c) => (
              <Link key={c.slug} to="/case-studies/$slug" params={{ slug: c.slug }} className="group block p-8 rounded-3xl border border-[#E2E8F0] bg-white hover:shadow-xl transition">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-[#0F172A]/40 tracking-widest">{c.logo}</span>
                  <span className="text-xs uppercase tracking-widest text-[#0F172A]/50">{c.industry}</span>
                </div>
                <h3 className="mt-6 font-display font-bold text-2xl group-hover:text-[#0F172A]">{c.headline}</h3>
                <p className="mt-3 text-[#0F172A]/65">{c.summary}</p>
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {c.results.map((r) => (
                    <div key={r.label} className="text-center">
                      <div className="font-display font-bold text-xl text-[#0F172A]">{r.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-[#0F172A]/50 mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">Read story <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}

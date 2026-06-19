import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, BookOpen, Calculator, Newspaper, Download, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

const items = [
  { type: "Guide", icon: BookOpen, title: "The Complete Guide to Fleet Telematics", desc: "Everything operations leaders need to evaluate, buy and roll out a modern telematics platform." },
  { type: "Whitepaper", icon: FileText, title: "AI in Fleet: 2026 Benchmark Report", desc: "Survey of 1,200 fleet operators on AI adoption, outcomes and barriers." },
  { type: "Calculator", icon: Calculator, title: "Fleet ROI Calculator", desc: "Estimate fuel, productivity and safety savings for your fleet in 60 seconds." },
  { type: "Industry Report", icon: Newspaper, title: "Logistics Outlook 2026", desc: "Macro trends shaping freight, last-mile and distribution operations." },
  { type: "Guide", icon: BookOpen, title: "EV Fleet Readiness Playbook", desc: "A phased framework for transitioning from ICE to electric without operational disruption." },
  { type: "Whitepaper", icon: FileText, title: "Driver Safety: The Real-Time Coaching Effect", desc: "Quantified outcomes from in-cab coaching across 200,000+ drivers." },
  { type: "Calculator", icon: Calculator, title: "Idle Cost Calculator", desc: "Convert your fleet's idle hours into annual dollars wasted." },
  { type: "Industry Report", icon: Newspaper, title: "Construction Fleets in 2026", desc: "Trends in equipment utilization, theft and operator safety." },
];

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — mylr.ai" },
      { name: "description", content: "Guides, whitepapers, calculators and industry reports for fleet operations leaders." },
      { property: "og:title", content: "mylr.ai Resource Hub" },
      { property: "og:description", content: "Guides, whitepapers and tools for fleet operators." },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <PageShell crumbs={[{ label: "Resources" }]}>
      <PageHero eyebrow="Resource Hub" title="Knowledge for fleet leaders." subtitle="Guides, whitepapers, calculators and industry reports to help you evaluate, deploy and scale modern fleet intelligence." />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <a key={i} href="#" className="group block p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#0F172A]/30 hover:shadow-lg transition bg-white">
                <div className="flex items-center justify-between">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#5BA829]/15 to-[#8CE036]/15"><Icon className="w-5 h-5 text-[#0F172A]" /></span>
                  <span className="text-xs uppercase tracking-widest text-[#0F172A]/50">{it.type}</span>
                </div>
                <h3 className="mt-5 font-display font-semibold text-lg">{it.title}</h3>
                <p className="mt-2 text-sm text-[#0F172A]/65">{it.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#0F172A] group-hover:gap-2 transition-all">Download <Download className="w-4 h-4" /></span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display font-bold text-3xl">Get the newsletter</h2>
          <p className="mt-3 text-[#0F172A]/65">Monthly research and operator playbooks, straight to your inbox.</p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Work email" className="flex-1 rounded-full border border-[#E2E8F0] bg-white px-5 py-3 text-sm focus:outline-none focus:border-[#0F172A]/40" />
            <button type="button" className="rounded-full bg-[#0F172A] text-white px-6 py-3 text-sm font-semibold inline-flex items-center justify-center gap-2">Subscribe <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </section>

      <div className="bg-white">
        <CTASection title="Need something specific?" subtitle="Our team can put together a custom briefing or analysis for your fleet." />
      </div>
      <div className="hidden"><Link to="/blog">blog</Link></div>
    </PageShell>
  );
}

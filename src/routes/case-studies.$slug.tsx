import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { cases, type CaseStudy } from "@/lib/site-data";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }): { item: CaseStudy } => {
    const item = cases.find((c) => c.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.item.client} — SmartGeoFleet Case Study` },
      { name: "description", content: loaderData.item.summary },
      { property: "og:title", content: loaderData.item.headline },
      { property: "og:description", content: loaderData.item.summary },
      { property: "og:url", content: `/case-studies/${loaderData.item.slug}` },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/case-studies/${loaderData.item.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <PageShell crumbs={[{ label: "Case Studies", to: "/case-studies" }, { label: "Not found" }]}>
      <div className="py-32 text-center"><h1 className="text-3xl font-display font-bold">Case study not found</h1></div>
    </PageShell>
  ),
  errorComponent: () => <PageShell><div className="py-32 text-center">Something went wrong.</div></PageShell>,
  component: CasePage,
});

function CasePage() {
  const { item } = Route.useLoaderData() as { item: CaseStudy };
  const related = cases.filter((c) => c.slug !== item.slug).slice(0, 3);
  return (
    <PageShell crumbs={[{ label: "Case Studies", to: "/case-studies" }, { label: item.client }]}>
      <header className="bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#5BA829]/20 blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <Link to="/case-studies" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"><ArrowLeft className="w-4 h-4" /> All case studies</Link>
          <div className="mt-6 grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="text-xs uppercase tracking-widest text-[#5BA829]">{item.industry}</div>
              <div className="mt-1 font-display font-bold text-[#8CE036] tracking-widest">{item.logo}</div>
              <h1 className="mt-4 font-display font-bold text-4xl lg:text-6xl leading-[1.05]">{item.headline}</h1>
              <p className="mt-5 text-white/70 text-lg max-w-2xl">{item.summary}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {item.results.map((r) => (
                <div key={r.label} className="p-5 rounded-2xl border border-white/10 bg-white/5">
                  <div className="font-display font-bold text-3xl">{r.value}</div>
                  <div className="text-xs text-white/55 mt-1">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 grid gap-12">
          {[
            { title: "Challenge", body: item.challenge },
            { title: "Solution", body: item.solution },
            { title: "Implementation", body: "Rolled out in a phased 90-day plan: discovery, pilot, scale and optimize. SmartGeoFleet's customer team paired with internal champions to drive adoption across all sites." },
            { title: "Results", body: "Outcomes were measured in the first 6 months and verified by an independent audit. The metrics shown above continue to hold or improve year over year." },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-xs uppercase tracking-widest text-[#0F172A]/50">0{i + 1}</div>
              <h2 className="mt-2 font-display font-bold text-3xl">{s.title}</h2>
              <p className="mt-4 text-[#0F172A]/75 text-lg leading-relaxed">{s.body}</p>
            </div>
          ))}

          <blockquote className="relative p-8 rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC]">
            <Quote className="absolute -top-3 left-6 w-8 h-8 text-[#0F172A]/20" />
            <p className="text-xl leading-relaxed text-[#0F172A]">"SmartGeoFleet became the operating system for our fleet. The ROI was clear inside 90 days — and it keeps compounding."</p>
            <footer className="mt-4 text-sm text-[#0F172A]/60">VP of Operations, {item.client}</footer>
          </blockquote>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display font-bold text-2xl">More customer stories</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((c) => (
              <Link key={c.slug} to="/case-studies/$slug" params={{ slug: c.slug }} className="group block p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:shadow-lg transition">
                <div className="text-xs uppercase tracking-widest text-[#0F172A]/50">{c.industry}</div>
                <h3 className="mt-2 font-display font-semibold text-lg">{c.headline}</h3>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">Read <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}

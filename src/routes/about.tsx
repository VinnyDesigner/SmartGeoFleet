import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { CTASection } from "@/components/site/CTASection";

const values = [
  { title: "Operator-first", desc: "We build for dispatchers, drivers and operations leaders — not for slideware." },
  { title: "Open by default", desc: "Open APIs, open data, open ecosystem. Your data is yours." },
  { title: "Safety as math", desc: "Every safety claim we make is grounded in measurable outcomes." },
  { title: "Earn the renewal", desc: "We don't lock customers in with contracts. We earn the renewal every year." },
];

const timeline = [
  { year: "2018", title: "SmartGeoFleet founded", desc: "Started in Amsterdam with a mission to modernize fleet intelligence." },
  { year: "2020", title: "10,000 vehicles", desc: "Crossed the first milestone across logistics and construction." },
  { year: "2022", title: "AI Routing GA", desc: "Released our second-generation AI route optimization engine." },
  { year: "2024", title: "Video Telematics", desc: "Launched edge-AI dashcams across 40+ countries." },
  { year: "2026", title: "500,000+ vehicles", desc: "Today, SmartGeoFleet powers operations across 120 countries." },
];

const team = [
  { name: "Anna Vermeulen", role: "Chief Executive Officer" },
  { name: "Daniel Okafor", role: "Chief Technology Officer" },
  { name: "Priya Natarajan", role: "Chief Product Officer" },
  { name: "Marcus Reed", role: "Chief Revenue Officer" },
  { name: "Sara Lindqvist", role: "Chief Customer Officer" },
  { name: "Jordan Park", role: "VP, Engineering" },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SmartGeoFleet" },
      { name: "description", content: "SmartGeoFleet is on a mission to give every fleet operator the intelligence layer they need to run safer, leaner and faster." },
      { property: "og:title", content: "About SmartGeoFleet" },
      { property: "og:description", content: "Our mission, story and team." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell crumbs={[{ label: "About" }]}>
      <PageHero eyebrow="About" title="The intelligence layer for the world's fleets." subtitle="We build SmartGeoFleet for the people who move the physical economy — the dispatchers, drivers and operators who keep things running." />

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#0F172A]/50">Mission</p>
            <h2 className="mt-3 font-display font-bold text-3xl lg:text-4xl">Make every fleet smarter, every trip safer.</h2>
            <p className="mt-4 text-[#0F172A]/65 leading-relaxed">We give fleet operators a single intelligence layer that connects telemetry, drivers, routes and assets — so every decision is informed and every dollar is accounted for.</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#0F172A]/50">Vision</p>
            <h2 className="mt-3 font-display font-bold text-3xl lg:text-4xl">A world where no mile is wasted.</h2>
            <p className="mt-4 text-[#0F172A]/65 leading-relaxed">A future where every fleet is electric-ready, AI-routed, and operating at the safety and efficiency frontier — accessible to every operator, not just the largest.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display font-bold text-3xl lg:text-4xl">Our values</h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-6 rounded-2xl bg-white border border-[#E2E8F0]">
                <h4 className="font-display font-semibold text-lg">{v.title}</h4>
                <p className="mt-2 text-sm text-[#0F172A]/65">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-display font-bold text-3xl lg:text-4xl">Our journey</h2>
          <div className="mt-12 relative border-l border-[#E2E8F0] ml-3">
            {timeline.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8 pb-12 last:pb-0">
                <span className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#5BA829] to-[#8CE036]" />
                <div className="text-sm text-[#0F172A]/50 font-mono">{t.year}</div>
                <h4 className="font-display font-semibold text-xl mt-1">{t.title}</h4>
                <p className="mt-2 text-[#0F172A]/65">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F172A] text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display font-bold text-3xl lg:text-4xl">Leadership</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5BA829] to-[#8CE036] grid place-items-center text-[#0F172A] font-display font-bold text-lg">{m.name.split(" ").map((p) => p[0]).join("")}</div>
                <div className="mt-4 font-display font-semibold text-lg">{m.name}</div>
                <div className="text-sm text-white/60">{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Want to join us?" subtitle="We're hiring across engineering, product, design and customer success." />
    </PageShell>
  );
}

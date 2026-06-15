import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MapPin, Route, ShieldCheck, Fuel, Package, Hexagon, Wrench, BarChart3,
  Truck, HardHat, Building2, Zap, GraduationCap, Headset,
  Brain, Activity, Bell, TrendingUp, History, Star, HeartPulse, Stethoscope,
  Check, ChevronDown, ArrowRight, Search, FileText, BookOpen, Newspaper,
  Cpu, Plug, Rocket, Quote
} from "lucide-react";

/* ---------- Shared ---------- */
function SectionTitle({ eyebrow, title, subtitle, dark = false, center = true }: {
  eyebrow?: string; title: string; subtitle?: string; dark?: boolean; center?: boolean;
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-3xl`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${dark ? "bg-white/5 text-[#00FFA3] border border-white/10" : "bg-[#0F172A]/5 text-[#0F172A] border border-[#0F172A]/10"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
          {eyebrow}
        </div>
      )}
      <h2 className={`mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] ${dark ? "text-white" : "text-[#0F172A]"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-lg ${dark ? "text-white/70" : "text-[#0F172A]/65"}`}>{subtitle}</p>
      )}
    </div>
  );
}

import type { Variants } from "framer-motion";
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.06, ease: "easeOut" } }),
};

/* ---------- Trust ---------- */
export function Trust() {
  const items = [
    "LOGISTIQ", "TRANSCORE", "BUILDWELL", "GOV·FLEET", "RAPID·DELIVERY",
    "SCHOOL·NET", "NORTHWIND", "URBANMOVE", "FIELDOPS", "AGRIPLEX"
  ];
  return (
    <section className="py-14 bg-white border-y border-[#E2E8F0]">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-[#0F172A]/50">
          Trusted by logistics &amp; transportation leaders
        </p>
        <div className="mt-8 overflow-hidden relative">
          <div className="flex gap-14 animate-marquee whitespace-nowrap">
            {[...items, ...items].map((n, i) => (
              <div key={i} className="text-2xl font-display font-bold tracking-tight text-[#0F172A]/40 hover:text-[#0F172A] transition-colors">
                {n}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Why (Features grid) ---------- */
const whyItems = [
  { i: MapPin, t: "Real-Time GPS Tracking", d: "Second-by-second visibility into every vehicle, anywhere." },
  { i: Route, t: "Route Optimization", d: "AI plans the fastest, lowest-cost routes automatically." },
  { i: ShieldCheck, t: "Driver Behavior", d: "Monitor harsh braking, speeding, and risky habits." },
  { i: Fuel, t: "Fuel Management", d: "Cut fuel costs with theft, idling and burn analytics." },
  { i: Package, t: "Asset Tracking", d: "Trailers, equipment and valuable assets on one map." },
  { i: Hexagon, t: "Geofencing", d: "Smart zones with instant entry, exit and dwell alerts." },
  { i: Wrench, t: "Maintenance", d: "Predictive service reminders before breakdowns happen." },
  { i: BarChart3, t: "Fleet Analytics", d: "KPIs, scorecards and executive dashboards out of the box." },
];
export function Why() {
  return (
    <section id="features" className="py-28 bg-[#F8FAFC] bg-grid-light relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Why SmartGeoFleet"
          title="Everything your fleet needs in one intelligent platform"
          subtitle="From real-time GPS to AI insights — every operational lever, unified."
        />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyItems.map((f, i) => (
            <motion.div
              key={f.t}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className="group relative rounded-2xl bg-white border border-[#E2E8F0] p-6 hover:border-[#00D4FF] hover:-translate-y-1 transition-all duration-300 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_50px_-20px_rgba(0,212,255,0.4)]"
            >
              <div className="w-11 h-11 rounded-xl grid place-items-center bg-[#0F172A] text-[#00FFA3] group-hover:bg-gradient-to-br group-hover:from-[#00D4FF] group-hover:to-[#00FFA3] group-hover:text-[#0F172A] transition-all">
                <f.i className="w-5 h-5" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg text-[#0F172A]">{f.t}</h3>
              <p className="mt-2 text-sm text-[#0F172A]/65 leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Interactive Platform Showcase ---------- */
const tabs = [
  { id: "fleet", label: "Fleet Tracking" },
  { id: "asset", label: "Asset Tracking" },
  { id: "driver", label: "Driver Monitoring" },
  { id: "maint", label: "Maintenance" },
  { id: "reports", label: "Reports" },
];

const tabContent: Record<string, { title: string; bullets: string[]; metrics: { label: string; value: string }[] }> = {
  fleet: {
    title: "Live fleet visibility across every region",
    bullets: ["Sub-second vehicle telemetry", "Multi-region map clusters", "Traffic & weather overlays"],
    metrics: [{ label: "Vehicles", value: "247" }, { label: "Trips today", value: "1,892" }, { label: "Avg ETA", value: "−14%" }],
  },
  asset: {
    title: "Track every trailer, container and tool",
    bullets: ["Battery-powered asset beacons", "Movement & tamper alerts", "Lifecycle utilization reports"],
    metrics: [{ label: "Assets", value: "12,400" }, { label: "Utilization", value: "87%" }, { label: "Recovered", value: "$2.1M" }],
  },
  driver: {
    title: "Coach safer drivers with real data",
    bullets: ["Harsh event detection (AI)", "In-cab video & coaching", "Personalized scorecards"],
    metrics: [{ label: "Safety score", value: "98" }, { label: "Incidents", value: "−42%" }, { label: "Drivers", value: "612" }],
  },
  maint: {
    title: "Predictive maintenance, zero surprises",
    bullets: ["Engine fault forecasting", "Service workflow automation", "Parts & cost tracking"],
    metrics: [{ label: "Uptime", value: "99.6%" }, { label: "Repairs avoided", value: "318" }, { label: "Savings", value: "$1.4M" }],
  },
  reports: {
    title: "Boardroom-ready analytics, instantly",
    bullets: ["Drag-and-drop dashboards", "Scheduled exports", "Open API & BI connectors"],
    metrics: [{ label: "Dashboards", value: "120+" }, { label: "Exports/mo", value: "8,300" }, { label: "Integrations", value: "60+" }],
  },
};

export function Showcase() {
  const [tab, setTab] = useState("fleet");
  const c = tabContent[tab];
  return (
    <section id="showcase" className="py-28 text-white relative overflow-hidden" style={{ background: "var(--grad-dark)" }}>
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionTitle
          dark
          eyebrow="Platform Showcase"
          title="One command center for your entire operation"
          subtitle="Switch between live workspaces. Every module shares the same data fabric."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-gradient-to-r from-[#00D4FF] to-[#00FFA3] text-[#0F172A] shadow-[0_10px_30px_-10px_rgba(0,212,255,0.6)]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-[#0B1220]/70 backdrop-blur-xl p-6 md:p-10 shadow-[0_50px_120px_-30px_rgba(0,212,255,0.3)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-5">
                <h3 className="text-2xl md:text-3xl font-display font-semibold">{c.title}</h3>
                <ul className="mt-6 space-y-3">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-white/80">
                      <span className="mt-1 w-5 h-5 rounded-full bg-[#00FFA3]/15 grid place-items-center text-[#00FFA3]">
                        <Check className="w-3 h-3" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-white/50">{m.label}</div>
                      <div className="mt-1 font-display text-xl font-semibold">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <DashboardMock tab={tab} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function DashboardMock({ tab }: { tab: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0a1426] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[10px] text-white/40 font-mono">/{tab}</span>
      </div>
      <div className="p-4 grid grid-cols-6 gap-3 min-h-[280px]">
        <div className="col-span-4 rounded-lg bg-[#0F172A] border border-white/5 relative overflow-hidden min-h-[260px]">
          <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, x) =>
              Array.from({ length: 12 }).map((_, y) => (
                <circle key={`${x}-${y}`} cx={x * 20 + 10} cy={y * 22 + 10} r="0.8" fill="#00D4FF" opacity="0.25" />
              ))
            )}
            <path d="M30,210 C 120,80 180,240 280,90 S 380,160 380,40" fill="none" stroke="#00D4FF" strokeWidth="2" className="animate-dash" />
            <circle r="5" fill="#00FFA3">
              <animateMotion dur="7s" repeatCount="indefinite" path="M30,210 C 120,80 180,240 280,90 S 380,160 380,40" />
            </circle>
            <rect x="240" y="120" width="120" height="80" rx="8" fill="#00FFA3" fillOpacity="0.08" stroke="#00FFA3" strokeDasharray="6 6" />
          </svg>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-lg bg-white/5 border border-white/5 p-2">
              <div className="h-2 w-12 rounded bg-white/10" />
              <div className="mt-2 h-1.5 rounded bg-white/10 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${40 + i * 12}%` }} transition={{ duration: 1.2, delay: i * 0.1 }} className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00FFA3]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Solutions ---------- */
const solutions = [
  { i: MapPin, t: "GPS Fleet Tracking", d: "Track vehicles live with second-by-second updates." },
  { i: Package, t: "Asset Tracking", d: "Monitor equipment, trailers, and valuable assets." },
  { i: Route, t: "Route Optimization", d: "Reduce travel time and fuel consumption." },
  { i: ShieldCheck, t: "Driver Safety", d: "Monitor harsh braking, speeding, and idle behavior." },
  { i: Wrench, t: "Maintenance Management", d: "Automated service reminders and tracking." },
  { i: Hexagon, t: "Geofencing", d: "Create smart zones and receive instant alerts." },
];
export function Solutions() {
  return (
    <section id="solutions" className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Solutions"
          title="Smart solutions for modern fleet operations"
          subtitle="Built to scale from 10 vehicles to 100,000."
        />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s, i) => (
            <motion.a
              href="#cta"
              key={s.t}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="group relative rounded-3xl p-8 bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#0F172A] hover:text-white transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-gradient-to-br from-[#00D4FF]/0 to-[#00FFA3]/0 group-hover:from-[#00D4FF]/30 group-hover:to-[#00FFA3]/20 blur-2xl transition-all duration-700" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl grid place-items-center bg-[#0F172A] text-[#00FFA3] group-hover:bg-gradient-to-br group-hover:from-[#00D4FF] group-hover:to-[#00FFA3] group-hover:text-[#0F172A] transition">
                  <s.i className="w-5 h-5" />
                </div>
                <h3 className="mt-6 font-display font-semibold text-xl">{s.t}</h3>
                <p className="mt-2 text-sm opacity-70">{s.d}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium opacity-80 group-hover:opacity-100">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Industries ---------- */
const industries = [
  { i: Truck, t: "Transportation & Logistics", d: "Optimize long-haul, regional and last-mile fleets at scale." },
  { i: HardHat, t: "Construction", d: "Track heavy equipment, prevent theft, schedule preventive maintenance." },
  { i: Building2, t: "Government Fleets", d: "Compliant, auditable visibility across municipal operations." },
  { i: Zap, t: "Public Utilities", d: "Coordinate field crews and respond to outages faster." },
  { i: GraduationCap, t: "School Transportation", d: "Real-time bus tracking and parent visibility." },
  { i: Headset, t: "Field Service Teams", d: "Dispatch the closest technician, every time." },
];
export function Industries() {
  return (
    <section id="industries" className="py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle eyebrow="Industries" title="Built for the operations you run" subtitle="Tailored deployments for every fleet vertical." />
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((s, i) => (
            <motion.div
              key={s.t}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} custom={i}
              className="group rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)] transition-all"
            >
              <div className="relative h-40 bg-[#0F172A] overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 to-[#00FFA3]/10" />
                <div className="absolute inset-0 grid place-items-center">
                  <s.i className="w-14 h-14 text-white/90 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-lg text-[#0F172A]">{s.t}</h3>
                <p className="mt-2 text-sm text-[#0F172A]/65">{s.d}</p>
                <a href="#cta" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0F172A] hover:text-[#00D4FF] transition">
                  Explore <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Advanced Features ---------- */
const advanced = [
  { i: Brain, t: "AI Fleet Insights", d: "Recommendations powered by your live operations." },
  { i: Stethoscope, t: "Predictive Maintenance", d: "Forecast failures before they ground a vehicle." },
  { i: Bell, t: "Smart Alerts", d: "Tunable, role-aware notifications across channels." },
  { i: Fuel, t: "Fuel Analytics", d: "Theft, burn rate, and MPG benchmarks." },
  { i: History, t: "Trip Replay", d: "Replay any journey, second by second." },
  { i: Star, t: "Driver Scorecards", d: "Coach drivers with objective, fair metrics." },
  { i: HeartPulse, t: "Fleet Health", d: "DTC codes and engine telemetry, live." },
  { i: Activity, t: "Live Diagnostics", d: "Engine, battery, and tire pressure in real time." },
];
export function Advanced() {
  return (
    <section className="py-28 text-white relative overflow-hidden" style={{ background: "var(--grad-dark)" }}>
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionTitle dark center={false} eyebrow="Advanced Features" title="A modern OS for fleet intelligence" subtitle="The deep capabilities operators ask for, built in." />
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {advanced.map((a, i) => (
              <motion.div
                key={a.t}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="flex gap-3 p-4 rounded-xl glass"
              >
                <div className="w-9 h-9 rounded-lg grid place-items-center bg-white/10 text-[#00FFA3] shrink-0">
                  <a.i className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm">{a.t}</div>
                  <div className="text-xs text-white/60 mt-0.5">{a.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <DashboardMock tab="advanced" />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { l: "MPG Δ", v: "+9.2%" },
              { l: "Idle time", v: "−31%" },
              { l: "Alerts/day", v: "1,240" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl glass p-3">
                <div className="text-[10px] uppercase tracking-wider text-white/50">{s.l}</div>
                <div className="font-display font-semibold mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Stats counters ---------- */
function Counter({ to, suffix = "", prefix = "", duration = 1.8 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}
export function Stats() {
  const stats = [
    { v: 500000, s: "+", l: "Vehicles tracked" },
    { v: 50, s: "M+", l: "Trips monitored" },
    { v: 99.99, s: "%", l: "Platform uptime", float: true },
    { v: 35, s: "%", l: "Average cost reduction" },
  ];
  return (
    <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00D4FF]/15 blur-[120px] rounded-full" />
      <div className="relative mx-auto max-w-7xl px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display font-bold text-4xl md:text-6xl text-gradient">
              {s.float ? <span>99.99{s.s}</span> : <Counter to={s.v} suffix={s.s} />}
            </div>
            <div className="mt-3 text-sm text-white/65">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */
const steps = [
  { i: Cpu, t: "Install SmartGeo Device", d: "Plug-and-play OBD-II or hardwired devices ship within 24 hours." },
  { i: Plug, t: "Connect Fleet Platform", d: "Devices auto-pair to your workspace with zero configuration." },
  { i: Rocket, t: "Start Tracking Instantly", d: "Live data, alerts and reports flow from minute one." },
];
export function HowItWorks() {
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle eyebrow="How it works" title="Live in under 30 minutes" />
        <div className="mt-16 relative grid md:grid-cols-3 gap-8">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px">
            <svg className="w-full h-3" viewBox="0 0 100 3" preserveAspectRatio="none">
              <line x1="0" y1="1.5" x2="100" y2="1.5" stroke="#0F172A" strokeOpacity="0.15" strokeDasharray="2 2" />
            </svg>
          </div>
          {steps.map((s, i) => (
            <motion.div
              key={s.t} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="relative text-center"
            >
              <div className="mx-auto w-24 h-24 rounded-3xl bg-[#0F172A] text-white grid place-items-center relative shadow-[0_20px_50px_-20px_rgba(15,23,42,0.6)]">
                <s.i className="w-9 h-9" strokeWidth={1.6} />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#00FFA3] text-[#0F172A] grid place-items-center text-xs font-bold">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 font-display font-semibold text-xl text-[#0F172A]">{s.t}</h3>
              <p className="mt-2 text-sm text-[#0F172A]/65 max-w-xs mx-auto">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const quotes = [
  { q: "SmartGeoFleet cut our fuel spend by 28% in six months while making our drivers measurably safer.", n: "Marcus Reeves", r: "VP Operations · Northwind Logistics", m: "−28% fuel · 612 vehicles" },
  { q: "It's the first platform our dispatch, maintenance and finance teams actually agree on.", n: "Priya Shah", r: "COO · UrbanMove", m: "+19% on-time · 1,400 trips/day" },
  { q: "Predictive maintenance has paid for the entire platform three times over.", n: "Diego Alvarez", r: "Director Fleet · BuildWell Construction", m: "318 repairs avoided" },
];
export function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);
  const q = quotes[idx];
  return (
    <section className="py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle eyebrow="Customer Stories" title="Loved by enterprise fleets" />
        <div className="mt-14 relative rounded-3xl bg-white border border-[#E2E8F0] p-10 md:p-14 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)]">
          <Quote className="absolute top-8 right-8 w-12 h-12 text-[#00D4FF]/30" />
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
              <p className="text-2xl md:text-3xl font-display font-medium text-[#0F172A] leading-snug">
                "{q.q}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F172A] to-[#111827] grid place-items-center text-white font-semibold">
                  {q.n.split(" ").map((x) => x[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-[#0F172A]">{q.n}</div>
                  <div className="text-sm text-[#0F172A]/60">{q.r}</div>
                </div>
                <div className="ml-auto hidden md:block text-sm font-medium text-[#0F172A] bg-gradient-to-r from-[#00D4FF]/15 to-[#00FFA3]/15 border border-[#00D4FF]/20 rounded-full px-4 py-1.5">
                  {q.m}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex gap-2">
            {quotes.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Quote ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-10 bg-[#0F172A]" : "w-4 bg-[#0F172A]/20"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- Resources ---------- */
const resources = [
  { i: BookOpen, k: "Blog", t: "10 ways AI is reshaping fleet operations in 2026", d: "Read article" },
  { i: FileText, k: "Case Study", t: "How Northwind cut fuel spend by 28% in 6 months", d: "View story" },
  { i: Newspaper, k: "Guide", t: "The complete guide to fleet electrification", d: "Download PDF" },
  { i: BarChart3, k: "Report", t: "State of Fleet Intelligence 2026", d: "Get report" },
];
export function Resources() {
  return (
    <section id="resources" className="py-28 bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionTitle center={false} eyebrow="Resource Center" title="Stay ahead of the curve" subtitle="Guides, case studies and reports for modern fleet leaders." />
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0F172A]/40" />
            <input
              placeholder="Search resources…"
              className="w-full rounded-full bg-white border border-[#E2E8F0] pl-11 pr-4 py-3 text-sm outline-none focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/20 transition"
            />
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {resources.map((r, i) => (
            <motion.a
              key={r.t} href="#" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
              className="group rounded-2xl bg-white border border-[#E2E8F0] p-6 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.2)] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#00D4FF] font-semibold">{r.k}</span>
                <r.i className="w-4 h-4 text-[#0F172A]/40" />
              </div>
              <div className="mt-4 font-display font-semibold text-[#0F172A] leading-snug">{r.t}</div>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#0F172A] group-hover:text-[#00D4FF] transition">
                {r.d} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  ["How quickly can we deploy SmartGeoFleet?", "Most fleets are fully live within 30 minutes of receiving devices. Enterprise rollouts typically complete in under 2 weeks."],
  ["Do you support OBD-II and hardwired installs?", "Yes — we ship plug-and-play OBD-II, hardwired, and asset beacons. All devices auto-provision."],
  ["Is SmartGeoFleet secure and compliant?", "We're SOC 2 Type II, ISO 27001 and GDPR ready. All data is encrypted at rest and in transit."],
  ["Can I integrate with my existing TMS or ERP?", "Yes, we offer 60+ pre-built integrations plus a documented REST and webhook API."],
  ["What kind of support do you offer?", "Email support on Starter, priority chat on Professional, and a dedicated CSM on Enterprise."],
  ["Does the platform support electric vehicles?", "Full EV telemetry including state of charge, range estimation, and charger compatibility."],
  ["Can we trial the platform before committing?", "Yes — Starter includes a 14-day free trial with up to 10 vehicles."],
  ["Is driver consent and privacy supported?", "We provide configurable privacy modes, off-hours masking, and full audit trails."],
  ["What hardware compatibility do you offer?", "Compatible with all major OBD-II vehicles from 1996+, and most heavy-duty J1939 trucks."],
  ["Do you support international deployments?", "Yes — global cellular coverage in 190+ countries with multi-language support."],
  ["How accurate is GPS tracking?", "Sub-3-meter accuracy with second-by-second updates. Indoor positioning via cell triangulation."],
  ["Can dispatchers send messages to drivers?", "Yes — two-way messaging, route updates, and turn-by-turn navigation via the SmartGeoFleet Driver app."],
  ["What reports come out of the box?", "120+ pre-built dashboards plus a drag-and-drop report builder and scheduled exports."],
  ["Do you offer single sign-on?", "SAML SSO and SCIM provisioning included on Enterprise plans."],
  ["How is pricing calculated?", "Per active vehicle per month, billed annually or monthly. No setup fees."],
  ["Can we cancel anytime?", "Monthly plans cancel anytime. Annual contracts renew on the anniversary date."],
  ["Do you have a mobile app?", "Native iOS and Android apps for managers, dispatchers and drivers."],
  ["What's your platform uptime?", "99.99% historical uptime, backed by a contractual SLA on Enterprise."],
  ["How does predictive maintenance work?", "AI models trained on millions of trips forecast component failures before they ground a vehicle."],
  ["Can we self-host SmartGeoFleet?", "Cloud-native by default, with an on-prem connector available for regulated industries."],
];
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        <SectionTitle eyebrow="FAQ" title="Frequently asked questions" />
        <div className="mt-14 divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="font-display font-medium text-[#0F172A] text-lg">{q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-[#0F172A]/60 transition-transform ${isOpen ? "rotate-180 text-[#00D4FF]" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#0F172A]/70 leading-relaxed">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
export function FinalCTA() {
  return (
    <section id="cta" className="py-28 relative overflow-hidden" style={{ background: "var(--grad-dark)" }}>
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#00D4FF]/20 blur-[120px]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-display font-bold text-4xl md:text-6xl leading-[1.05]"
        >
          Transform your fleet operations <span className="text-gradient">today</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="mt-6 text-lg text-white/70 max-w-2xl mx-auto"
        >
          Join businesses using SmartGeoFleet to improve efficiency, safety, and profitability.
        </motion.p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00FFA3] text-[#0F172A] px-7 py-3.5 font-semibold shadow-[0_20px_50px_-15px_rgba(0,212,255,0.6)] hover:opacity-90 transition">
            Book a Demo <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium text-white hover:bg-white/10 transition">
            Talk to an Expert
          </a>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-white/50">
          <span>No credit card required</span>
          <span>14-day free trial</span>
          <span>Onboarding in 30 minutes</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer id="contact" className="bg-[#0B1220] text-white pt-20 pb-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#00FFA3] text-[#0F172A]">
                <TrendingUp className="w-5 h-5" />
              </span>
              SmartGeoFleet
            </div>
            <p className="mt-4 text-sm text-white/60 max-w-sm">
              AI-powered GPS fleet management and vehicle intelligence — for the operations that move the world.
            </p>
            <form className="mt-6 flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email" required placeholder="Work email"
                className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#00D4FF]"
              />
              <button className="rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00FFA3] text-[#0F172A] px-5 py-2.5 text-sm font-semibold">
                Subscribe
              </button>
            </form>
          </div>

          {[
            { h: "Company", l: ["About", "Customers", "Careers", "Press", "Contact"] },
            { h: "Solutions", l: ["Fleet Tracking", "Asset Tracking", "Driver Safety", "Maintenance", "Geofencing"] },
            { h: "Industries", l: ["Logistics", "Construction", "Government", "Utilities", "Schools"] },
          ].map((c) => (
            <div key={c.h}>
              <div className="font-semibold text-white/90">{c.h}</div>
              <ul className="mt-4 space-y-2.5 text-sm text-white/55">
                {c.l.map((x) => <li key={x}><a href="#" className="hover:text-white transition">{x}</a></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} SmartGeoFleet, Inc. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Security</a>
            <a href="#" className="hover:text-white">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

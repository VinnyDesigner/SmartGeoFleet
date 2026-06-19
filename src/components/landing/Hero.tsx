import { motion } from "framer-motion";
import { Play, ArrowRight, Truck, Gauge, MapPin, Fuel, ShieldCheck, Activity } from "lucide-react";

function WorldMap() {
  // Simplified stylized world map dot grid
  const dots: { x: number; y: number }[] = [];
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 60; x++) {
      // crude landmass mask using sin waves
      const ny = y / 30, nx = x / 60;
      const land =
        Math.sin(nx * 9 + 0.5) * 0.3 + Math.cos(ny * 6) * 0.25 + (ny > 0.15 && ny < 0.85 ? 0.4 : 0);
      if (land > 0.35 && Math.random() > 0.25) dots.push({ x, y });
    }
  }
  return (
    <svg viewBox="0 0 600 300" className="absolute inset-0 w-full h-full opacity-[0.25]">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x * 10 + 5} cy={d.y * 10 + 5} r="1.2" fill="#5BA829" />
      ))}
    </svg>
  );
}

function GpsPing({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="3" fill="#8CE036" />
      <circle r="3" fill="none" stroke="#8CE036" strokeWidth="1.5" opacity="0.6">
        <animate attributeName="r" from="3" to="22" dur="2.2s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.7" to="0" dur="2.2s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    </g>
  );
}

function CommandCenter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full"
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0B1220]/80 backdrop-blur-xl shadow-[0_50px_120px_-30px_rgba(0,212,255,0.35)]">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-4 text-xs text-white/50 font-mono">mylr.ai.com/command</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8CE036]">
            <span className="w-2 h-2 rounded-full bg-[#8CE036] animate-pulse-dot" />
            Live · 247 vehicles
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 p-3">
          {/* Sidebar KPIs */}
          <div className="col-span-3 flex flex-col gap-3">
            {[
              { label: "Active", value: "247", icon: Truck, hue: "#5BA829" },
              { label: "On route", value: "189", icon: MapPin, hue: "#8CE036" },
              { label: "Avg speed", value: "62", icon: Gauge, hue: "#5BA829" },
              { label: "Safety", value: "98%", icon: ShieldCheck, hue: "#8CE036" },
            ].map((k) => (
              <div key={k.label} className="rounded-xl p-3 bg-white/[0.04] border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-white/50">{k.label}</span>
                  <k.icon className="w-3.5 h-3.5" style={{ color: k.hue }} />
                </div>
                <div className="mt-1 text-xl font-semibold text-white font-display">{k.value}</div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="col-span-6 relative rounded-xl overflow-hidden bg-[#0a1426] border border-white/5 min-h-[340px]">
            <WorldMap />
            {/* Route lines */}
            <svg viewBox="0 0 600 340" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="route" x1="0" x2="1">
                  <stop offset="0%" stopColor="#5BA829" />
                  <stop offset="100%" stopColor="#8CE036" />
                </linearGradient>
              </defs>
              <path d="M60,260 C 180,80 260,300 420,120 S 560,200 560,80" fill="none" stroke="url(#route)" strokeWidth="2" className="animate-dash" />
              <path d="M40,80 C 160,200 280,40 360,200 S 540,260 580,200" fill="none" stroke="#8CE036" strokeWidth="1.5" opacity="0.5" className="animate-dash" />

              {/* Moving truck */}
              <g>
                <circle r="6" fill="#8CE036" stroke="#0B1220" strokeWidth="2">
                  <animateMotion dur="9s" repeatCount="indefinite" path="M60,260 C 180,80 260,300 420,120 S 560,200 560,80" />
                </circle>
              </g>
              <g>
                <circle r="5" fill="#5BA829" stroke="#0B1220" strokeWidth="2">
                  <animateMotion dur="11s" repeatCount="indefinite" path="M40,80 C 160,200 280,40 360,200 S 540,260 580,200" />
                </circle>
              </g>

              <GpsPing x={120} y={140} />
              <GpsPing x={310} y={220} delay={0.7} />
              <GpsPing x={470} y={100} delay={1.3} />

              {/* Geofence */}
              <rect x="380" y="170" width="120" height="80" rx="10" fill="#5BA829" fillOpacity="0.08" stroke="#5BA829" strokeWidth="1" strokeDasharray="6 6" />
            </svg>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-white/60">
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">San Francisco · Hub</span>
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10">Geofence active</span>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-3 flex flex-col gap-3">
            <div className="rounded-xl p-3 bg-white/[0.04] border border-white/5">
              <div className="flex items-center justify-between text-[10px] text-white/50 uppercase tracking-wider">
                <span>Fuel</span>
                <Fuel className="w-3.5 h-3.5 text-[#5BA829]" />
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "72%" }} transition={{ duration: 1.5, delay: 1 }} className="h-full bg-gradient-to-r from-[#5BA829] to-[#8CE036]" />
              </div>
              <div className="mt-1 text-xs text-white/70">72% avg tank</div>
            </div>

            {[
              { name: "Driver · Alex M.", status: "On route", color: "#8CE036" },
              { name: "Driver · Sara L.", status: "Idle 4m", color: "#5BA829" },
              { name: "Driver · Tom K.", status: "Loading", color: "#fbbf24" },
            ].map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="rounded-xl p-3 bg-white/[0.04] border border-white/5"
              >
                <div className="text-xs text-white font-medium">{d.name}</div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px]" style={{ color: d.color }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                  {d.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute -left-6 top-1/3 hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl glass text-white animate-float shadow-xl"
      >
        <Activity className="w-5 h-5 text-[#8CE036]" />
        <div>
          <div className="text-[10px] text-white/60">AI Insight</div>
          <div className="text-xs font-medium">Reroute saves 18 min</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        style={{ animationDelay: "1.5s" }}
        className="absolute -right-4 bottom-10 hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl glass text-white animate-float shadow-xl"
      >
        <ShieldCheck className="w-5 h-5 text-[#5BA829]" />
        <div>
          <div className="text-[10px] text-white/60">Safety score</div>
          <div className="text-xs font-medium">+12% this week</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden text-white bg-grid" style={{ background: "var(--grad-dark)" }}>
      {/* glow orbs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#5BA829]/20 blur-[120px]" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-[#8CE036]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-white/80"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#8CE036] animate-pulse-dot" />
              New · AI Predictive Maintenance v2
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.02]"
            >
              Smart Fleet Intelligence,
              <br />
              <span className="text-gradient">Powered by AI</span> &amp; Real‑Time GPS.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 text-lg text-white/70 max-w-xl"
            >
              Monitor vehicles, optimize routes, reduce fuel costs, improve driver safety, and gain
              complete operational visibility from a single intelligent platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5BA829] to-[#8CE036] text-[#0F172A] px-6 py-3 font-semibold shadow-[0_20px_50px_-15px_rgba(0,212,255,0.6)] hover:shadow-[0_25px_60px_-15px_rgba(0,255,163,0.6)] transition"
              >
                Request Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#showcase"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 font-medium text-white hover:bg-white/10 transition"
              >
                <Play className="w-4 h-4" />
                Watch Platform Tour
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-white/50"
            >
              <span>SOC 2 Type II</span>
              <span>ISO 27001</span>
              <span>GDPR Ready</span>
              <span>99.99% Uptime SLA</span>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <CommandCenter />
          </div>
        </div>
      </div>
    </section>
  );
}

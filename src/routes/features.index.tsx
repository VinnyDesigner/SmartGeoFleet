import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { ItemGrid } from "@/components/site/ItemGrid";
import { CTASection } from "@/components/site/CTASection";
import { features } from "@/lib/site-data";

export const Route = createFileRoute("/features/")({
  head: () => ({
    meta: [
      { title: "Features — SmartGeoFleet" },
      { name: "description", content: "Every capability of the SmartGeoFleet platform: live tracking, alerts, geofencing, dashboards, mobile, scorecards, reports and more." },
      { property: "og:title", content: "SmartGeoFleet Features" },
      { property: "og:description", content: "A complete feature directory for the SmartGeoFleet platform." },
      { property: "og:url", content: "/features" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: FeaturesIndex,
});

function FeaturesIndex() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => features.filter((f) => (f.title + f.short).toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <PageShell crumbs={[{ label: "Features" }]}>
      <PageHero eyebrow="Features" title="A complete feature directory." subtitle="Browse every capability of the SmartGeoFleet platform.">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search features…" className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00D4FF]/60" />
        </div>
      </PageHero>
      <ItemGrid items={filtered} base="/features/$slug" eyebrow={`${filtered.length} of ${features.length} features`} />
      <CTASection />
    </PageShell>
  );
}

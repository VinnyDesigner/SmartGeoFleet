import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { ItemGrid } from "@/components/site/ItemGrid";
import { CTASection } from "@/components/site/CTASection";
import { solutions } from "@/lib/site-data";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions — mylr.ai" },
      { name: "description", content: "Explore mylr.ai's complete suite of GPS tracking, telematics, routing and driver intelligence solutions." },
      { property: "og:title", content: "mylr.ai Solutions" },
      { property: "og:description", content: "GPS tracking, telematics, routing and driver intelligence — one platform." },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsIndex,
});

function SolutionsIndex() {
  return (
    <PageShell crumbs={[{ label: "Solutions" }]}>
      <PageHero eyebrow="Solutions" title="One platform. Every fleet workflow." subtitle="From real-time GPS to AI route planning, video telematics and predictive maintenance — mylr.ai unifies it all." />
      <ItemGrid items={solutions} base="/solutions/$slug" eyebrow={`${solutions.length} solutions`} />
      <CTASection />
    </PageShell>
  );
}

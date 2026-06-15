import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { ItemGrid } from "@/components/site/ItemGrid";
import { CTASection } from "@/components/site/CTASection";
import { industries } from "@/lib/site-data";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries — SmartGeoFleet" },
      { name: "description", content: "Purpose-built fleet intelligence for logistics, construction, transit, government, field services and more." },
      { property: "og:title", content: "SmartGeoFleet for Every Industry" },
      { property: "og:description", content: "Industry-specific telematics and fleet workflows out of the box." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <PageShell crumbs={[{ label: "Industries" }]}>
      <PageHero eyebrow="Industries" title="Built for the way your fleet really runs." subtitle="Configurations, workflows and integrations tuned to the realities of your industry — from day one." />
      <ItemGrid items={industries} base="/industries/$slug" eyebrow={`${industries.length} industries`} />
      <CTASection />
    </PageShell>
  );
}

import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ItemDetail } from "@/components/site/ItemDetail";
import { solutions, type Item } from "@/lib/site-data";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }): { item: Item } => {
    const item = solutions.find((s) => s.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.item.title} — SmartGeoFleet Solutions` },
      { name: "description", content: loaderData.item.description },
      { property: "og:title", content: `${loaderData.item.title} — SmartGeoFleet` },
      { property: "og:description", content: loaderData.item.description },
      { property: "og:url", content: `/solutions/${loaderData.item.slug}` },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/solutions/${loaderData.item.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <PageShell crumbs={[{ label: "Solutions", to: "/solutions" }, { label: "Not found" }]}>
      <div className="py-32 text-center"><h1 className="text-3xl font-display font-bold">Solution not found</h1></div>
    </PageShell>
  ),
  errorComponent: () => <PageShell><div className="py-32 text-center">Something went wrong.</div></PageShell>,
  component: SolutionPage,
});

function SolutionPage() {
  const { item } = Route.useLoaderData() as { item: Item };
  const related = solutions.filter((s) => s.slug !== item.slug).slice(0, 3).map((s) => ({ slug: s.slug, title: s.title, short: s.short, to: "/solutions/$slug" as const }));
  return (
    <PageShell crumbs={[{ label: "Solutions", to: "/solutions" }, { label: item.title }]}>
      <ItemDetail item={item} kind="Solution" related={related} />
    </PageShell>
  );
}

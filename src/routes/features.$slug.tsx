import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ItemDetail } from "@/components/site/ItemDetail";
import { features, type Item } from "@/lib/site-data";

export const Route = createFileRoute("/features/$slug")({
  loader: ({ params }): { item: Item } => {
    const item = features.find((s) => s.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.item.title} — mylr.ai Features` },
      { name: "description", content: loaderData.item.description },
      { property: "og:title", content: `${loaderData.item.title} — mylr.ai` },
      { property: "og:description", content: loaderData.item.description },
      { property: "og:url", content: `/features/${loaderData.item.slug}` },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/features/${loaderData.item.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <PageShell crumbs={[{ label: "Features", to: "/features" }, { label: "Not found" }]}>
      <div className="py-32 text-center"><h1 className="text-3xl font-display font-bold">Feature not found</h1></div>
    </PageShell>
  ),
  errorComponent: () => <PageShell><div className="py-32 text-center">Something went wrong.</div></PageShell>,
  component: FeaturePage,
});

function FeaturePage() {
  const { item } = Route.useLoaderData() as { item: Item };
  const related = features.filter((s) => s.slug !== item.slug).slice(0, 3).map((s) => ({ slug: s.slug, title: s.title, short: s.short, to: "/features/$slug" as const }));
  return (
    <PageShell crumbs={[{ label: "Features", to: "/features" }, { label: item.title }]}>
      <ItemDetail item={item} kind="Feature" related={related} />
    </PageShell>
  );
}

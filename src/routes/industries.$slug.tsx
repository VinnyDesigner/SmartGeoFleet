import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ItemDetail } from "@/components/site/ItemDetail";
import { industries, type Item } from "@/lib/site-data";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }): { item: Item } => {
    const item = industries.find((s) => s.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.item.title} — mylr.ai for Industry` },
      { name: "description", content: loaderData.item.description },
      { property: "og:title", content: `${loaderData.item.title} — mylr.ai` },
      { property: "og:description", content: loaderData.item.description },
      { property: "og:url", content: `/industries/${loaderData.item.slug}` },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/industries/${loaderData.item.slug}` }] : [],
  }),
  notFoundComponent: () => (
    <PageShell crumbs={[{ label: "Industries", to: "/industries" }, { label: "Not found" }]}>
      <div className="py-32 text-center"><h1 className="text-3xl font-display font-bold">Industry not found</h1></div>
    </PageShell>
  ),
  errorComponent: () => <PageShell><div className="py-32 text-center">Something went wrong.</div></PageShell>,
  component: IndustryPage,
});

function IndustryPage() {
  const { item } = Route.useLoaderData() as { item: Item };
  const related = industries.filter((s) => s.slug !== item.slug).slice(0, 3).map((s) => ({ slug: s.slug, title: s.title, short: s.short, to: "/industries/$slug" as const }));
  return (
    <PageShell crumbs={[{ label: "Industries", to: "/industries" }, { label: item.title }]}>
      <ItemDetail item={item} kind="Industry" related={related} />
    </PageShell>
  );
}

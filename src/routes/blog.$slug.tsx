import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { posts, type Post } from "@/lib/site-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: Post } => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.post.title} — SmartGeoFleet Blog` },
      { name: "description", content: loaderData.post.excerpt },
      { property: "og:title", content: loaderData.post.title },
      { property: "og:description", content: loaderData.post.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/blog/${loaderData.post.slug}` },
    ] : [],
    links: loaderData ? [{ rel: "canonical", href: `/blog/${loaderData.post.slug}` }] : [],
    scripts: loaderData ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: loaderData.post.title,
        author: { "@type": "Person", name: loaderData.post.author },
        datePublished: loaderData.post.date,
      }),
    }] : [],
  }),
  notFoundComponent: () => (
    <PageShell crumbs={[{ label: "Blog", to: "/blog" }, { label: "Not found" }]}>
      <div className="py-32 text-center"><h1 className="text-3xl font-display font-bold">Article not found</h1></div>
    </PageShell>
  ),
  errorComponent: () => <PageShell><div className="py-32 text-center">Something went wrong.</div></PageShell>,
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData() as { post: Post };
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <PageShell crumbs={[{ label: "Blog", to: "/blog" }, { label: post.title }]}>
      <div className="fixed top-16 left-0 right-0 h-0.5 bg-transparent z-40"><div className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00FFA3] transition-[width]" style={{ width: `${progress}%` }} /></div>

      <article className="bg-white">
        <header className="bg-[#0F172A] text-white">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"><ArrowLeft className="w-4 h-4" /> All articles</Link>
            <div className="mt-6 flex items-center gap-3 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-white/10">{post.category}</span>
              <span className="text-white/60 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
              <span className="text-white/60">{post.date}</span>
            </div>
            <h1 className="mt-5 font-display font-bold text-4xl lg:text-5xl leading-[1.1]">{post.title}</h1>
            <p className="mt-5 text-white/70 text-lg">{post.excerpt}</p>
            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#00FFA3] grid place-items-center text-[#0F172A] font-display font-bold">{post.author.split(" ").map((p) => p[0]).join("")}</div>
              <div className="text-sm"><div className="font-semibold">{post.author}</div><div className="text-white/55">Author</div></div>
              <button className="ml-auto inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"><Share2 className="w-4 h-4" /> Share</button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-6 py-16 prose-content">
          {post.body.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-[#0F172A]/80 mb-6">{p}</p>
          ))}
        </div>
      </article>

      <section className="bg-[#F8FAFC] py-20 border-t border-[#E2E8F0]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display font-bold text-2xl">Related articles</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="block p-6 rounded-2xl border border-[#E2E8F0] bg-white hover:shadow-md transition">
                <div className="text-xs text-[#0F172A]/50">{p.category} · {p.readTime}</div>
                <h3 className="mt-2 font-display font-semibold text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-[#0F172A]/65">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}

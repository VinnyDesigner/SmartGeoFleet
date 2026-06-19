import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";
import { posts } from "@/lib/site-data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — SmartGeoFleet" },
      { name: "description", content: "Research, playbooks and product updates for fleet operations leaders." },
      { property: "og:title", content: "SmartGeoFleet Blog" },
      { property: "og:description", content: "Research, playbooks and product updates." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const cats = useMemo(() => ["All", ...Array.from(new Set(posts.map((p) => p.category)))], []);
  const filtered = posts.filter((p) => (cat === "All" || p.category === cat) && (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()));
  const featured = posts[0];
  return (
    <PageShell crumbs={[{ label: "Blog" }]}>
      <PageHero eyebrow="Blog" title="Ideas for the people moving the world." subtitle="Research, playbooks and product thinking from the SmartGeoFleet team.">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="w-full bg-white/5 border border-white/10 rounded-full pl-11 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#5BA829]/60" />
        </div>
      </PageHero>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group block overflow-hidden rounded-3xl bg-[#0F172A] text-white">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-[#5BA829]/30 to-[#8CE036]/20 grid place-items-center">
                <span className="font-display font-bold text-5xl text-white/30">{featured.category}</span>
              </div>
              <div className="p-10 lg:p-14">
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <span className="px-2 py-0.5 rounded-full bg-white/10">{featured.category}</span>
                  <span>{featured.readTime} · {featured.date}</span>
                </div>
                <h2 className="mt-4 font-display font-bold text-3xl lg:text-4xl group-hover:text-[#8CE036] transition">{featured.title}</h2>
                <p className="mt-4 text-white/70">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Read article <ArrowRight className="w-4 h-4" /></span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 rounded-full text-sm border transition ${cat === c ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-white text-[#0F172A]/70 border-[#E2E8F0] hover:border-[#0F172A]/30"}`}>{c}</button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-2xl border border-[#E2E8F0] bg-white overflow-hidden hover:shadow-lg transition">
                <div className="aspect-[16/10] bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#0a1020] grid place-items-center">
                  <span className="font-display font-bold text-xl text-white/40">{p.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#0F172A]/50">
                    <span>{p.category}</span><span>·</span><span>{p.readTime}</span>
                  </div>
                  <h3 className="mt-2 font-display font-semibold text-lg group-hover:text-[#0F172A]">{p.title}</h3>
                  <p className="mt-2 text-sm text-[#0F172A]/65">{p.excerpt}</p>
                  <div className="mt-4 text-xs text-[#0F172A]/50">{p.author} · {p.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

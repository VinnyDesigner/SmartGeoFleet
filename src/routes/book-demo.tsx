import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { CheckCircle, Calendar } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(40),
  company: z.string().trim().min(1).max(120),
  country: z.string().trim().min(2).max(80),
  industry: z.string().trim().min(1).max(80),
  fleetSize: z.string().trim().min(1).max(40),
  requirements: z.string().trim().max(2000).optional(),
});

const fleetSizes = ["1–10", "10–50", "50–250", "250–1000", "1000–5000", "5000+"];
const industriesList = ["Logistics", "Construction", "Public Transport", "School Transport", "Government", "Field Services", "Waste Management", "Utilities", "Other"];

export const Route = createFileRoute("/book-demo")({
  head: () => ({
    meta: [
      { title: "Book a Demo — SmartGeoFleet" },
      { name: "description", content: "See SmartGeoFleet in action with a personalized demo tailored to your fleet size and industry." },
      { property: "og:title", content: "Book a SmartGeoFleet Demo" },
      { property: "og:description", content: "A 30-minute live demo, tailored to your operations." },
      { property: "og:url", content: "/book-demo" },
    ],
    links: [{ rel: "canonical", href: "/book-demo" }],
  }),
  component: BookDemoPage,
});

function BookDemoPage() {
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = schema.safeParse(data);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setDone(true);
  };
  return (
    <PageShell crumbs={[{ label: "Book a Demo" }]}>
      <PageHero eyebrow="Book a Demo" title="See SmartGeoFleet live, on your data." subtitle="A 30-minute personalized walkthrough with a fleet specialist. We'll tailor the demo to your industry, fleet size and use cases." />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-5 gap-10">
          <aside className="lg:col-span-2 space-y-6">
            {[
              { title: "Personalized walkthrough", desc: "Built around your real use cases — not a canned deck." },
              { title: "Live ROI estimate", desc: "Get a CFO-grade ROI estimate inside the call." },
              { title: "Implementation timeline", desc: "Walk away with a phased rollout plan." },
              { title: "Q&A with experts", desc: "Your specialist has rolled out fleets just like yours." },
            ].map((b, i) => (
              <div key={i} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-[#0F172A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-display font-semibold">{b.title}</div>
                  <div className="text-sm text-[#0F172A]/65">{b.desc}</div>
                </div>
              </div>
            ))}
            <div className="p-6 rounded-2xl bg-[#0F172A] text-white">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5BA829]"><Calendar className="w-3.5 h-3.5" /> Typical schedule</div>
              <p className="mt-3 text-sm text-white/75">Demos available Mon–Fri across global time zones. Most calls are booked within 24 hours of request.</p>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {done ? (
              <div className="rounded-3xl border border-[#E2E8F0] p-10 bg-[#F8FAFC] text-center">
                <CheckCircle className="w-12 h-12 mx-auto text-[#0F172A]" />
                <h3 className="mt-4 font-display font-bold text-2xl">Your demo is booked.</h3>
                <p className="mt-2 text-[#0F172A]/65">Check your inbox — a calendar invite is on the way.</p>
                <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline">Back to home</Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-3xl border border-[#E2E8F0] p-8 bg-white shadow-sm grid sm:grid-cols-2 gap-4">
                {[
                  { name: "name", label: "Full name", type: "text", span: 1 },
                  { name: "email", label: "Work email", type: "email", span: 1 },
                  { name: "phone", label: "Phone", type: "tel", span: 1 },
                  { name: "company", label: "Company", type: "text", span: 1 },
                  { name: "country", label: "Country", type: "text", span: 1 },
                ].map((f) => (
                  <div key={f.name} className={f.span === 2 ? "sm:col-span-2" : ""}>
                    <label className="text-xs font-semibold text-[#0F172A]/70">{f.label}</label>
                    <input name={f.name} type={f.type} className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm focus:outline-none focus:border-[#0F172A]/40" />
                    {errors[f.name] && <p className="mt-1 text-xs text-red-600">{errors[f.name]}</p>}
                  </div>
                ))}
                <div>
                  <label className="text-xs font-semibold text-[#0F172A]/70">Industry</label>
                  <select name="industry" className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm">
                    <option value="">Select…</option>
                    {industriesList.map((i) => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#0F172A]/70">Fleet size</label>
                  <select name="fleetSize" className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm">
                    <option value="">Select…</option>
                    {fleetSizes.map((i) => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#0F172A]/70">Requirements (optional)</label>
                  <textarea name="requirements" rows={4} className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm focus:outline-none focus:border-[#0F172A]/40" placeholder="Tell us what matters most to your operation." />
                </div>
                <button type="submit" className="sm:col-span-2 mt-2 rounded-full bg-gradient-to-r from-[#5BA829] to-[#8CE036] text-[#0F172A] py-3.5 font-semibold">Request my demo</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

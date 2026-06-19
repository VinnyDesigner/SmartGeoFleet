import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Mail, Phone, MapPin, MessageSquare, CheckCircle } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { PageHero } from "@/components/site/PageHero";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().min(1).max(120),
  message: z.string().trim().min(5).max(2000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SmartGeoFleet" },
      { name: "description", content: "Talk to SmartGeoFleet sales, support or partnerships. Global offices and 24/7 enterprise support." },
      { property: "og:title", content: "Contact SmartGeoFleet" },
      { property: "og:description", content: "Reach out to our team — sales, support, partnerships and press." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const mainOffice = {
  country: "USA (Main Headquarters)",
  name: "iSpatial Techno Solutions Inc.",
  address: "16225 Park Ten Place, Suite 500, Houston, Texas 77084, United States of America",
  phone: "+1 (858) 522 9799",
  email: "connectus@ispatialtec.com",
};

const otherOffices = [
  {
    country: "UAE",
    name: "iSpatial Techno Solutions LLC",
    line: "Abu Dhabi Office",
    addr: "1002, C54 Building, Al Mamoura, Al Nahyan, Abu Dhabi, UAE",
    poBox: "PO Box: 94497",
    phone: "+971 2635 5503",
    email: "connectus@ispatialtec.com",
  },
  {
    country: "Netherlands",
    name: "iSpatial Techno Solutions",
    line: "Utrecht Office",
    addr: "Akkrummerraklaan 170, 3544TV Utrecht, The Netherlands",
    phone: "+31 640 211 785",
    email: "connectus@ispatialtec.com",
  },
  {
    country: "India",
    name: "iSpatial Techno Solutions Pvt. Ltd.",
    line: "Madhapur Office",
    addr: "3rd Floor 3B, Trendz Metro, Image Hospital Rd, Madhapur, Telangana 500081",
    phone: "+91 40 2354 4535",
    email: "connectus@ispatialtec.com",
  },
  {
    country: "Bahrain",
    name: "iSpatial Techno Solutions W.L.L",
    line: "Bahrain Office",
    addr: "Office number (917) building No. (33), Road (1802) Block (318), (ALHOORA) Area, Bahrain",
    phone: "",
    email: "connectus@ispatialtec.com",
  },
];

function ContactPage() {
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
    <PageShell crumbs={[{ label: "Contact" }]}>
      <PageHero eyebrow="Contact" title="Let's talk." subtitle="Our team is here to help with sales, support, partnerships or press inquiries — anywhere in the world." />

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-bold text-3xl">Get in touch</h2>
            <p className="mt-3 text-[#0F172A]/65">Tell us about your fleet and we'll route you to the right specialist within one business day.</p>

            <div className="mt-8 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5BA829] mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-[#0F172A]">{mainOffice.country}</div>
                  <div className="text-[#0F172A]/80 font-medium">{mainOffice.name}</div>
                  <div className="text-[#0F172A]/65 mt-0.5">{mainOffice.address}</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0F172A]/50 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-[#0F172A]">Email</div>
                  <a href={`mailto:${mainOffice.email}`} className="text-[#5BA829] hover:underline">{mainOffice.email}</a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0F172A]/50 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-[#0F172A]">Phone</div>
                  <div className="text-[#0F172A]/65">{mainOffice.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-[#0F172A]/50 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-[#0F172A]">24/7 Support</div>
                  <div className="text-[#0F172A]/65">Enterprise customers get a dedicated Customer Success Manager.</div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="font-display font-bold text-xl mb-6 text-[#0F172A]">Other Location Offices</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {otherOffices.map((o) => (
                  <div key={o.country} className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#5BA829] font-bold">
                        <MapPin className="w-3.5 h-3.5" /> {o.country}
                      </div>
                      <div className="mt-2 font-display font-semibold text-base text-[#0F172A]">{o.name}</div>
                      <div className="text-xs text-[#0F172A]/65 mt-1 leading-relaxed">{o.addr}</div>
                      {o.poBox && <div className="text-xs text-[#0F172A]/50 mt-0.5">{o.poBox}</div>}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] text-[#0F172A]/60 space-y-1">
                      {o.phone && <div><span className="font-semibold">Phone:</span> {o.phone}</div>}
                      <div><span className="font-semibold">Email:</span> {o.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 aspect-[16/9] rounded-2xl overflow-hidden border border-[#E2E8F0]">
              <iframe
                title="Office map"
                className="w-full h-full"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-95.6600%2C29.7700%2C-95.6200%2C29.7950&layer=mapnik"
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            {done ? (
              <div className="rounded-3xl border border-[#E2E8F0] p-10 bg-[#F8FAFC] text-center">
                <CheckCircle className="w-12 h-12 mx-auto text-[#0F172A]" />
                <h3 className="mt-4 font-display font-bold text-2xl">Thanks — we'll be in touch.</h3>
                <p className="mt-2 text-[#0F172A]/65">A specialist will reach out within one business day.</p>
                <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline">Back to home</Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-3xl border border-[#E2E8F0] p-8 bg-white shadow-sm">
                <h3 className="font-display font-bold text-2xl">Send us a message</h3>
                <div className="mt-6 space-y-4">
                  {[
                    { name: "name", label: "Full name", type: "text" },
                    { name: "email", label: "Work email", type: "email" },
                    { name: "company", label: "Company", type: "text" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="text-xs font-semibold text-[#0F172A]/70">{f.label}</label>
                      <input name={f.name} type={f.type} className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm focus:outline-none focus:border-[#0F172A]/40" />
                      {errors[f.name] && <p className="mt-1 text-xs text-red-600">{errors[f.name]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-semibold text-[#0F172A]/70">Message</label>
                    <textarea name="message" rows={5} className="mt-1 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm focus:outline-none focus:border-[#0F172A]/40" />
                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                  </div>
                </div>
                <button type="submit" className="mt-6 w-full rounded-full bg-[#0F172A] text-white py-3 font-semibold hover:bg-black transition">Send message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

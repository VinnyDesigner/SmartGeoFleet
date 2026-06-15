import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/landing/Hero";
import {
  Trust, Why, Showcase, Solutions, Industries, Advanced, Stats,
  HowItWorks, Testimonials, Resources, FAQ, FinalCTA,
} from "@/components/landing/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartGeoFleet — AI-Powered Fleet Intelligence Platform" },
      { name: "description", content: "Track vehicles, monitor drivers, optimize routes, reduce costs, and improve safety with SmartGeoFleet's AI-powered fleet management platform." },
      { property: "og:title", content: "SmartGeoFleet — AI-Powered Fleet Intelligence" },
      { property: "og:description", content: "Real-time GPS, AI routing and driver intelligence for modern fleets." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Nav />
      <Hero />
      <Trust />
      <Why />
      <Showcase />
      <Solutions />
      <Industries />
      <Advanced />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <Resources />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

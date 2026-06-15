import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTASection({ title = "Ready to transform your fleet?", subtitle = "Talk to a SmartGeoFleet specialist and see a live demo tailored to your operations." }: { title?: string; subtitle?: string }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#0F172A] p-12 lg:p-16">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-[#00D4FF]/20 blur-[100px]" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="font-display font-bold text-3xl lg:text-5xl text-white tracking-tight">{title}</h3>
              <p className="mt-4 text-white/70 text-lg max-w-lg">{subtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link to="/book-demo" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00FFA3] text-[#0F172A] px-6 py-3 font-semibold shadow-[0_10px_40px_-10px_rgba(0,212,255,0.7)]">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 text-white px-6 py-3 font-semibold hover:bg-white/5">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

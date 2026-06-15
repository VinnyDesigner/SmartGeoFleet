import { Link } from "@tanstack/react-router";
import { Satellite, Twitter, Linkedin, Github, Youtube, MapPin } from "lucide-react";
import { solutions, industries } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white/70 pt-20 pb-10 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-white">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#00FFA3] text-[#0F172A]">
              <Satellite className="w-5 h-5" strokeWidth={2.5} />
            </span>
            SmartGeoFleet
          </Link>
          <p className="mt-4 text-sm max-w-sm leading-relaxed">
            AI-powered fleet intelligence for the world's most demanding operations. Track, optimize, and protect every vehicle, driver and asset.
          </p>
          
          {/* Main Address Section */}
          <div className="mt-6 text-xs text-white/60 space-y-1.5 max-w-sm bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00D4FF]" />
              USA Headquarters (Main Office)
            </div>
            <div className="font-medium text-white/80">iSpatial Techno Solutions Inc.</div>
            <div>16225 Park Ten Place, Suite 500, Houston, Texas 77084</div>
            <div>Phone: +1 (858) 522 9799</div>
            <div>Email: connectus@ispatialtec.com</div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            {[Twitter, Linkedin, Github, Youtube].map((I, i) => (
              <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-lg border border-white/10 hover:border-[#00D4FF]/50 hover:text-white transition">
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Solutions</h4>
          <ul className="space-y-2 text-sm">
            {solutions.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to="/solutions/$slug" params={{ slug: s.slug }} className="hover:text-white transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Industries</h4>
          <ul className="space-y-2 text-sm">
            {industries.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to="/industries/$slug" params={{ slug: s.slug }} className="hover:text-white transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/book-demo" className="hover:text-white transition-colors">Book a Demo</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <p>© {new Date().getFullYear()} SmartGeoFleet. All rights reserved.</p>
        
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Security</a>
          <a href="#" className="hover:text-white">SOC 2</a>
        </div>

        {/* Powered by IST logo section */}
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <span>Powered by</span>
          <img src="/ist-logo.png" alt="IST Logo" className="h-5 w-auto object-contain" />
        </div>
      </div>
    </footer>
  );
}

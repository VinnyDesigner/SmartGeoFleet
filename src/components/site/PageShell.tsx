import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export type Crumb = { label: string; to?: string };

export function PageShell({ crumbs, children }: { crumbs?: Crumb[]; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      <Nav isInterior />
      <div className="pt-16">
        {crumbs && crumbs.length > 0 && (
          <div className="bg-[#0F172A] border-b border-white/5">
            <nav className="mx-auto max-w-7xl px-6 py-3 text-xs text-white/60 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white">Home</Link>
              {crumbs.map((c, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-white/30" />
                  {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
                </span>
              ))}
            </nav>
          </div>
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
}

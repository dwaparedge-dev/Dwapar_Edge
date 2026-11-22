import React from "react";
import { ArrowRight } from "lucide-react";

const services = [
  ["ERP & MES software", "FactoONE runs planning, production and inventory."],
  ["Machine intelligence", "Live OEE, downtime alerts and production analytics."],
  ["On-site deployment", "Our engineers install and configure on your floor."],
  ["Training & support", "Your operators trained shift by shift, then supported."],
];

const industries = ["Foundries", "Casting", "Forging", "Machining", "Fabrication", "Heavy engineering"];

export default function Hero() {
  return (
    <section className="relative bg-ink bg-blueprint pt-28 md:pt-40 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,165,78,0.14),transparent_55%)] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-10 pb-14 md:pb-20">
        <div className="lg:col-span-7">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-gold mb-6">
            <span className="w-2 h-2 bg-gold" />Industrial technology · Gujarat, India
          </p>
          <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-bone">
            Intelligence for the <span className="text-gold">modern factory floor.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base md:text-lg text-muted max-w-xl leading-relaxed">
            Dwapar Edge builds manufacturing platform intelligence that connects planning, production and machine data, and we deploy it on-site alongside your team.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#products" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold text-ink text-sm font-semibold hover:bg-gold2 transition-colors">
              Explore the platform <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center px-6 py-3.5 border border-gold/40 text-bone text-sm font-medium hover:border-gold hover:text-gold transition-colors">
              Talk to an engineer
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-4">
          <div className="bg-coal/90 border border-line">
            <div className="flex items-center justify-between px-5 py-3 border-b border-line">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">What we do</span>
              <span className="font-mono text-[11px] text-dim">DE / 2026</span>
            </div>
            {services.map(([t, d], i) => (
              <div key={t} className="flex gap-4 px-5 py-4 border-b border-line last:border-0">
                <span className="font-mono text-xs text-gold pt-0.5">0{i + 1}</span>
                <div>
                  <p className="text-bone font-medium">{t}</p>
                  <p className="text-sm text-muted mt-0.5">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto border-t border-line py-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Built for</span>
        {industries.map((x) => (
          <span key={x} className="text-sm text-bone/80">{x}</span>
        ))}
      </div>
    </section>
  );
}

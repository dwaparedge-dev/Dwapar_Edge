import React from "react";

const cols: [string, [string, string][]][] = [
  ["Platform", [["FactoONE", "https://www.factoone.com/"], ["Overview", "#products"]]],
  ["Company", [["About", "#about"], ["How we work", "#approach"], ["Founders", "#founders"], ["Contact", "#contact"]]],
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-line px-5 sm:px-8">
      <div className="max-w-6xl mx-auto py-12 md:py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" className="h-8 w-auto" style={{ mixBlendMode: "lighten" }} />
            <span className="text-sm tracking-[0.2em] uppercase text-bone">Dwapar Edge</span>
          </div>
          <p className="mt-5 text-muted max-w-sm leading-relaxed">Manufacturing platform intelligence. Built in Gujarat, deployed on the shop floor.</p>
        </div>
        {cols.map(([h, ls]) => (
          <div key={h} className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold mb-4">{h}</p>
            <ul className="space-y-2.5 text-sm text-muted">
              {ls.map(([l, href]) => (
                <li key={l}><a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="hover:text-bone transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto border-t border-line py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-dim">
        <p>&copy; {new Date().getFullYear()} Dwapar Edge. All rights reserved.</p>
        <p>Gujarat, India</p>
      </div>
    </footer>
  );
}

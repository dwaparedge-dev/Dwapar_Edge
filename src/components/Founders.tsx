import React from "react";
import { Section } from "./Section";

const founders = [
  ["Dharmik Ahir", "DA", "Co-Founder & Chief Technology Officer", "Leads architecture and engineering of the FactoONE platform and its machine integrations."],
  ["Meet Gojiya", "MG", "Co-Founder & Chief Marketing Officer", "Drives market strategy, brand positioning and enterprise sales for Dwapar Edge."],
];

export default function Founders() {
  return (
    <Section id="founders" eyebrow="05 — Founders" title="The people behind Dwapar Edge.">
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {founders.map(([n, i, r, b]) => (
          <div key={n} className="bg-coal border border-line p-6 md:p-8 flex gap-5">
            <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 border border-gold/60 bg-gold/10 flex items-center justify-center text-gold font-semibold text-lg tracking-wider">{i}</div>
            <div>
              <h3 className="text-xl font-medium text-bone">{n}</h3>
              <p className="mt-1 text-sm text-gold">{r}</p>
              <p className="mt-4 text-muted leading-relaxed">{b}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

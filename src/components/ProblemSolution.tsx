import React from "react";
import { Check, X } from "lucide-react";
import { Section } from "./Section";

const rows = [
  ["Data entry on paper, with errors and delays.", "Automated digital workflows with no paper trail."],
  ["No real-time view of machine utilisation or OEE.", "Millisecond-level machine tracking and OEE."],
  ["Order status unclear between departments.", "Live dashboards across every operation."],
  ["Downtime logged hours or days later.", "Instant alerts and downtime prediction."],
];

export default function ProblemSolution() {
  return (
    <Section id="why" eyebrow="04 — Why manufacturers switch" title="From registers to real-time.">
      <div className="grid md:grid-cols-2 border border-line">
        <div className="p-6 md:p-8 bg-coal">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-dim mb-6">Before</p>
          <ul className="space-y-5">
            {rows.map(([a]) => (
              <li key={a} className="flex gap-3 text-muted"><X className="w-4 h-4 mt-1 shrink-0 text-dim" />{a}</li>
            ))}
          </ul>
        </div>
        <div className="p-6 md:p-8 bg-coal2 border-t md:border-t-0 md:border-l border-line relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-gold mb-6">With Dwapar Edge</p>
          <ul className="space-y-5">
            {rows.map(([, b]) => (
              <li key={b} className="flex gap-3 text-bone"><Check className="w-4 h-4 mt-1 shrink-0 text-gold" />{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

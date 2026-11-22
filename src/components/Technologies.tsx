import React from "react";
import { Section } from "./Section";

const stack = [
  ["Next.js", "Fast, server-rendered interfaces for the office and the floor."],
  ["Node.js + Express", "High-throughput APIs for plant-wide data."],
  ["MongoDB", "Flexible storage built for rapid ingestion."],
  ["WebSockets", "Live links to every machine and screen."],
];

export default function Technologies() {
  return (
    <Section id="tech" tone="coal" eyebrow="05 — Technology" title="A stack built for continuous operation.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
        {stack.map(([n, d], i) => (
          <div key={n} className="p-6 md:p-7 border-r border-b border-line hover:bg-coal2 transition-colors">
            <span className="font-mono text-xs text-gold">0{i + 1}</span>
            <h3 className="mt-5 text-lg font-medium text-bone">{n}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

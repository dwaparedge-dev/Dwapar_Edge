import React from "react";
import { Section } from "./Section";

const facts = [
  ["Based in", "Gujarat, India, close to the manufacturing clusters we serve."],
  ["Mission", "Replace registers, spreadsheets and verbal reports with one paperless, real-time workflow."],
  ["Approach", "We spend time on the shop floor before writing software for it."],
];

export default function About() {
  return (
    <Section id="about" tone="coal" eyebrow="01 — Company" title="A technology company that works on the shop floor.">
      <div className="grid lg:grid-cols-12 gap-10">
        <p className="lg:col-span-6 text-lg md:text-xl text-bone/90 leading-relaxed">
          Dwapar Edge is the company behind <span className="text-gold">FactoONE</span>, our manufacturing intelligence platform. We build for manufacturers who run real machines, real shifts and real deadlines, and we stay hands-on from first walk-through to go-live.
        </p>
        <div className="lg:col-span-6 border-t border-line">
          {facts.map(([t, d]) => (
            <div key={t} className="grid grid-cols-3 gap-4 py-5 border-b border-line">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold pt-1">{t}</p>
              <p className="col-span-2 text-muted leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

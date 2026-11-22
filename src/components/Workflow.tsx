import React from "react";
import { Section } from "./Section";

const steps = [
  ["Walk the floor", "We visit your plant, follow a job from raw material to dispatch, and note every register and handover."],
  ["Map the process", "Your real workflow, departments and machines are configured into FactoONE, not the other way round."],
  ["Install on-site", "Machines are connected and screens set up where operators actually work."],
  ["Train and stay", "Shift-by-shift training, then ongoing support from the engineers who set it up."],
];

export default function Workflow() {
  return (
    <Section id="approach" tone="coal" pattern eyebrow="03 — How we work" title="Hands-on, from first walk-through to go-live." intro="Factory software fails when it is designed from a desk. Ours is set up on your floor, with your people.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map(([t, d], i) => (
          <div key={t} className="bg-ink border border-line p-6 flex flex-col">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold text-gold tabular-nums">0{i + 1}</span>
              <span className="flex-1 h-px bg-line" />
            </div>
            <h3 className="mt-6 text-lg font-medium text-bone">{t}</h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

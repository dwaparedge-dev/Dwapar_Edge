import React from "react";

const stats = [
  ["30%", "Less machine downtime", "Average across partner factories."],
  ["10k+", "Tons tracked", "Raw material and finished goods."],
  ["100%", "Paperless", "No manual registers or physical logs."],
  ["24/7", "Live OEE", "Continuous machine state monitoring."],
];

export default function Stats() {
  return (
    <section className="bg-gold text-ink">
      <div className="h-2 bg-hazard opacity-60" />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4">
        {stats.map(([v, l, d], i) => (
          <div key={l} className={`py-10 md:py-14 ${i % 2 === 1 ? "pl-5 border-l border-ink/15" : "pr-5"} ${i >= 2 ? "border-t border-ink/15 lg:border-t-0" : ""} ${i > 0 ? "lg:pl-8 lg:border-l lg:border-ink/15" : ""}`}>
            <div className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] tabular-nums">{v}</div>
            <div className="mt-3 text-sm font-semibold">{l}</div>
            <p className="mt-1 text-sm text-ink/70 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

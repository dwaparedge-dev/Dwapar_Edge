import React from "react";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "ink" | "coal";
  pattern?: boolean;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, intro, tone = "ink", pattern, children }: Props) {
  return (
    <section id={id} className={`border-t border-line py-16 md:py-24 px-5 sm:px-8 scroll-mt-16 ${tone === "coal" ? "bg-coal" : "bg-ink"} ${pattern ? "bg-blueprint" : ""}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-gold mb-5">
            <span className="w-2 h-2 bg-gold" />
            {eyebrow}
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.025em] text-bone leading-[1.1]">{title}</h2>
          {intro && <p className="mt-5 text-base md:text-lg text-muted leading-relaxed">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

"use client";
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

// Scroll-driven name reveal: "FactoONE" starts as an outline and fills with gold as the user scrolls.
export default function FactoReveal() {
  const ref = useRef<HTMLDivElement>(null);
  // 0 when the section top hits the viewport top, 1 when its bottom hits the viewport bottom.
  const scrollYProgress = useMotionValue(0);
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      scrollYProgress.set(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollYProgress]);

  // 0 → 0.42: FactoONE fills.  0.5 → 0.85: tagline appears and fills the same way.
  const fill = useTransform(scrollYProgress, [0.03, 0.42], [100, 0]);
  const clip = useTransform(fill, (v) => `inset(0 ${v}% 0 0)`);
  const scale = useTransform(scrollYProgress, [0, 0.42], [0.92, 1]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [0.4, 1]);
  const tagOpacity = useTransform(scrollYProgress, [0.42, 0.52], [0, 1]);
  const tagY = useTransform(scrollYProgress, [0.42, 0.52], [16, 0]);
  const tagFill = useTransform(scrollYProgress, [0.5, 0.85], [100, 0]);
  const tagClip = useTransform(tagFill, (v) => `inset(-10% ${v}% -10% 0)`);
  const subOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [1, 0.4, 0.4, 1]);

  const word = "text-[21vw] lg:text-[17rem] font-semibold tracking-[-0.05em] leading-none select-none";

  const tag = "text-[7vw] sm:text-4xl md:text-6xl font-semibold tracking-[-0.025em] leading-tight whitespace-nowrap";

  return (
    <section ref={ref} className="relative h-[300vh] bg-ink">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-5">
        <div className="absolute inset-0 bg-blueprint opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,165,78,0.12),transparent_60%)] pointer-events-none" />

        <motion.p style={{ opacity: introOpacity }} className="relative flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-gold mb-6 md:mb-8">
          <span className="w-8 h-px bg-gold" />Introducing<span className="w-8 h-px bg-gold" />
        </motion.p>

        <motion.div style={{ scale }} className="relative">
          <span aria-hidden className={`${word} block text-transparent`} style={{ WebkitTextStroke: "1px rgba(201,165,78,0.45)" }}>
            FactoONE
          </span>
          <motion.span style={{ clipPath: clip }} className={`${word} absolute inset-0 block text-gold`}>
            FactoONE
          </motion.span>
        </motion.div>

        <motion.div style={{ opacity: tagOpacity, y: tagY }} className="relative mt-6 md:mt-10 text-center">
          <div className="relative">
            <p aria-hidden className={`${tag} text-transparent`} style={{ WebkitTextStroke: "1px rgba(243,239,230,0.35)" }}>
              One Factory, One Platform.
            </p>
            <motion.p style={{ clipPath: tagClip }} className={`${tag} absolute inset-0 text-bone`}>
              One Factory, <span className="text-gold">One Platform.</span>
            </motion.p>
          </div>
          <motion.p style={{ opacity: subOpacity }} className="mt-4 text-sm md:text-base text-muted">ERP + MES + machine intelligence, built by Dwapar Edge.</motion.p>
        </motion.div>

        <motion.a href="#products" style={{ opacity: cueOpacity }} className="absolute bottom-8 flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-dim hover:text-gold transition-colors">
          Scroll to see inside
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}

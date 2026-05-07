"use client";
import React from "react";

export default function CoFounders() {
  const founders = [
    {
      name: "Dharmik",
      role: "Chief Executive Officer",
      bio: "Visionary behind the Dwapar Edge ecosystem. Dharmik combines deep manufacturing domain expertise with scalable cloud architecture to revolutionize how factories operate.",
      initials: "D",
      color: "from-brand-cyan to-brand-indigo"
    },
    {
      name: "Co-Founder",
      role: "Chief Technology Officer",
      bio: "The engineering force driving the Edge AI and high-frequency telemetry engines. Dedicated to building zero-latency systems that withstand the harshest industrial environments.",
      initials: "C",
      color: "from-brand-indigo to-brand-purple"
    }
  ];

  return (
    <section id="team" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Leadership Team</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">The engineering minds behind the industrial revolution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {founders.map((founder, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group">
            <div className={`w-40 h-40 rounded-full mb-6 relative p-1 bg-gradient-to-br ${founder.color} shadow-2xl transition-transform duration-500 group-hover:scale-105`}>
              <div className="w-full h-full rounded-full bg-[#030712] flex items-center justify-center border-4 border-black">
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br min-h-[1.2em] flex items-center" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}>
                  <span className={`bg-gradient-to-br ${founder.color} text-transparent bg-clip-text`}>
                    {founder.initials}
                  </span>
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{founder.name}</h3>
            <span className="text-xs font-mono text-brand-cyan mb-4 uppercase tracking-wider">{founder.role}</span>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {founder.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

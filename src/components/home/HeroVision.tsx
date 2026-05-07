"use client";
import React from "react";

export default function HeroVision() {
  return (
    <section id="vision" className="relative pt-32 lg:pt-48 pb-24 px-6 lg:px-16 flex flex-col items-center text-center max-w-5xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-cyan/30 mb-8 animate-float">
        <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
        <span className="font-mono text-xs font-bold text-brand-cyan tracking-wider uppercase">Our Vision for Industry 4.0</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-white">
        Digitizing the <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-purple">
          Physical World
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl leading-relaxed mx-auto">
        At Dwapar Edge, we believe that the future of manufacturing relies on the seamless integration of heavy machinery and intelligent cloud infrastructure. We are on a mission to eliminate blind spots on the shop floor by building the most robust, zero-latency Edge IoT gateways and Cloud ERP systems in the world.
      </p>

      <div className="w-full max-w-4xl h-64 md:h-96 rounded-3xl overflow-hidden border border-white/10 relative group shadow-2xl">
        {/* Abstract realistic representation of connection */}
        <div className="absolute inset-0 bg-[#0a0f1d]" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, #06b6d4 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-brand-cyan rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-brand-indigo rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="absolute inset-0 flex items-center justify-center gap-12">
          <div className="glass p-6 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
            <span className="text-3xl">⚙️</span>
          </div>
          <div className="w-24 h-[2px] bg-gradient-to-r from-brand-cyan to-brand-indigo relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-1 bg-white rounded-full shadow-[0_0_10px_#fff] animate-[scan_2s_ease-in-out_infinite]" />
          </div>
          <div className="glass p-6 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
            <span className="text-3xl">☁️</span>
          </div>
        </div>
      </div>
    </section>
  );
}

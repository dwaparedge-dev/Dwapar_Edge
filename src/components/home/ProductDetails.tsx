"use client";
import React from "react";
import Link from "next/link";

export default function ProductDetails() {
  return (
    <section id="products" className="py-24 px-6 lg:px-16 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Our Core Technologies</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Hardware and software designed to work in perfect harmony across your entire shop floor.</p>
      </div>

      <div className="flex flex-col gap-16">
        
        {/* FACTORY PLUS SECTION (Cloud ERP) */}
        <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden group shadow-[0_0_50px_rgba(99,102,241,0.05)] hover:shadow-[0_0_80px_rgba(99,102,241,0.1)] transition-all duration-700">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-brand-purple/10 transition-all duration-700" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#4b6584]/20 text-[#a4b0be] text-xs font-bold mb-6 border border-[#4b6584]/30">
                CLOUD ERP & MES
              </div>
              <h3 className="text-4xl font-bold mb-6 text-white tracking-tight">Factory Plus</h3>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                The ultimate enterprise solution for factory owners. Monitor production line efficiency instantly, track operator shifts, manage purchase orders, and visualize deep analytics—all in a beautiful, lightning-fast web portal.
              </p>
              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                    <span className="text-brand-cyan">📊</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Real-time Dashboard</h4>
                    <p className="text-sm text-gray-500">OEE tracking, utilization pies, and downtime metrics.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                    <span className="text-brand-purple">📦</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Lots & PO Management</h4>
                    <p className="text-sm text-gray-500">Track purchase orders and assign raw materials dynamically.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CSS Replica of Factory Plus Dashboard */}
            <div className="order-1 lg:order-2 relative w-full aspect-[4/3] rounded-2xl bg-[#f4f5f7] overflow-hidden border border-white/20 shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
              {/* Header */}
              <div className="absolute top-0 inset-x-0 h-10 bg-white border-b border-gray-200 flex items-center px-4 justify-between z-20">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#4b6584] rounded-sm flex items-center justify-center"><span className="text-[8px] font-bold text-white">F</span></div>
                  <span className="text-[10px] font-bold text-[#2f3542]">Factory Plus</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-16 h-4 bg-gray-100 rounded-full"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              {/* Sidebar */}
              <div className="absolute top-10 left-0 bottom-0 w-24 bg-white border-r border-gray-200 flex flex-col gap-3 p-3 z-10">
                <div className="w-full h-5 bg-[#4b6584] rounded flex items-center px-2"><div className="w-2 h-2 bg-white/50 rounded-full" /></div>
                <div className="w-full h-3 bg-gray-100 rounded"></div>
                <div className="w-full h-3 bg-gray-100 rounded"></div>
                <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
                <div className="w-full h-3 bg-gray-100 rounded mt-auto"></div>
              </div>
              {/* Main Content Area */}
              <div className="absolute top-10 left-24 right-0 bottom-0 p-4 flex flex-col gap-4 bg-[#f8f9fa]">
                {/* Title */}
                <div className="w-full h-12 bg-[#576574] rounded-lg flex items-center px-4 shadow-sm">
                  <span className="text-white text-[10px] font-bold">Dashboard Overview</span>
                </div>
                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { v: "26,316", l: "TOTAL PARTS", c: "text-purple-500" },
                    { v: "2.06%", l: "UTILIZATION", c: "text-emerald-500" },
                    { v: "48.48h", l: "PROD HOURS", c: "text-amber-500" },
                    { v: "848.90", l: "DAILY OUTPUT", c: "text-blue-500" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-2 rounded shadow-sm flex flex-col items-center justify-center gap-1 border border-gray-100">
                      <span className={`text-[8px] font-bold ${stat.c}`}>{stat.l}</span>
                      <span className="text-xs font-black text-gray-800">{stat.v}</span>
                    </div>
                  ))}
                </div>
                {/* Charts Row */}
                <div className="grid grid-cols-2 gap-3 h-full">
                  <div className="bg-white rounded border border-gray-100 shadow-sm p-3 flex flex-col items-center relative">
                    <span className="text-[8px] font-bold text-gray-500 self-start mb-2">Utilization Distribution</span>
                    {/* CSS Pie Chart */}
                    <div className="w-20 h-20 rounded-full mt-2" style={{ background: 'conic-gradient(#10b981 0% 10%, #8b5cf6 10% 100%)' }} />
                  </div>
                  <div className="bg-white rounded border border-gray-100 shadow-sm p-3 flex flex-col items-center relative">
                    <span className="text-[8px] font-bold text-gray-500 self-start mb-2">Order Status</span>
                    {/* CSS Donut Chart */}
                    <div className="w-20 h-20 rounded-full mt-2 relative flex items-center justify-center" style={{ background: 'conic-gradient(#06b6d4 0% 25%, #f43f5e 25% 100%)' }}>
                      <div className="w-12 h-12 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DWAPAR EDGE SECTION (Hardware IoT) */}
        <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden group shadow-[0_0_50px_rgba(6,182,212,0.05)] hover:shadow-[0_0_80px_rgba(6,182,212,0.1)] transition-all duration-700">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-brand-cyan/10 transition-all duration-700" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* CSS Replica of Edge Device/Terminal */}
            <div className="order-1 relative w-full aspect-[4/3] rounded-2xl bg-[#0a0f1d] overflow-hidden border border-white/10 shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-1 flex flex-col">
              <div className="h-8 bg-black/50 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                <span className="text-[10px] font-mono text-gray-500 ml-2">dwapar-edge-node@local</span>
              </div>
              <div className="p-4 flex flex-col gap-2 font-mono text-[10px] text-brand-cyan/70 overflow-hidden flex-1">
                <p>Initializing OPC-UA subnets...</p>
                <p className="text-white">&gt; Found CNC-Mill-04 [192.168.1.52]</p>
                <p>&gt; Subscribing to spindle_speed (id: 4022)</p>
                <p className="text-emerald-400 mt-2">[OK] TensorFlow Anomaly Model Loaded.</p>
                <div className="mt-4 border-l-2 border-brand-indigo pl-2">
                  <p className="text-white">Live Ingestion Rate:</p>
                  <p className="text-2xl font-bold text-brand-cyan mt-1 animate-pulse">2,405 msgs/s</p>
                </div>
                <p className="text-gray-500 mt-auto opacity-50 block">&gt; Encrypting payload via TLS 1.3... Tunnel active.</p>
              </div>
            </div>

            {/* Text Content */}
            <div className="order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-cyan/10 text-brand-cyan text-xs font-bold mb-6 border border-brand-cyan/30">
                INDUSTRIAL IOT NODE
              </div>
              <h3 className="text-4xl font-bold mb-6 text-white tracking-tight">Dwapar Edge Box</h3>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                The physical bridge to your shop floor. Deploy our ruggedized edge computing node to ingest high-frequency telemetry from CNCs and robotic arms. It runs predictive AI locally, instantly uploading filtered insights directly into Factory Plus.
              </p>
              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                    <span className="text-brand-cyan">⚡</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Millisecond Discovery</h4>
                    <p className="text-sm text-gray-500">Auto-detects Modbus-TCP and OPC-UA devices.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                    <span className="text-brand-indigo">🧠</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">TensorFlow Edge AI</h4>
                    <p className="text-sm text-gray-500">Catches vibration anomalies before catastrophic machine failure.</p>
                  </div>
                </div>
              </div>
              <Link href="/edge" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                View Hardware Specs <span>→</span>
              </Link>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}

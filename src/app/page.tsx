"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";

export default function Home() {
  // Simulator States
  const [isIngesting, setIsIngesting] = useState(true);
  const [isAiRunning, setIsAiRunning] = useState(true);
  const [isAnomalySimulated, setIsAnomalySimulated] = useState(false);
  const [anomalyScore, setAnomalyScore] = useState(0.024);
  const [msgCount, setMsgCount] = useState(1480);
  const [cpuLoad, setCpuLoad] = useState(8.4);
  const [logs, setLogs] = useState<string[]>([
    "[15:42:01] [OPC-UA] Core system initialized.",
    "[15:42:02] [Factory-Plus] Handshake successful. Secure tunnel established.",
    "[15:42:03] [MQTT] Connected to Broker: broker.local:1883",
    "[15:42:04] [Modbus-TCP] Scanning local IP range 192.168.1.50-60...",
    "[15:42:05] [Modbus-TCP] Found CNC-Mill-04 at 192.168.1.52. Connected.",
    "[15:42:06] [OPC-UA] Subscribed to CNC-Mill-04/spindle_speed (id: 4022)",
    "[15:42:07] [Edge-AI] Loading Anomaly Detection Model v1.4...",
    "[15:42:08] [Edge-AI] Anomaly Detection Model loaded successfully (Accuracy: 99.4%).",
    "[15:42:09] [OPC-UA] Ingestion started. Streaming at 2400 msgs/s.",
  ]);

  // Calculator States
  const [machineCount, setMachineCount] = useState(48);
  const [telemetryFrequency, setTelemetryFrequency] = useState(25); // Hz

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Auto-generate streaming telemetry logs
  useEffect(() => {
    if (!isIngesting) return;
    const interval = setInterval(() => {
      const protocols = ["OPC-UA", "Modbus-TCP", "MQTT", "EtherNet/IP"];
      const machines = ["CNC-Mill-04", "Robotic-Arm-02", "Injection-Mold-12", "Conveyor-01"];
      const params = ["vibration", "temperature", "spindle_speed", "current_draw"];

      const randomProto = protocols[Math.floor(Math.random() * protocols.length)];
      const randomMachine = machines[Math.floor(Math.random() * machines.length)];
      const randomParam = params[Math.floor(Math.random() * params.length)];

      let randomVal = "";
      if (randomParam === "vibration") {
        randomVal = isAnomalySimulated 
          ? (4.8 + Math.random() * 2.2).toFixed(2) + " mm/s (HIGH)"
          : (0.4 + Math.random() * 0.3).toFixed(2) + " mm/s";
      } else if (randomParam === "temperature") {
        randomVal = isAnomalySimulated
          ? (88.4 + Math.random() * 12.0).toFixed(1) + " °C"
          : (42.1 + Math.random() * 3.5).toFixed(1) + " °C";
      } else if (randomParam === "spindle_speed") {
        randomVal = (1200 + Math.random() * 150).toFixed(0) + " RPM";
      } else {
        randomVal = (12.4 + Math.random() * 1.5).toFixed(1) + " A";
      }

      const timestamp = new Date().toTimeString().split(" ")[0];
      let newLog = `[${timestamp}] [${randomProto}] ${randomMachine} -> ${randomParam}: ${randomVal}`;
      
      if (isAnomalySimulated && (randomParam === "vibration" || randomParam === "temperature")) {
        newLog = `🔴 [${timestamp}] [ALERT] [Edge-AI] CRITICAL ANOMALY: ${randomMachine} ${randomParam} is too high! Value: ${randomVal}`;
      }

      setLogs(prev => [newLog, ...prev.slice(0, 14)]);
      setMsgCount(c => c + 1);
    }, 900);

    return () => clearInterval(interval);
  }, [isIngesting, isAnomalySimulated]);

  // AI model score fluctuation
  useEffect(() => {
    if (!isAiRunning) {
      setAnomalyScore(0);
      setCpuLoad(2.1);
      return;
    }
    const interval = setInterval(() => {
      setAnomalyScore(() => {
        const base = isAnomalySimulated ? 0.924 : 0.024;
        const variation = (Math.random() * 0.03) - 0.015;
        return Math.max(0.005, Math.min(0.999, Number((base + variation).toFixed(3))));
      });
      setCpuLoad(() => {
        const base = isAnomalySimulated ? 18.4 : 8.4;
        const variation = (Math.random() * 2) - 1;
        return Number((base + variation).toFixed(1));
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isAiRunning, isAnomalySimulated]);

  // Interactive Calculator Computations
  const calculations = useMemo(() => {
    const rawInbound = machineCount * telemetryFrequency * 256; // 256 bytes per payload average
    const rawDailyGB = (rawInbound * 86400) / (1024 * 1024 * 1024);
    
    // Edge processes 100% of data locally, but only syncs averages every 5 mins, states, and anomalies to cloud
    const edgeDailyGB = rawDailyGB * 0.04; // 96% compression/filtering rate
    const bandwidthSavedPercent = 96;
    
    // Average AWS/Azure ingestion & database cost per GB is approx $0.15 + compute fees
    const cloudCostWithoutEdge = rawDailyGB * 30 * 0.18;
    const cloudCostWithEdge = edgeDailyGB * 30 * 0.18;
    const monthlySavings = cloudCostWithoutEdge - cloudCostWithEdge;

    return {
      rawDailyGB: rawDailyGB.toFixed(1),
      edgeDailyGB: edgeDailyGB.toFixed(2),
      bandwidthSavedPercent,
      monthlySavings: Math.max(12, Math.round(monthlySavings)).toLocaleString(),
    };
  }, [machineCount, telemetryFrequency]);

  return (
    <div className="relative min-h-screen bg-[#030712] dot-overlay overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-brand-cyan/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[450px] h-[450px] bg-brand-indigo/6 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 1. HEADER */}
      <header className="sticky top-0 z-50 w-full glass border-b border-white/5 px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan to-brand-indigo shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <span className="font-mono text-lg font-black text-black">D</span>
            <div className="absolute -inset-0.5 animate-ping-slow rounded-xl bg-brand-cyan/20 pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-lg font-bold tracking-wider text-white">DWAPAR</span>
            <span className="font-mono text-[9px] text-brand-cyan tracking-[0.25em] -mt-1 uppercase">EDGE GATEWAY</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-400 hover:text-brand-cyan transition-colors" id="nav-link-features">Features</a>
          <a href="#demo" className="text-sm font-medium text-gray-400 hover:text-brand-cyan transition-colors" id="nav-link-demo">Interactive Demo</a>
          <a href="#architecture" className="text-sm font-medium text-gray-400 hover:text-brand-cyan transition-colors" id="nav-link-arch">Architecture</a>
          <a href="#hardware" className="text-sm font-medium text-gray-400 hover:text-brand-cyan transition-colors" id="nav-link-hardware">Hardware</a>
          <a href="#calculator" className="text-sm font-medium text-gray-400 hover:text-brand-cyan transition-colors" id="nav-link-calc">ROI Calculator</a>
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-brand-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
            v2.4 LTS Active
          </span>
          <a
            href="#demo"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-indigo hover:from-brand-cyan/90 hover:to-brand-indigo/90 text-sm font-bold text-black transition-all hover:scale-[1.03] shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
            id="header-cta-btn"
          >
            Launch Console
          </a>
        </div>
      </header>

      <main className="relative z-10">
        
        {/* 2. HERO SECTION */}
        <section className="relative px-6 lg:px-16 pt-16 lg:pt-24 pb-16 flex flex-col items-center text-center max-w-7xl mx-auto">
          {/* Animated Announcement Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-cyan/15 to-brand-indigo/15 border border-brand-cyan/30 text-brand-cyan font-mono text-xs font-semibold mb-8 tracking-wide animate-float">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
            </span>
            ⚡ COMPATIBLE WITH FACTORY PLUS WORKFLOWS
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.1] mb-6">
            The Intelligent Edge for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-purple bg-clip-text text-transparent drop-shadow-sm">
              Modern Manufacturing
            </span>
          </h1>

          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mb-10 leading-relaxed">
            Empower your shop floor with the fastest Industrial IoT gateway. Seamlessly ingest millisecond machine telemetry, execute localized edge AI models for anomaly detection, and sync bi-directionally with <span className="text-brand-cyan font-semibold">Factory Plus</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center max-w-md">
            <a
              href="#demo"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-indigo text-black font-bold text-center transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
              id="hero-primary-btn"
            >
              Simulate Live Ingestion
            </a>
            <a
              href="#calculator"
              className="px-8 py-4 rounded-xl border border-white/10 hover:border-brand-cyan/50 hover:bg-white/5 text-white font-semibold text-center transition-all hover:scale-[1.02]"
              id="hero-secondary-btn"
            >
              Calculate ROI Savings
            </a>
          </div>

          {/* 3. HERO VISUAL / INTERACTIVE TERMINAL CONSOLE */}
          <div id="demo" className="w-full max-w-6xl mx-auto glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative mb-24">
            {/* Window bar */}
            <div className="bg-[#0b0f1a] px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
                <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
                <span className="h-3 w-3 rounded-full bg-[#10b981]" />
                <span className="ml-4 font-mono text-xs text-gray-500 tracking-wide">dwapar-edge-gw-01@factory-floor</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20 uppercase tracking-wider animate-pulse">
                  SYSTEM ACTIVE
                </span>
              </div>
            </div>

            {/* Dashboard grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 border-b border-white/5 bg-[#070b14]">
              
              <div className="p-6 border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 mb-1">Telemetry Ingestion</span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold font-mono tracking-tight ${isIngesting ? "text-brand-cyan" : "text-gray-500"}`}>
                    {isIngesting ? "ACTIVE" : "PAUSED"}
                  </span>
                  {isIngesting && <span className="h-2 w-2 rounded-full bg-brand-cyan animate-ping" />}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">Ingesting OPC-UA & Modbus-TCP</p>
              </div>

              <div className="p-6 border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 mb-1">Ingestion Rate</span>
                <span className="text-2xl font-bold font-mono tracking-tight text-white">
                  {isIngesting ? `${(2400 + Math.floor(Math.random() * 80)).toLocaleString()} msgs/s` : "0 msgs/s"}
                </span>
                <p className="text-[11px] text-gray-400 mt-1">Parsed packets count: <span className="text-brand-cyan font-semibold">{msgCount}</span></p>
              </div>

              <div className="p-6 border-b md:border-b-0 md:border-r border-white/5 flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 mb-1">Edge AI Anomaly Model</span>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold font-mono tracking-tight ${anomalyScore > 0.8 ? "text-[#ef4444] text-glow-cyan animate-pulse" : isAiRunning ? "text-brand-indigo" : "text-gray-500"}`}>
                    {isAiRunning ? `SCORE: ${anomalyScore}` : "OFFLINE"}
                  </span>
                  {isAiRunning && (
                    <span className={`h-2.5 w-2.5 rounded-full ${anomalyScore > 0.8 ? "bg-[#ef4444]" : "bg-[#10b981]"}`} />
                  )}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Status: {anomalyScore > 0.8 ? (
                    <span className="text-[#ef4444] font-bold">WARNING: CRITICAL LEVEL</span>
                  ) : isAiRunning ? (
                    <span className="text-[#10b981] font-semibold">Nominal Operation</span>
                  ) : (
                    "Disabled"
                  )}
                </p>
              </div>

              <div className="p-6 flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-500 mb-1">Local Resource Load</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono tracking-tight text-white">{cpuLoad}% CPU</span>
                  <span className="text-xs text-gray-500">12.1W Draw</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-cyan to-brand-indigo rounded-full transition-all duration-1000" 
                    style={{ width: `${cpuLoad * 4}%` }} 
                  />
                </div>
              </div>

            </div>

            {/* Ingestion & Terminal View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#030712] min-h-[350px]">
              
              {/* Controls Column */}
              <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col gap-6 justify-center bg-[#070b14]/50">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan">⚙️</span>
                  Simulator Control Board
                </h3>
                
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setIsIngesting(!isIngesting)}
                    className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-between border ${
                      isIngesting 
                        ? "bg-brand-cyan/10 border-brand-cyan/30 text-brand-cyan shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] hover:bg-brand-cyan/15" 
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                    id="sim-btn-telemetry"
                  >
                    <span>1. TELEMETRY INGESTION</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${isIngesting ? "bg-brand-cyan/20" : "bg-white/10 text-gray-500"}`}>
                      {isIngesting ? "ACTIVE" : "PAUSED"}
                    </span>
                  </button>

                  <button
                    onClick={() => setIsAiRunning(!isAiRunning)}
                    className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-between border ${
                      isAiRunning 
                        ? "bg-brand-indigo/10 border-brand-indigo/30 text-brand-indigo shadow-[inset_0_0_10px_rgba(99,102,241,0.1)] hover:bg-brand-indigo/15" 
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                    }`}
                    id="sim-btn-ai"
                  >
                    <span>2. EDGE AI PREDICTIONS</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${isAiRunning ? "bg-brand-indigo/20" : "bg-white/10 text-gray-500"}`}>
                      {isAiRunning ? "RUNNING" : "STOPPED"}
                    </span>
                  </button>

                  <button
                    onClick={() => setIsAnomalySimulated(!isAnomalySimulated)}
                    disabled={!isAiRunning}
                    className={`w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-between border ${
                      !isAiRunning 
                        ? "opacity-40 cursor-not-allowed bg-white/5 border-white/5 text-gray-600" 
                        : isAnomalySimulated 
                          ? "bg-[#ef4444]/15 border-[#ef4444]/40 text-[#ef4444] hover:bg-[#ef4444]/25 shadow-[0_0_15px_rgba(239,68,68,0.2)] animate-pulse" 
                          : "bg-white/5 border-white/10 text-[#ef4444] hover:bg-[#ef4444]/10 hover:border-[#ef4444]/30"
                    }`}
                    id="sim-btn-anomaly"
                  >
                    <span>3. SIMULATE MACHINE FAULT</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold ${isAnomalySimulated ? "bg-[#ef4444]/20" : "bg-white/10"}`}>
                      {isAnomalySimulated ? "FAULT TRUE" : "TRIGGER"}
                    </span>
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-400 leading-relaxed font-sans">
                  💡 <strong className="text-white">Live Edge-to-ERP Sync:</strong> Observe the terminal logs. When you trigger a <span className="text-[#ef4444] font-semibold">Machine Fault</span>, the Edge AI registers a spike in anomaly score, intercepts the raw data, and pushes a real-time Downtime Record natively to <strong className="text-white">Factory Plus</strong> without routing heavy continuous telemetry to the cloud.
                </div>
              </div>

              {/* Terminal Column (Takes 2 spans) */}
              <div className="lg:col-span-2 p-6 flex flex-col relative h-[380px] lg:h-auto overflow-hidden">
                <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3 block">Live Console Telemetry Logs stream</span>
                
                {/* Live Scanning overlay effect */}
                {isIngesting && (
                  <div className="absolute left-0 right-0 h-0.5 bg-brand-cyan/20 animate-telemetry-scan pointer-events-none" />
                )}

                <div className="flex-1 overflow-y-auto font-mono text-[11px] sm:text-xs leading-6 text-gray-300 pr-2 scrollbar-thin">
                  {logs.map((log, idx) => {
                    let logColor = "text-gray-300";
                    if (log.includes("🔴")) logColor = "text-[#ef4444] font-bold bg-[#ef4444]/10 px-2 py-0.5 rounded";
                    else if (log.includes("[Factory-Plus]")) logColor = "text-[#10b981]";
                    else if (log.includes("[Edge-AI]")) logColor = "text-brand-indigo";
                    else if (log.includes("[OPC-UA]")) logColor = "text-brand-cyan";
                    else if (log.includes("[ALERT]")) logColor = "text-[#fbbf24]";

                    return (
                      <div key={idx} className={`font-mono transition-all py-0.5 ${logColor} truncate`}>
                        {log}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. PLATFORM CORE CAPABILITIES GRID */}
        <section id="features" className="px-6 lg:px-16 py-20 bg-[#070b14]/50 border-y border-white/5 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-xs font-semibold text-brand-cyan uppercase tracking-[0.2em] mb-3 block">HIGH PERFORMANCE EDGE COMPUTING</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Core Capabilities Built For Action
              </h2>
              <p className="text-gray-400">
                Dwapar Edge combines raw industrial speed with local intelligence. Collect, process, analyze, and synchronize machine signals without the overhead of heavy cloud data bills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Card 1 */}
              <div className="glass rounded-2xl p-8 hover:translate-y-[-5px] transition-all duration-300 glass-glow-cyan flex flex-col group">
                <div className="h-12 w-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xl mb-6 group-hover:scale-110 transition-transform">
                  📥
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Sub-millisecond Ingestion</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Support standard industrial protocols natively (OPC-UA, Modbus, MQTT, CAN bus) with polling rates down to 1 millisecond.
                </p>
                <div className="mt-auto pt-6 flex items-center text-xs font-bold text-brand-cyan tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </div>

              {/* Card 2 */}
              <div className="glass rounded-2xl p-8 hover:translate-y-[-5px] transition-all duration-300 glass-glow-indigo flex flex-col group">
                <div className="h-12 w-12 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo text-xl mb-6 group-hover:scale-110 transition-transform">
                  🧠
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Shop Floor Edge AI</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Execute custom TensorFlow/ONNX models locally. Detect microscopic quality defects and mechanical bearing anomalies instantly.
                </p>
                <div className="mt-auto pt-6 flex items-center text-xs font-bold text-brand-indigo tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </div>

              {/* Card 3 */}
              <div className="glass rounded-2xl p-8 hover:translate-y-[-5px] transition-all duration-300 glass-glow-cyan flex flex-col group">
                <div className="h-12 w-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xl mb-6 group-hover:scale-110 transition-transform">
                  🔄
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Factory Plus Native</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  No complex integrations. Bi-directional sync automatically registers machine states, downtime, and lot progress metrics.
                </p>
                <div className="mt-auto pt-6 flex items-center text-xs font-bold text-brand-cyan tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </div>

              {/* Card 4 */}
              <div className="glass rounded-2xl p-8 hover:translate-y-[-5px] transition-all duration-300 glass-glow-indigo flex flex-col group">
                <div className="h-12 w-12 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo text-xl mb-6 group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Autonomous Security</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Operates fully offline when internet drops, storing up to 60 days of buffered logs locally. Securely uploads on link restoration.
                </p>
                <div className="mt-auto pt-6 flex items-center text-xs font-bold text-brand-indigo tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE DATA-FLOW ARCHITECTURE */}
        <section id="architecture" className="px-6 lg:px-16 py-24 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="font-mono text-xs font-semibold text-brand-indigo uppercase tracking-[0.2em] mb-3 block">INTEGRATION VISUALIZATION</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 font-sans">
              How the Data Flows
            </h2>
            <p className="text-gray-400">
              Traditional gateways dump high-bandwidth raw logs into expensive databases. Dwapar Edge pre-calculates, filters, and runs models locally, delivering structured insights to Factory Plus.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative">
            {/* Visual connecting laser lines (for wide screens) */}
            <div className="hidden lg:block absolute top-1/2 left-[28%] right-[28%] h-[2px] bg-gradient-to-r from-brand-cyan/40 via-brand-indigo/40 to-brand-purple/40 -translate-y-1/2 -z-10 pointer-events-none">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-brand-cyan shadow-[0_0_10px_#06b6d4] animate-[ping-slow_3s_infinite]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-brand-purple shadow-[0_0_10px_#a855f7] animate-[ping-slow_3s_infinite_1.5s]" />
            </div>

            {/* Step 1: Shop Floor Devices */}
            <div className="glass p-8 rounded-2xl border border-brand-cyan/20 relative shadow-[0_0_15px_rgba(6,182,212,0.05)]">
              <div className="absolute top-0 right-8 -translate-y-1/2 font-mono text-[10px] text-brand-cyan bg-brand-cyan/15 border border-brand-cyan/30 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                Shop Floor
              </div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🏭</span> Machines & PLCs
              </h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                CNCs, injection molding systems, PLCs (Siemens, Rockwell), and sensors emit tens of thousands of high-velocity raw signals per second.
              </p>
              <div className="space-y-3 font-mono text-xs text-gray-400 bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center">
                  <span>Modbus Polling:</span>
                  <span className="text-brand-cyan">100Hz</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>OPC-UA Variables:</span>
                  <span className="text-brand-cyan">148 Nodes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Daily Raw Volume:</span>
                  <span className="text-[#ef4444] font-semibold">{calculations.rawDailyGB} GB</span>
                </div>
              </div>
            </div>

            {/* Step 2: Dwapar Edge Gateway */}
            <div className="glass p-8 rounded-2xl border border-brand-indigo/30 relative shadow-[0_0_20px_rgba(99,102,241,0.1)] scale-100 lg:scale-[1.05] animate-float">
              <div className="absolute top-0 right-8 -translate-y-1/2 font-mono text-[10px] text-brand-indigo bg-brand-indigo/15 border border-brand-indigo/30 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                Intelligence
              </div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>⚡</span> Dwapar Edge Node
              </h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Ingests data locally in under 1ms. Analyzes vibrations, flags anomalies on the fly, compiles OEE states, and discards repetitive static telemetry.
              </p>
              <div className="space-y-3 font-mono text-xs text-gray-400 bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center">
                  <span>Edge AI Model:</span>
                  <span className="text-brand-indigo">Loaded</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Vibration Filtering:</span>
                  <span className="text-brand-cyan">Activated</span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span>Bandwidth Reduction:</span>
                  <span className="text-brand-cyan">-{calculations.bandwidthSavedPercent}%</span>
                </div>
              </div>
            </div>

            {/* Step 3: Factory Plus Cloud ERP */}
            <div className="glass p-8 rounded-2xl border border-brand-purple/20 relative shadow-[0_0_15px_rgba(168,85,247,0.05)]">
              <div className="absolute top-0 right-8 -translate-y-1/2 font-mono text-[10px] text-brand-purple bg-brand-purple/15 border border-brand-purple/30 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                Enterprise
              </div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>☁️</span> Factory Plus Cloud
              </h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Receives pre-computed lot completed events, downtime logs, and anomalies. Updates operations managers, schedules technicians, and stores long-term records.
              </p>
              <div className="space-y-3 font-mono text-xs text-gray-400 bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-center">
                  <span>ERP Sync Status:</span>
                  <span className="text-brand-purple">Synchronized</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sync Interval:</span>
                  <span className="text-brand-purple">Sub-Second</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Filtered Daily Ingestion:</span>
                  <span className="text-brand-purple font-semibold">{calculations.edgeDailyGB} GB</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. HARDWARE SHOWCASE */}
        <section id="hardware" className="px-6 lg:px-16 py-24 bg-[#070b14]/50 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="font-mono text-xs font-semibold text-brand-cyan uppercase tracking-[0.2em] mb-3 block">RUGGED INDUSTRIAL GATEWAYS</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                The Edge Hardware Fleet
              </h2>
              <p className="text-gray-400">
                Engineered for harsh factory environments. Our fanless, solid-state edge devices are ready for CNC panels, DIN rails, or remote sensor nodes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Hardware Product 1 */}
              <div className="glass rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col sm:flex-row gap-8 items-center hover:border-brand-cyan/30 transition-all group">
                <div className="relative w-full sm:w-1/2 aspect-square flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
                  {/* Mock Hardware Design using SVG inside */}
                  <svg viewBox="0 0 200 200" className="w-40 h-40 animate-float">
                    <defs>
                      <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1f2937" />
                        <stop offset="100%" stopColor="#0b0f19" />
                      </linearGradient>
                      <linearGradient id="glowCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                    {/* Metal Heatsink fins */}
                    <rect x="40" y="40" width="120" height="120" rx="16" fill="url(#boxGrad)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <rect x="52" y="30" width="8" height="140" rx="4" fill="#374151" />
                    <rect x="68" y="30" width="8" height="140" rx="4" fill="#374151" />
                    <rect x="84" y="30" width="8" height="140" rx="4" fill="#374151" />
                    <rect x="100" y="30" width="8" height="140" rx="4" fill="#374151" />
                    <rect x="116" y="30" width="8" height="140" rx="4" fill="#374151" />
                    <rect x="132" y="30" width="8" height="140" rx="4" fill="#374151" />
                    <rect x="148" y="30" width="8" height="140" rx="4" fill="#374151" />
                    
                    {/* Connection Ports */}
                    <rect x="60" y="130" width="20" height="14" rx="2" fill="#1f2937" stroke="rgba(255,255,255,0.2)" />
                    <rect x="90" y="130" width="20" height="14" rx="2" fill="#1f2937" stroke="rgba(255,255,255,0.2)" />
                    <rect x="120" y="130" width="20" height="14" rx="2" fill="#1f2937" stroke="rgba(255,255,255,0.2)" />

                    {/* Logo Plate */}
                    <rect x="65" y="65" width="70" height="30" rx="6" fill="#030712" border="1px solid rgba(255,255,255,0.05)" />
                    <text x="100" y="84" fill="#06b6d4" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="1">D-EDGE 1</text>
                    
                    {/* Glowing LED Indicators */}
                    <circle cx="65" cy="110" r="4" fill="#10b981" className="animate-pulse" />
                    <circle cx="80" cy="110" r="4" fill="#06b6d4" className="animate-pulse" />
                    <circle cx="95" cy="110" r="4" fill="#6366f1" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="w-full sm:w-1/2 flex flex-col">
                  <span className="font-mono text-xs font-semibold text-brand-cyan mb-2">HIGH CAPACITY GATEWAY</span>
                  <h3 className="text-2xl font-bold text-white mb-3">Dwapar Edge Box-1</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    Heavy-duty industrial PC designed for plant-wide orchestration. Runs multi-container architectures and heavy deep learning models.
                  </p>
                  <ul className="space-y-3.5 font-mono text-xs text-gray-400">
                    <li className="flex items-center gap-2"><span className="text-brand-cyan">✔</span> Intel Core i5 6-Core, 16GB RAM</li>
                    <li className="flex items-center gap-2"><span className="text-brand-cyan">✔</span> 4x Gigabit RJ45, Dual Isolated RS-485</li>
                    <li className="flex items-center gap-2"><span className="text-brand-cyan">✔</span> Operating Temp: -20°C to 70°C</li>
                    <li className="flex items-center gap-2"><span className="text-brand-cyan">✔</span> Native TPM 2.0 Secure Cryptoprocessor</li>
                  </ul>
                </div>
              </div>

              {/* Hardware Product 2 */}
              <div className="glass rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col sm:flex-row gap-8 items-center hover:border-brand-indigo/30 transition-all group">
                <div className="relative w-full sm:w-1/2 aspect-square flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
                  {/* Mock Hardware Design using SVG inside */}
                  <svg viewBox="0 0 200 200" className="w-40 h-40 animate-float-delayed">
                    <rect x="55" y="30" width="90" height="140" rx="10" fill="url(#boxGrad)" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    {/* Din Rail hook backplate */}
                    <rect x="45" y="60" width="10" height="80" rx="2" fill="#374151" />
                    
                    {/* Core Block */}
                    <rect x="65" y="45" width="70" height="110" rx="6" fill="#030712" />
                    
                    {/* LED Lights vertical */}
                    <circle cx="80" cy="65" r="3" fill="#10b981" />
                    <text x="92" y="68" fill="#9ca3af" fontSize="7" fontFamily="sans-serif">PWR</text>
                    
                    <circle cx="80" cy="80" r="3" fill="#06b6d4" className="animate-pulse" />
                    <text x="92" y="83" fill="#9ca3af" fontSize="7" fontFamily="sans-serif">DATA</text>

                    <circle cx="80" cy="95" r="3" fill="#fbbf24" />
                    <text x="92" y="98" fill="#9ca3af" fontSize="7" fontFamily="sans-serif">LINK</text>
                    
                    {/* USB / Ethernet ports details */}
                    <rect x="75" y="125" width="22" height="15" rx="1" fill="#1f2937" stroke="rgba(255,255,255,0.2)" />
                    <rect x="103" y="125" width="22" height="15" rx="1" fill="#1f2937" stroke="rgba(255,255,255,0.2)" />
                    
                    <text x="100" y="115" fill="#6366f1" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MICRO-1</text>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="w-full sm:w-1/2 flex flex-col">
                  <span className="font-mono text-xs font-semibold text-brand-indigo mb-2">COMPACT DIN-RAIL CONTROLLER</span>
                  <h3 className="text-2xl font-bold text-white mb-3">Dwapar Edge Micro-1</h3>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                    Ultra-compact, DIN-rail mounted IoT gateway designed for individual machines, CNC panels, and robotic workcells.
                  </p>
                  <ul className="space-y-3.5 font-mono text-xs text-gray-400">
                    <li className="flex items-center gap-2"><span className="text-brand-indigo">✔</span> ARM Cortex-A72 Quad-core, 4GB RAM</li>
                    <li className="flex items-center gap-2"><span className="text-brand-indigo">✔</span> 2x Gigabit Ethernet, 1x Isolated RS-485</li>
                    <li className="flex items-center gap-2"><span className="text-brand-indigo">✔</span> Ultra-low 5W power draw, 9V-36V input</li>
                    <li className="flex items-center gap-2"><span className="text-brand-indigo">✔</span> Aluminum chassis, fanless passive cooling</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 7. INTERACTIVE SAVINGS CALCULATOR */}
        <section id="calculator" className="px-6 lg:px-16 py-24 max-w-7xl mx-auto">
          <div className="glass rounded-3xl p-8 sm:p-16 border border-white/10 relative overflow-hidden shadow-2xl">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-indigo/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              <div className="lg:col-span-6 flex flex-col">
                <span className="font-mono text-xs font-semibold text-brand-cyan uppercase tracking-[0.2em] mb-3 block">LIVE BANDWIDTH & ROI ESTIMATOR</span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                  Calculate Your Savings
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed text-sm sm:text-base">
                  See how much money and bandwidth you can save by processing telemetry locally at the edge instead of routing continuous raw millisecond packets to expensive cloud warehouses.
                </p>

                {/* Slider 1: Machine Count */}
                <div className="mb-8">
                  <div className="flex justify-between font-mono text-sm mb-2.5">
                    <span className="text-gray-300">Active Edge Devices / Machines</span>
                    <span className="text-brand-cyan font-bold">{machineCount} Machines</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="250"
                    value={machineCount}
                    onChange={(e) => setMachineCount(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                    id="slider-machines"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1.5">
                    <span>1 Unit</span>
                    <span>250 Units</span>
                  </div>
                </div>

                {/* Slider 2: Telemetry frequency */}
                <div className="mb-4">
                  <div className="flex justify-between font-mono text-sm mb-2.5">
                    <span className="text-gray-300">Telemetry Sampling Rate</span>
                    <span className="text-brand-indigo font-bold">{telemetryFrequency} Hz (messages/sec)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={telemetryFrequency}
                    onChange={(e) => setTelemetryFrequency(Number(e.target.value))}
                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-indigo"
                    id="slider-frequency"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1.5">
                    <span>1 msg/sec (1Hz)</span>
                    <span>100 msg/sec (100Hz)</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Result Card 1 */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-center">
                  <span className="text-[10px] font-mono uppercase text-gray-500 mb-1 tracking-wider">Raw Inbound Traffic</span>
                  <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                    {calculations.rawDailyGB} <span className="text-sm text-gray-400 font-normal">GB/day</span>
                  </span>
                  <p className="text-[11px] text-[#ef4444] mt-2 font-mono">Continuous cloud routing</p>
                </div>

                {/* Result Card 2 */}
                <div className="p-6 rounded-2xl bg-[#06b6d4]/5 border border-brand-cyan/20 flex flex-col justify-center shadow-[inset_0_0_15px_rgba(6,182,212,0.05)]">
                  <span className="text-[10px] font-mono uppercase text-brand-cyan mb-1 tracking-wider">With Dwapar Edge</span>
                  <span className="text-3xl font-extrabold font-mono text-brand-cyan tracking-tight">
                    {calculations.edgeDailyGB} <span className="text-sm text-brand-cyan/70 font-normal">GB/day</span>
                  </span>
                  <p className="text-[11px] text-[#10b981] mt-2 font-mono font-semibold">Filtered local processing</p>
                </div>

                {/* Result Card 3 */}
                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-center">
                  <span className="text-[10px] font-mono uppercase text-gray-500 mb-1 tracking-wider">Bandwidth Conserved</span>
                  <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                    {calculations.bandwidthSavedPercent}%
                  </span>
                  <p className="text-[11px] text-gray-400 mt-2 font-mono">Fewer telemetry overhead packets</p>
                </div>

                {/* Result Card 4 */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 border border-brand-indigo/30 flex flex-col justify-center shadow-[0_0_20px_rgba(99,102,241,0.15)] animate-float">
                  <span className="text-[10px] font-mono uppercase text-brand-indigo mb-1 tracking-wider">Estimated Savings</span>
                  <span className="text-3xl font-extrabold font-mono text-brand-indigo tracking-tight">
                    ${calculations.monthlySavings} <span className="text-sm text-gray-400 font-normal">/mo</span>
                  </span>
                  <p className="text-[11px] text-[#10b981] mt-2 font-mono font-semibold">Saved in cloud databases</p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section className="px-6 lg:px-16 py-20 bg-[#070b14]/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="font-mono text-xs font-semibold text-brand-indigo uppercase tracking-[0.2em] mb-3 block">TRUSTED WORLDWIDE</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Success On The Factory Floor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="glass p-8 rounded-2xl border border-white/5 flex flex-col">
                <div className="text-brand-cyan text-xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-sm text-gray-300 leading-relaxed italic mb-8 flex-1">
                  &ldquo;Connecting our CNC mills to Factory Plus was a massive bottleneck due to cloud database costs. Integrating Dwapar Edge cut our inbound data bills by 95% while keeping sub-second anomaly logs. Highly recommended.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-cyan/20 flex items-center justify-center font-bold text-brand-cyan">
                    AG
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Anil Gupta</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">VP Operations, Precision Forge</span>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-2xl border border-white/5 flex flex-col">
                <div className="text-brand-cyan text-xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-sm text-gray-300 leading-relaxed italic mb-8 flex-1">
                  &ldquo;Our internet goes down occasionally during heavy monsoon seasons. The buffered edge-logs feature of Dwapar Edge is a lifesaver. It keeps recording telemetry offline and perfectly updates our Factory Plus dashboard upon reconnection.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-indigo/20 flex items-center justify-center font-bold text-brand-indigo">
                    MS
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Meera Shah</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">IT Director, Dwarka Plastics</span>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-2xl border border-white/5 flex flex-col">
                <div className="text-brand-cyan text-xl mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-sm text-gray-300 leading-relaxed italic mb-8 flex-1">
                  &ldquo;Executing local predictive maintenance models on the Dwapar Box has given us real-time spindle vibration alerts. We caught 3 major bearing breakdowns last month alone, saving over $40k in machine downtime.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-purple/20 flex items-center justify-center font-bold text-brand-purple">
                    RK
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Rajiv Kumar</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">Head of Maintenance, CoreFab Industrial</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 9. FAQ ACCORDION */}
        <section className="px-6 lg:px-16 py-24 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-semibold text-brand-cyan uppercase tracking-[0.2em] mb-3 block">COMMON QUESTIONS</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            
            {[
              {
                q: "What industrial protocols does Dwapar Edge support?",
                a: "Dwapar Edge natively supports OPC-UA, Modbus-TCP, Modbus-RTU, MQTT, EtherNet/IP, Siemens S7, and CAN-bus. Custom adapters can be easily added as Docker containers."
              },
              {
                q: "How does it synchronize with Factory Plus?",
                a: "It integrates natively out of the box. Using our secure Edge Sync Agent, it establishes an encrypted tunnel to your Factory Plus instance, feeding downtime logs, lot outputs, and OEE statuses automatically."
              },
              {
                q: "Can it operate completely offline?",
                a: "Yes. Dwapar Edge runs completely locally. It parses telemetry, computes OEE, executes AI anomaly models, and serves a local floor dashboard entirely without internet. Upon reconnection, it secures and uploads buffered ERP sync events."
              },
              {
                q: "Where is the machine data processed?",
                a: "100% of the raw high-frequency data is processed locally on the edge device hardware. No raw high-speed telemetry is uploaded to the cloud, preserving your internet bandwidth and heavily reducing cloud database costs."
              }
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className={`glass rounded-2xl border transition-all duration-300 ${isOpen ? "border-brand-cyan/40 bg-[#06b6d4]/2" : "border-white/5 hover:border-white/10"}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left py-6 px-8 flex justify-between items-center"
                    id={`faq-btn-${index}`}
                  >
                    <span className="text-sm sm:text-base font-bold text-white">{faq.q}</span>
                    <span className={`text-xl font-mono text-brand-cyan transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"}`}>
                      ＋
                    </span>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[300px] border-t border-white/5" : "max-h-0"}`}
                  >
                    <p className="p-8 text-sm text-gray-400 leading-relaxed bg-[#030712]/40">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </section>

        {/* CTA BOTTOM BANNER */}
        <section className="px-6 lg:px-16 pb-24 max-w-7xl mx-auto">
          <div className="relative glass rounded-3xl p-8 sm:p-16 border border-brand-cyan/20 overflow-hidden shadow-2xl text-center bg-gradient-to-br from-[#070b14] via-[#091124] to-[#040812]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
            
            <span className="font-mono text-xs font-semibold text-brand-cyan uppercase tracking-[0.2em] mb-4 block">READY TO CONNECT?</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-2xl mx-auto">
              Ready to Upgrade Your Factory Floor?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed text-sm sm:text-base">
              Order your Dwapar Edge Starter Kit today. Includes 1x Dwapar Edge Box-1 and native syncing with your Factory Plus workspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm mx-auto">
              <a
                href="#demo"
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-indigo text-black font-bold text-center transition-all hover:scale-[1.02]"
                id="cta-bottom-primary"
              >
                Get Edge Starter Kit
              </a>
              <a
                href="mailto:sales@dwapar.com"
                className="px-6 py-4 rounded-xl border border-white/10 hover:border-brand-cyan/30 hover:bg-white/5 text-white font-semibold text-center transition-all hover:scale-[1.02]"
                id="cta-bottom-secondary"
              >
                Contact Solutions
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* 10. FOOTER */}
      <footer className="glass border-t border-white/5 px-6 lg:px-16 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-cyan to-brand-indigo shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <span className="font-mono text-sm font-black text-black">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-xs font-bold tracking-wider text-white">DWAPAR TECH</span>
              <span className="font-mono text-[8px] text-gray-500 tracking-[0.2em] uppercase">Edge Intelligence</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} Dwapar Technologies. All rights reserved. Powered by Factory Plus.
          </p>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span className="flex items-center gap-1.5 text-[#10b981]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
              All Edge Nodes Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

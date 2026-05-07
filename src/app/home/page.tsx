"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Machine {
  name: string;
  ip: string;
  protocol: string;
  status: "ONLINE" | "STANDBY" | "OFFLINE";
  rate: string;
}

export default function HomeSetupPortal() {
  // Simulator States
  const [cpuTemp, setCpuTemp] = useState<number>(44.1);
  const [cpuLoad, setCpuLoad] = useState<number>(8.2);
  const [ramUsage, setRamUsage] = useState<number>(4.1); // GB used out of 8GB
  const [ingestionRate, setIngestionRate] = useState<number>(2410); // msgs/sec
  const [totalMsgs, setTotalMsgs] = useState<number>(849202);
  const [anomalyScore, setAnomalyScore] = useState<number>(0.025);
  const [tunnelStatus, setTunnelStatus] = useState<"Connected" | "Syncing" | "Offline">("Connected");
  const [uptime, setUptime] = useState<number>(34210); // seconds
  const [pingCloud, setPingCloud] = useState<number>(14.5);

  // Interactive Self-Test States
  const [isSelfTesting, setIsSelfTesting] = useState(false);
  const [selfTestProgress, setSelfTestProgress] = useState(0);
  const [selfTestLogs, setSelfTestLogs] = useState<string[]>([]);
  const [showSelfTestModal, setShowSelfTestModal] = useState(false);

  // Soft Reboot State
  const [isRebooting, setIsRebooting] = useState(false);
  const [rebootLogs, setRebootLogs] = useState<string[]>([]);

  // Machine List
  const [machines, setMachines] = useState<Machine[]>([
    { name: "CNC-Mill-04", ip: "192.168.1.52", protocol: "Modbus-TCP", status: "ONLINE", rate: "1200 hz" },
    { name: "Robotic-Arm-02", ip: "192.168.1.55", protocol: "OPC-UA", status: "ONLINE", rate: "800 hz" },
    { name: "Injection-Mold-12", ip: "192.168.1.58", protocol: "Modbus-TCP", status: "STANDBY", rate: "410 hz" },
    { name: "Conveyor-System-01", ip: "192.168.1.61", protocol: "MQTT", status: "ONLINE", rate: "10 hz" },
  ]);

  // Real-time telemetry simulation
  useEffect(() => {
    if (isRebooting) return;
    const interval = setInterval(() => {
      setCpuTemp((prev) => {
        const base = prev > 50 ? 44.1 : prev;
        const variation = Math.random() * 1.2 - 0.6;
        return Number((base + variation).toFixed(1));
      });
      setCpuLoad((prev) => {
        const variation = Math.random() * 4 - 2;
        return Math.max(3.5, Math.min(32.0, Number((prev + variation).toFixed(1))));
      });
      setRamUsage((prev) => {
        const variation = Math.random() * 0.04 - 0.02;
        return Math.max(3.9, Math.min(4.8, Number((prev + variation).toFixed(2))));
      });
      setIngestionRate((prev) => {
        const variation = Math.floor(Math.random() * 60 - 30);
        return Math.max(2300, Math.min(2500, prev + variation));
      });
      setTotalMsgs((prev) => prev + Math.floor(Math.random() * 12 + 8));
      setAnomalyScore((prev) => {
        const base = 0.025;
        const variation = Math.random() * 0.015 - 0.007;
        return Math.max(0.005, Number((base + variation).toFixed(3)));
      });
      setPingCloud((prev) => Math.max(10.0, Number((14.5 + (Math.random() * 2.0 - 1.0)).toFixed(1))));
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRebooting]);

  // Self-Test Logic
  const handleSelfTest = () => {
    setIsSelfTesting(true);
    setSelfTestProgress(0);
    setShowSelfTestModal(true);
    setSelfTestLogs(["[1/5] Initializing diagnostic loop...", "[1/5] Locking local resource threads..."]);

    setTimeout(() => {
      setSelfTestLogs((prev) => [
        ...prev,
        "[2/5] Checking Network Adapter (eth0)... SUCCESS (1000 Mbps Full Duplex)",
        `[2/5] Querying DNS resolver... Resolved factoryplus.app`,
      ]);
      setSelfTestProgress(25);
    }, 1200);

    setTimeout(() => {
      setSelfTestLogs((prev) => [
        ...prev,
        `[3/5] Ping sweep on Subnet (192.168.1.50-60)...`,
        `      Found ${machines.filter(m => m.status !== "OFFLINE").length} active Modbus/OPC controllers.`,
        `[3/5] Testing register polling speed... SUCCESS (1.2ms local latency)`,
      ]);
      setSelfTestProgress(50);
    }, 2400);

    setTimeout(() => {
      setSelfTestLogs((prev) => [
        ...prev,
        "[4/5] Executing Local Edge AI model sanity test...",
        "      TensorFlow-Lite thread handshake... SUCCESS",
        "      Inference computation benchmark... SUCCESS (1.4ms duration)",
      ]);
      setSelfTestProgress(75);
    }, 3800);

    setTimeout(() => {
      setSelfTestLogs((prev) => [
        ...prev,
        "[5/5] Checking WebSocket tunnel to Factory Plus...",
        "      Active token authorization verified.",
        "      Secure TLS tunnel health... SUCCESS (12.4 ms latency)",
        "🎉 SYSTEM SANITY DIAGNOSTIC SUCCESSFUL!",
      ]);
      setSelfTestProgress(100);
      setIsSelfTesting(false);
    }, 5000);
  };

  // Soft Reboot Logic
  const handleSoftReboot = () => {
    setIsRebooting(true);
    setRebootLogs(["[REBOOT] Initiating soft reload of edge telemetry daemon...", "[REBOOT] Safe-disconnecting active TCP sockets..."]);

    setTimeout(() => {
      setRebootLogs((prev) => [
        ...prev,
        "[REBOOT] Stopping local OPC-UA ingestion thread...",
        "[REBOOT] Stopping local Modbus polling engine...",
        "[REBOOT] Flushing database sync buffer...",
      ]);
    }, 800);

    setTimeout(() => {
      setRebootLogs((prev) => [
        ...prev,
        "[REBOOT] Reloading local configuration parameters...",
        "[REBOOT] Binding network interfaces...",
        "[REBOOT] Re-loading TensorFlow AI anomaly model...",
      ]);
    }, 2000);

    setTimeout(() => {
      setRebootLogs((prev) => [
        ...prev,
        "⚡ Telemetry ingestion daemon re-initialized successfully.",
        "⚡ Establishing secure cloud sync socket...",
        "⚡ System fully online.",
      ]);
      setIsRebooting(false);
    }, 3200);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] dot-overlay overflow-hidden flex flex-col justify-between">
      {/* Background Ambience Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-brand-cyan/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-indigo/6 rounded-full blur-[120px] pointer-events-none" />

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 w-full glass border-b border-white/5 px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan to-brand-indigo shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <span className="font-mono text-lg font-black text-black">D</span>
            <div className="absolute -inset-0.5 animate-ping-slow rounded-xl bg-brand-cyan/20 pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-lg font-bold tracking-wider text-white">DWAPAR</span>
            <span className="font-mono text-[9px] text-brand-cyan tracking-[0.25em] -mt-1 uppercase">EDGE PORTAL</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#10b981]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse" />
            Gateway Online
          </span>
          <span className="font-mono text-xs text-gray-500">DE-GW-098842-X</span>
        </div>
      </header>

      {/* MAIN WORKSPACE GRID */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-8 my-auto">
        
        {/* TOP STATE BAR: ONLINE AND WELCOME */}
        <section className="glass rounded-3xl p-6 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative shadow-2xl overflow-hidden bg-gradient-to-r from-brand-cyan/5 to-transparent">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-mono text-[10px] text-[#10b981] font-bold uppercase tracking-widest">Active Edge Node</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Dwapar Edge Gateway Console
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
              Local shop floor telemetry orchestrator. Collecting raw millisecond signals, running AI predictive maintenance models, and maintaining secure real-time synchronization with your <strong className="text-white">Factory Plus ERP</strong>.
            </p>
          </div>

          <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
            <Link
              href="/setup"
              className="flex-1 md:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-indigo hover:from-brand-cyan/90 hover:to-brand-indigo/90 text-xs font-bold text-black text-center transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              id="dashboard-launch-setup-btn"
            >
              Launch Setup Wizard
            </Link>
          </div>
        </section>

        {/* MIDDLE GRID: METRICS & DIAGNOSTICS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Telemetry Ingestion Card */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4 flex flex-col justify-between relative shadow-lg group hover:border-brand-cyan/30 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Ingestion Stream</span>
              <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
            </div>
            
            <div className="space-y-1">
              <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                {ingestionRate.toLocaleString()} <span className="text-xs text-gray-500 font-normal">msgs/s</span>
              </span>
              <p className="text-[11px] text-gray-400">Total packets parsed: <strong className="text-brand-cyan">{totalMsgs.toLocaleString()}</strong></p>
            </div>

            {/* Sparkline chart visualization */}
            <div className="h-10 w-full bg-black/40 rounded-xl overflow-hidden flex items-center justify-center relative">
              <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
                <path
                  d="M 0 30 Q 20 10 40 25 T 80 15 T 120 30 T 160 10 T 200 20"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="absolute right-2.5 bottom-2 font-mono text-[8px] text-brand-cyan">INGEST ACTIVE</span>
            </div>
          </div>

          {/* Local AI Prediction Card */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4 flex flex-col justify-between relative shadow-lg group hover:border-brand-indigo/30 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Edge AI Diagnostics</span>
              <span className="h-2 w-2 rounded-full bg-brand-indigo" />
            </div>

            <div className="space-y-1">
              <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                SCORE: {anomalyScore}
              </span>
              <p className="text-[11px] text-gray-400">Status: <strong className="text-[#10b981]">Nominal Operation</strong></p>
            </div>

            <div className="space-y-1 font-mono text-[9px] text-gray-500">
              <div className="flex justify-between">
                <span>Vibration Model:</span>
                <span className="text-[#10b981] font-bold">LOADED</span>
              </div>
              <div className="flex justify-between">
                <span>Thermal Friction:</span>
                <span className="text-[#10b981] font-bold">LOADED</span>
              </div>
            </div>
          </div>

          {/* Secure Sync Tunnel Card */}
          <div className="glass p-6 rounded-3xl border border-white/5 space-y-4 flex flex-col justify-between relative shadow-lg group hover:border-brand-purple/30 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider">Factory Plus Tunnel</span>
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
            </div>

            <div className="space-y-1">
              <span className="text-3xl font-extrabold font-mono text-[#10b981] tracking-tight">
                SYNCHRONIZED
              </span>
              <p className="text-[11px] text-gray-400">Tunnel latency: <strong className="text-brand-purple">{pingCloud} ms</strong></p>
            </div>

            <div className="space-y-1 font-mono text-[9px] text-gray-500">
              <div className="flex justify-between">
                <span>Data Reduction Rate:</span>
                <span className="text-white font-bold">96.4%</span>
              </div>
              <div className="flex justify-between">
                <span>Encrypted Socket:</span>
                <span className="text-white font-bold">TLS 1.3</span>
              </div>
            </div>
          </div>

        </section>

        {/* BOTTOM HALF GRID: SYSTEM HARDWARE & MACHINE STATS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Subnet Discovered Machines (Takes 7 columns) */}
          <div className="lg:col-span-7 glass p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase flex items-center gap-2">
              <span>🏭</span> Discovered Local Subnet Machines
            </h3>
            
            <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/20">
              <div className="bg-white/5 px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider grid grid-cols-12">
                <span className="col-span-4">Machine Name</span>
                <span className="col-span-3">IP Address</span>
                <span className="col-span-3">Protocol</span>
                <span className="col-span-2 text-right">State</span>
              </div>
              <div className="divide-y divide-white/5 font-sans text-xs">
                {machines.map((m, idx) => (
                  <div key={idx} className="px-4 py-3.5 grid grid-cols-12 items-center hover:bg-white/2 transition-colors">
                    <span className="col-span-4 font-bold text-white">{m.name}</span>
                    <span className="col-span-3 font-mono text-[11px] text-gray-400">{m.ip}</span>
                    <span className="col-span-3 font-mono text-[11px] text-gray-400">{m.protocol} <span className="text-[9px] text-gray-600">({m.rate})</span></span>
                    <span className="col-span-2 text-right">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                        m.status === "ONLINE"
                          ? "bg-[#10b981]/15 text-[#10b981]"
                          : m.status === "STANDBY"
                            ? "bg-[#fbbf24]/15 text-[#fbbf24]"
                            : "bg-[#ef4444]/15 text-[#ef4444]"
                      }`}>
                        {m.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Local Hardware Resources (Takes 5 columns) */}
          <div className="lg:col-span-5 glass p-6 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
            <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase flex items-center gap-2">
              <span>⚙️</span> Local Edge Hardware Health
            </h3>

            {/* Metrics */}
            <div className="space-y-4 text-xs font-mono">
              
              <div className="space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>CPU Intel Core i5 Load:</span>
                  <span className="text-white font-bold">{cpuLoad}%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-cyan rounded-full transition-all duration-300" style={{ width: `${cpuLoad}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Memory RAM Utilization:</span>
                  <span className="text-white font-bold">{ramUsage} GB / 8GB</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-indigo rounded-full transition-all duration-300" style={{ width: `${(ramUsage / 8) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Chassis Core Temperature:</span>
                  <span className="text-brand-cyan font-bold">{cpuTemp}°C</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full transition-all duration-300" style={{ width: `${(cpuTemp / 90) * 100}%` }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Local Database Buffer:</span>
                  <span className="text-white font-bold">12.4 GB / 32GB</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-purple rounded-full transition-all duration-300" style={{ width: `${(12.4 / 32) * 100}%` }} />
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* QUICK CONTROL TOOLS PANEL */}
        <section className="glass p-6 rounded-3xl border border-white/10 space-y-4 shadow-2xl">
          <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase flex items-center gap-2 border-b border-white/5 pb-3">
            <span>🛠️</span> Local Node Maintenance S7 Tools
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <button
              onClick={handleSelfTest}
              disabled={isSelfTesting || isRebooting}
              className="py-3 px-4 rounded-xl border border-white/5 bg-white/2 text-xs font-bold text-brand-cyan hover:bg-white/5 hover:border-brand-cyan/40 transition-all flex items-center justify-center gap-2 font-mono"
              id="maint-self-test-btn"
            >
              {isSelfTesting ? (
                <>
                  <span className="animate-spin h-3 w-3 border-2 border-brand-cyan border-t-transparent rounded-full" />
                  Testing Threads...
                </>
              ) : (
                "⚡ Run Node Diagnostics Test"
              )}
            </button>

            <button
              onClick={handleSoftReboot}
              disabled={isSelfTesting || isRebooting}
              className="py-3 px-4 rounded-xl border border-white/5 bg-white/2 text-xs font-bold text-brand-indigo hover:bg-white/5 hover:border-brand-indigo/40 transition-all flex items-center justify-center gap-2 font-mono"
              id="maint-reboot-btn"
            >
              {isRebooting ? (
                <>
                  <span className="animate-spin h-3 w-3 border-2 border-brand-indigo border-t-transparent rounded-full" />
                  Reloading Daemon...
                </>
              ) : (
                "🔄 Soft Reboot Telemetry Daemon"
              )}
            </button>

            <a
              href="data:text/json;charset=utf-8,{}"
              download="dwapar_edge_config_backup.json"
              className="py-3 px-4 rounded-xl border border-white/5 bg-white/2 text-xs font-bold text-gray-300 text-center hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2 font-mono"
              id="maint-backup-btn"
            >
              📥 Backup Local Configuration JSON
            </a>

          </div>

          {/* Interactive reboot logs output */}
          {rebootLogs.length > 0 && (
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-[10px] leading-5 text-gray-400 space-y-1 animate-float-delayed">
              {rebootLogs.map((log, idx) => (
                <div key={idx} className={log.includes("⚡") ? "text-[#10b981] font-semibold" : ""}>
                  {log}
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* DIAGNOSTIC SELF-TEST MODAL OVERLAY */}
      {showSelfTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="w-full max-w-lg glass rounded-3xl border border-brand-cyan/30 p-6 md:p-8 space-y-6 relative shadow-[0_0_50px_rgba(6,182,212,0.15)] animate-float">
            
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2 font-mono">
                <span className="p-1 rounded-lg bg-brand-cyan/10 text-brand-cyan">⚙️</span>
                Node Sanity Diagnostics Loop
              </h4>
              <button
                onClick={() => !isSelfTesting && setShowSelfTestModal(false)}
                disabled={isSelfTesting}
                className={`text-gray-500 hover:text-white transition-colors text-lg font-mono ${
                  isSelfTesting ? "opacity-20 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between font-mono text-xs text-gray-400">
                <span>Progress:</span>
                <span className="text-brand-cyan font-bold">{selfTestProgress}%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-brand-cyan rounded-full transition-all duration-300" style={{ width: `${selfTestProgress}%` }} />
              </div>

              <div className="p-4 rounded-2xl bg-[#030712] border border-white/5 h-[180px] overflow-y-auto font-mono text-[11px] leading-5 text-gray-400 space-y-1.5 scrollbar-thin">
                {selfTestLogs.map((log, idx) => (
                  <div key={idx} className={log.includes("🎉") ? "text-[#10b981] font-bold" : log.includes("SUCCESS") ? "text-brand-cyan" : ""}>
                    {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/5">
              <button
                onClick={() => setShowSelfTestModal(false)}
                disabled={isSelfTesting}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelfTesting
                    ? "bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed"
                    : "bg-brand-cyan text-black hover:scale-[1.02]"
                }`}
              >
                Close Diagnostic Portal
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER NAVBAR COLO-BAR */}
      <footer className="glass border-t border-white/5 px-6 lg:px-16 py-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-indigo flex items-center justify-center font-bold text-black text-xs">
              D
            </div>
            <span className="font-mono text-[9px] text-gray-500 uppercase">Dwapar Edge Gateway local Console portal</span>
          </div>
          <span className="text-[9px] font-mono text-gray-500">
            &copy; {new Date().getFullYear()} Dwapar Technologies. Authorized for Factory Plus Shop Floor Integration.
          </span>
        </div>
      </footer>
    </div>
  );
}

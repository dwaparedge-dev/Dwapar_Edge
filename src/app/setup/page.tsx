"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface DiscoveredMachine {
  id: string;
  name: string;
  ip: string;
  protocol: string;
  status: "Connected" | "Offline";
  selected: boolean;
}

export default function SetupPage() {
  // Wizard active step: 1 = Network, 2 = Factory Plus, 3 = Ingestion, 4 = Edge AI, 5 = Finalize, 6 = Active Dashboard
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Live Hardware Telemetry Simulator
  const [cpuTemp, setCpuTemp] = useState<number>(42.5);
  const [ramUsage, setRamUsage] = useState<number>(3.8); // GB used out of 8GB
  const [sysUptime, setSysUptime] = useState<number>(1284); // seconds
  const [pingPlc, setPingPlc] = useState<number>(1.2); // ms
  const [pingCloud, setPingCloud] = useState<number>(14.5); // ms

  // Form States
  // Step 1: Network
  const [netInterface, setNetInterface] = useState<"ethernet" | "wifi">("ethernet");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [ipType, setIpType] = useState<"dhcp" | "static">("dhcp");
  const [staticIp, setStaticIp] = useState("192.168.1.142");
  const [subnetMask, setSubnetMask] = useState("255.255.255.0");
  const [gateway, setGateway] = useState("192.168.1.1");
  const [dns, setDns] = useState("8.8.8.8");
  const [isNetTesting, setIsNetTesting] = useState(false);
  const [netTestLogs, setNetTestLogs] = useState<string[]>([]);
  const [netTestSuccess, setNetTestSuccess] = useState<boolean | null>(null);

  // Step 2: Factory Plus Link
  const [fpUrl, setFpUrl] = useState("https://dwapar-industries.factoryplus.app");
  const [fpApiKey, setFpApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [deviceLocation, setDeviceLocation] = useState("Assembly Line - Floor 2");
  const [isFpLinking, setIsFpLinking] = useState(false);
  const [fpLinkLogs, setFpLinkLogs] = useState<string[]>([]);
  const [fpLinkSuccess, setFpLinkSuccess] = useState<boolean | null>(null);

  // Step 3: Ingestion & Discovery
  const [protocols, setProtocols] = useState({
    opcUa: true,
    modbusTcp: true,
    mqtt: false,
    ethernetIp: false,
  });
  const [opcEndpoint, setOpcEndpoint] = useState("opc.tcp://192.168.1.50:4840");
  const [modbusSubnet, setModbusSubnet] = useState("192.168.1.50-60");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [discoveredMachines, setDiscoveredMachines] = useState<DiscoveredMachine[]>([
    { id: "1", name: "CNC-Mill-04", ip: "192.168.1.52", protocol: "Modbus-TCP", status: "Connected", selected: true },
    { id: "2", name: "Robotic-Arm-02", ip: "192.168.1.55", protocol: "OPC-UA", status: "Connected", selected: true },
    { id: "3", name: "Injection-Mold-12", ip: "192.168.1.58", protocol: "Modbus-TCP", status: "Connected", selected: false },
  ]);

  // Step 4: Edge AI Activation
  const [loadedModels, setLoadedModels] = useState({
    vibration: true,
    thermal: true,
    current: false,
  });
  const [anomalyThreshold, setAnomalyThreshold] = useState<number>(0.85);

  // Step 5: Finalize Activation
  const [isActivating, setIsActivating] = useState(false);
  const [activationProgress, setActivationProgress] = useState(0);
  const [activationLog, setActivationLog] = useState<string[]>([]);

  // Step 6: Active Running Dashboard
  const [dashboardIsIngesting, setDashboardIsIngesting] = useState(true);
  const [dashboardLogs, setDashboardLogs] = useState<string[]>([
    "[SYSTEM] Tunnel established: secure-ws://dwapar-industries.factoryplus.app/edge-gateway/v2",
    "[SYSTEM] Local database buffer initialized (Capacity: 60 Days)",
    "[INGEST] CNC-Mill-04 vibration telemetry incoming (100Hz)...",
    "[INGEST] Robotic-Arm-02 joint temperature incoming (50Hz)...",
  ]);
  const [dashboardMsgCount, setDashboardMsgCount] = useState(148);
  const [dashboardAnomalyTriggered, setDashboardAnomalyTriggered] = useState(false);

  // Keep simulated telemetry going in the background
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuTemp((prev) => {
        const base = currentStep === 6 ? (dashboardAnomalyTriggered ? 58.4 : 48.2) : 42.5;
        const offset = Math.random() * 1.6 - 0.8;
        return Number((base + offset).toFixed(1));
      });
      setRamUsage((prev) => {
        const base = currentStep === 6 ? 5.2 : 3.8;
        const offset = Math.random() * 0.1 - 0.05;
        return Number((base + offset).toFixed(2));
      });
      setSysUptime((prev) => prev + 1);
      setPingPlc((prev) => Math.max(0.8, Number((1.2 + (Math.random() * 0.4 - 0.2)).toFixed(1))));
      setPingCloud((prev) => Math.max(10.0, Number((14.5 + (Math.random() * 2.0 - 1.0)).toFixed(1))));
    }, 1500);
    return () => clearInterval(interval);
  }, [currentStep, dashboardAnomalyTriggered]);

  // Handle network testing simulation
  const handleNetTest = () => {
    setIsNetTesting(true);
    setNetTestSuccess(null);
    setNetTestLogs(["[1/3] Initializing network adapter...", "[1/3] Querying DHCP server for IP assignment..."]);
    
    setTimeout(() => {
      const assignedIp = ipType === "dhcp" ? "192.168.1.142" : staticIp;
      setNetTestLogs((prev) => [
        ...prev,
        `[2/3] Success! IP Address assigned: ${assignedIp}`,
        `[2/3] Checking default gateway connectivity to ${gateway}...`,
      ]);
    }, 1000);

    setTimeout(() => {
      setNetTestLogs((prev) => [
        ...prev,
        "[3/3] Gateway ping successful! (0.8ms average)",
        "[3/3] Performing DNS lookup check on factoryplus.app...",
        "[3/3] DNS query successful. Resolving cloud servers...",
      ]);
    }, 2000);

    setTimeout(() => {
      setNetTestLogs((prev) => [...prev, "🎉 Network Configuration Valid & Verified!"]);
      setIsNetTesting(false);
      setNetTestSuccess(true);
      if (!completedSteps.includes(1)) {
        setCompletedSteps((prev) => [...prev, 1]);
      }
    }, 3000);
  };

  // Handle Factory Plus link handshaking simulation
  const handleFpLink = () => {
    if (!fpApiKey) {
      alert("Please enter your Factory Plus API token to authenticate.");
      return;
    }
    setIsFpLinking(true);
    setFpLinkSuccess(null);
    setFpLinkLogs([
      "[1/3] Resolving Factory Plus tenant endpoint...",
      `[1/3] Initiating secure handshake with: ${fpUrl}`,
    ]);

    setTimeout(() => {
      setFpLinkLogs((prev) => [
        ...prev,
        "[2/3] Secure SSL handshake successful.",
        "[2/3] Transmitting cryptographically signed API Token validation request...",
      ]);
    }, 1000);

    setTimeout(() => {
      setFpLinkLogs((prev) => [
        ...prev,
        "[3/3] Token authorized. Organization profile parsed:",
        "      Tenant Name: Dwapar Industries (Gujarat Branch)",
        `      Node Registered: ${deviceLocation}`,
        "[3/3] Establishing secure WebSockets tunnel for real-time synchronization...",
      ]);
    }, 2200);

    setTimeout(() => {
      setFpLinkLogs((prev) => [...prev, "🎉 Sync Authorization Successful! Ready for telemetry bindings."]);
      setIsFpLinking(false);
      setFpLinkSuccess(true);
      if (!completedSteps.includes(2)) {
        setCompletedSteps((prev) => [...prev, 2]);
      }
    }, 3200);
  };

  // Handle network scanning simulation
  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs(["[1/4] Starting local network sweep...", `[1/4] Scanning range: ${modbusSubnet} (Modbus-TCP:502)`]);

    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    setTimeout(() => {
      setScanLogs((prev) => [
        ...prev,
        "[2/4] Broad subnet ARP sweep active...",
        `[2/4] Querying OPC-UA server at: ${opcEndpoint}`,
      ]);
    }, 800);

    setTimeout(() => {
      setScanLogs((prev) => [
        ...prev,
        "[3/4] Modbus register handshakes received from 192.168.1.52 (CNC-Mill-04).",
        "[3/4] OPC-UA nodes cataloged from 192.168.1.55 (Robotic-Arm-02).",
      ]);
    }, 1800);

    setTimeout(() => {
      setScanLogs((prev) => [
        ...prev,
        "[4/4] Completed sweep! Discovered 3 industrial machines.",
        "      Active Telemetry detected on CNC-Mill-04 and Robotic-Arm-02.",
      ]);
      setIsScanning(false);
      if (!completedSteps.includes(3)) {
        setCompletedSteps((prev) => [...prev, 3]);
      }
    }, 3000);
  };

  // Toggle machine selection
  const toggleMachine = (id: string) => {
    setDiscoveredMachines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, selected: !m.selected } : m))
    );
  };

  // Handle Edge AI confirmation
  const saveAiSettings = () => {
    if (!completedSteps.includes(4)) {
      setCompletedSteps((prev) => [...prev, 4]);
    }
    setCurrentStep(5);
  };

  // Handle Grand Final Activation sequence
  const handleFinalActivation = () => {
    setIsActivating(true);
    setActivationProgress(0);
    setActivationLog(["[SYSTEM] Starting localized activation protocols...", "[SYSTEM] Building containerized sync client..."]);

    const actInterval = setInterval(() => {
      setActivationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(actInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    setTimeout(() => {
      setActivationLog((prev) => [
        ...prev,
        "[SYSTEM] Storing local encrypted credentials in keystore...",
        "[SYSTEM] Compiling local database schemas...",
      ]);
    }, 600);

    setTimeout(() => {
      setActivationLog((prev) => [
        ...prev,
        "[SERVICES] Launching Local OPC-UA Ingestion Driver...",
        "[SERVICES] Launching Local Modbus-TCP Polling Daemon...",
        `[SERVICES] Subscribed to ${discoveredMachines.filter(m => m.selected).length} discovered machines.`,
      ]);
    }, 1400);

    setTimeout(() => {
      setActivationLog((prev) => [
        ...prev,
        "[MODELS] Injecting local TensorFlow-Lite Edge models...",
        `[MODELS] Anomaly alert trigger score threshold locked to ${anomalyThreshold}`,
      ]);
    }, 2200);

    setTimeout(() => {
      setActivationLog((prev) => [
        ...prev,
        "[TUNNEL] Testing bi-directional WebSockets sync connection...",
        "[TUNNEL] Handshake confirmed. Device online status updated in Factory Plus.",
      ]);
    }, 2800);

    setTimeout(() => {
      setActivationLog((prev) => [
        ...prev,
        "⚡ ALL SERVICES OPERATIONAL.",
        "⚡ LAUNCHING LIVE MANAGEMENT CONSOLE...",
      ]);
    }, 3300);

    setTimeout(() => {
      setIsActivating(false);
      if (!completedSteps.includes(5)) {
        setCompletedSteps((prev) => [...prev, 5]);
      }
      setCurrentStep(6); // Launch live console dashboard
    }, 3700);
  };

  // Active Dashboard Telemetry Generator
  useEffect(() => {
    if (currentStep !== 6 || !dashboardIsIngesting) return;
    const interval = setInterval(() => {
      const protocolsList = ["OPC-UA", "Modbus-TCP"];
      const machinesList = ["CNC-Mill-04", "Robotic-Arm-02"];
      const paramsList = ["vibration", "temperature", "spindle_speed", "vibration"];

      const proto = protocolsList[Math.floor(Math.random() * protocolsList.length)];
      const mach = machinesList[Math.floor(Math.random() * machinesList.length)];
      const param = paramsList[Math.floor(Math.random() * paramsList.length)];

      let value = "";
      if (param === "vibration") {
        value = dashboardAnomalyTriggered 
          ? (4.85 + Math.random() * 1.5).toFixed(2) + " mm/s (HIGH ANOMALY)"
          : (0.42 + Math.random() * 0.15).toFixed(2) + " mm/s";
      } else if (param === "temperature") {
        value = dashboardAnomalyTriggered
          ? (89.2 + Math.random() * 6.5).toFixed(1) + " °C"
          : (41.5 + Math.random() * 1.8).toFixed(1) + " °C";
      } else if (param === "spindle_speed") {
        value = (1180 + Math.random() * 80).toFixed(0) + " RPM";
      }

      const timestamp = new Date().toTimeString().split(" ")[0];
      let logLine = `[${timestamp}] [${proto}] ${mach} -> ${param}: ${value}`;

      if (dashboardAnomalyTriggered && (param === "vibration" || param === "temperature")) {
        logLine = `🚨 [${timestamp}] [ALERT] [Edge-AI] CRITICAL ANOMALY: ${mach} ${param} exceeded threshold! Score: ${(0.86 + Math.random() * 0.1).toFixed(3)} | Syncing Downtime Event to Factory Plus...`;
      }

      setDashboardLogs((prev) => [logLine, ...prev.slice(0, 11)]);
      setDashboardMsgCount((c) => c + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStep, dashboardIsIngesting, dashboardAnomalyTriggered]);

  return (
    <div className="relative min-h-screen bg-[#030712] dot-overlay overflow-hidden flex flex-col justify-between">
      {/* Background Ambience Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-cyan/6 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-indigo/5 rounded-full blur-[130px] pointer-events-none" />

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 w-full glass border-b border-white/5 px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan to-brand-indigo shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <span className="font-mono text-lg font-black text-black">D</span>
          </Link>
          <div className="flex flex-col">
            <span className="font-sans text-md font-bold tracking-wider text-white">DWAPAR</span>
            <span className="font-mono text-[9px] text-brand-cyan tracking-[0.25em] -mt-1 uppercase">EDGE NODE SETUP</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-brand-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
            Serial: DE-GW-098842-X
          </span>
          <Link href="/" className="px-3.5 py-1.5 text-xs font-semibold text-gray-400 hover:text-white border border-white/5 hover:border-white/20 rounded-xl transition-all">
            Return Home
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        
        {/* LEFT COLUMN: ACTIVE DIAGNOSTICS & SYSTEM MONITOR */}
        <aside className="lg:col-span-4 glass rounded-3xl p-6 border border-white/10 flex flex-col gap-6 w-full shadow-2xl relative">
          <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase flex items-center gap-2 border-b border-white/5 pb-4">
            <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
            Hardware Node Diagnostics
          </h3>

          {/* System Spec items */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-gray-500">Firmware</span>
              <span className="text-xs font-bold font-mono text-white">v2.4.1-LTS</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-gray-500">CPU Load</span>
              <span className="text-xs font-bold font-mono text-white">{currentStep === 6 ? "14.2%" : "4.5%"}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-gray-500">CPU Temp</span>
              <span className="text-xs font-bold font-mono text-brand-cyan">{cpuTemp}°C</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase text-gray-500">Memory</span>
              <span className="text-xs font-bold font-mono text-brand-indigo">{ramUsage} GB / 8GB</span>
            </div>
          </div>

          {/* Uptime and local clock details */}
          <div className="space-y-3 font-mono text-[11px] text-gray-400 p-4 bg-black/30 rounded-2xl border border-white/5">
            <div className="flex justify-between">
              <span>Local Network IP:</span>
              <span className="text-white">{netTestSuccess ? "192.168.1.142" : "Unassigned"}</span>
            </div>
            <div className="flex justify-between">
              <span>System Uptime:</span>
              <span className="text-white">{Math.floor(sysUptime / 60)}m {sysUptime % 60}s</span>
            </div>
            <div className="flex justify-between">
              <span>Factory Sync Status:</span>
              <span className={`font-semibold ${currentStep === 6 ? "text-[#10b981]" : fpLinkSuccess ? "text-brand-cyan" : "text-gray-500"}`}>
                {currentStep === 6 ? "ONLINE (TUNNEL)" : fpLinkSuccess ? "READY TO INGEST" : "UNLINKED"}
              </span>
            </div>
          </div>

          {/* Local Latency monitor */}
          <div className="p-4 rounded-2xl border border-white/5 bg-white/2">
            <span className="text-[10px] font-mono uppercase text-gray-500 block mb-2 tracking-wider">Interface Ping Latency</span>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-400">Local PLC Link (Modbus):</span>
                <span className="text-brand-cyan font-bold">{pingPlc} ms</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-brand-cyan rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (pingPlc / 5) * 100)}%` }} />
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <span className="text-gray-400">Factory Plus Cloud (Secure):</span>
                <span className="text-brand-indigo font-bold">{pingCloud} ms</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <div className="h-full bg-brand-indigo rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (pingCloud / 50) * 100)}%` }} />
              </div>
            </div>
          </div>

          {/* Stepper overview of onboarding */}
          <div className="border-t border-white/5 pt-4 flex flex-col gap-2.5">
            <span className="text-[10px] font-mono uppercase text-gray-500 block mb-1 tracking-wider">Setup Stepper Progress</span>
            {[
              { num: 1, label: "Network Connectivity" },
              { num: 2, label: "Factory Plus Link" },
              { num: 3, label: "Ingestion & Scan" },
              { num: 4, label: "Edge AI Configuration" },
              { num: 5, label: "Final Activation" },
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isCompleted = completedSteps.includes(step.num) || currentStep > step.num;
              return (
                <div
                  key={step.num}
                  onClick={() => currentStep < 6 && step.num <= Math.max(...completedSteps, 1) + 1 && setCurrentStep(step.num)}
                  className={`flex items-center gap-3 py-2 px-3 rounded-xl transition-all ${
                    currentStep === 6 ? "opacity-50 pointer-events-none" : "cursor-pointer"
                  } ${
                    isActive
                      ? "bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"
                      : isCompleted
                        ? "text-[#10b981] hover:bg-white/5"
                        : "text-gray-500 hover:text-gray-400"
                  }`}
                >
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border ${
                    isActive
                      ? "border-brand-cyan bg-brand-cyan text-black"
                      : isCompleted
                        ? "border-[#10b981] bg-[#10b981]/10 text-[#10b981]"
                        : "border-gray-800"
                  }`}>
                    {isCompleted ? "✓" : step.num}
                  </span>
                  <span className="text-xs font-semibold">{step.label}</span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* RIGHT COLUMN: INTERACTIVE WIZARD OR CONSOLE DYNAMICS */}
        <section className="lg:col-span-8 glass rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl relative flex flex-col gap-6 min-h-[580px] w-full justify-between">
          
          {/* STEP 1: NETWORK SETUP */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">Step 01 of 05</span>
                <h2 className="text-2xl font-bold text-white">Configure Local Gateway Network</h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Establish an active local area connection so the Dwapar Edge Node can interface with shop floor devices and safely sync with cloud servers.
                </p>
              </div>

              {/* Interface Select buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setNetInterface("ethernet")}
                  className={`py-3.5 px-4 rounded-2xl font-semibold text-xs border transition-all flex items-center justify-center gap-2 ${
                    netInterface === "ethernet"
                      ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan"
                      : "bg-white/2 border-white/5 text-gray-400 hover:bg-white/5"
                  }`}
                >
                  🌐 Physical Ethernet (eth0)
                </button>
                <button
                  onClick={() => setNetInterface("wifi")}
                  className={`py-3.5 px-4 rounded-2xl font-semibold text-xs border transition-all flex items-center justify-center gap-2 ${
                    netInterface === "wifi"
                      ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan"
                      : "bg-white/2 border-white/5 text-gray-400 hover:bg-white/5"
                  }`}
                >
                  📶 Wireless Wi-Fi (wlan0)
                </button>
              </div>

              {/* WI-FI FIELDS */}
              {netInterface === "wifi" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/2 border border-white/5 animate-float-delayed">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-gray-400 font-semibold">SSID / Network Name</label>
                    <input
                      type="text"
                      placeholder="dwapar-factory-secure"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs focus:border-brand-cyan outline-none font-mono text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-gray-400 font-semibold">WPA2 Secret Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••••"
                      value={wifiPass}
                      onChange={(e) => setWifiPass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs focus:border-brand-cyan outline-none font-mono text-white"
                    />
                  </div>
                </div>
              )}

              {/* ETHERNET IP FIELDS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-xs font-mono text-gray-300">IP Allocation Method</span>
                  <div className="flex bg-black/40 rounded-xl p-1 border border-white/5">
                    <button
                      onClick={() => setIpType("dhcp")}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase transition-all ${
                        ipType === "dhcp" ? "bg-brand-cyan text-black font-bold" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      DHCP Auto
                    </button>
                    <button
                      onClick={() => setIpType("static")}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase transition-all ${
                        ipType === "static" ? "bg-brand-cyan text-black font-bold" : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Static IP
                    </button>
                  </div>
                </div>

                {ipType === "static" && (
                  <div className="grid grid-cols-2 gap-4 animate-float-delayed">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-gray-500">IP ADDRESS</label>
                      <input
                        type="text"
                        value={staticIp}
                        onChange={(e) => setStaticIp(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:border-brand-cyan outline-none font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-gray-500">SUBNET MASK</label>
                      <input
                        type="text"
                        value={subnetMask}
                        onChange={(e) => setSubnetMask(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:border-brand-cyan outline-none font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-gray-500">GATEWAY ROUTER</label>
                      <input
                        type="text"
                        value={gateway}
                        onChange={(e) => setGateway(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:border-brand-cyan outline-none font-mono"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-gray-500">PRIMARY DNS</label>
                      <input
                        type="text"
                        value={dns}
                        onChange={(e) => setDns(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:border-brand-cyan outline-none font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* TEST PING TERMINAL */}
              <div className="space-y-3">
                <button
                  onClick={handleNetTest}
                  disabled={isNetTesting}
                  className="w-full py-3 px-4 rounded-xl font-mono text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-brand-cyan flex items-center justify-center gap-2 transition-all"
                  id="net-test-btn"
                >
                  {isNetTesting ? (
                    <>
                      <span className="animate-spin h-3.5 w-3.5 border-2 border-brand-cyan border-t-transparent rounded-full" />
                      Testing Local Interfaces...
                    </>
                  ) : (
                    "⚡ Save & Test Connection Link"
                  )}
                </button>

                {netTestLogs.length > 0 && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-[11px] leading-5 text-gray-400 space-y-1">
                    {netTestLogs.map((log, idx) => (
                      <div key={idx} className={log.includes("🎉") ? "text-[#10b981] font-semibold" : log.includes("assigned") ? "text-brand-cyan" : ""}>
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: FACTORY PLUS LINK */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">Step 02 of 05</span>
                <h2 className="text-2xl font-bold text-white">Authorize Factory Plus Link</h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Bridge this localized physical edge box with your Factory Plus manufacturing workspace to synchronise lot parameters and machine OEE metrics.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-gray-400 font-semibold">Factory Plus Tenant URL</label>
                  <input
                    type="url"
                    value={fpUrl}
                    onChange={(e) => setFpUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs focus:border-brand-indigo outline-none font-mono text-white"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-mono uppercase text-gray-400 font-semibold">Gateway Sync API Access Token</label>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-[10px] font-mono text-brand-indigo hover:underline"
                    >
                      {showApiKey ? "Hide Key" : "Reveal Key"}
                    </button>
                  </div>
                  <input
                    type={showApiKey ? "text" : "password"}
                    placeholder="fp_live_edge_ae879024fbc11bc8..."
                    value={fpApiKey}
                    onChange={(e) => setFpApiKey(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs focus:border-brand-indigo outline-none font-mono text-white"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-gray-400 font-semibold">Gateway Floor Location</label>
                  <input
                    type="text"
                    value={deviceLocation}
                    onChange={(e) => setDeviceLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs focus:border-brand-indigo outline-none font-mono text-white"
                  />
                </div>
              </div>

              {/* TEST SYNC LINK */}
              <div className="space-y-3">
                <button
                  onClick={handleFpLink}
                  disabled={isFpLinking}
                  className="w-full py-3 px-4 rounded-xl font-mono text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-brand-indigo flex items-center justify-center gap-2 transition-all"
                  id="fp-link-btn"
                >
                  {isFpLinking ? (
                    <>
                      <span className="animate-spin h-3.5 w-3.5 border-2 border-brand-indigo border-t-transparent rounded-full" />
                      Testing Tunnel Authorization...
                    </>
                  ) : (
                    "🔒 Handshake & Authenticate Edge Node"
                  )}
                </button>

                {fpLinkLogs.length > 0 && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-[11px] leading-5 text-gray-400 space-y-1">
                    {fpLinkLogs.map((log, idx) => (
                      <div key={idx} className={log.includes("🎉") ? "text-[#10b981] font-semibold" : log.includes("Tenant Name:") ? "text-brand-indigo" : ""}>
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: PROTOCOL & MACHINE DISCOVERY */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">Step 03 of 05</span>
                <h2 className="text-2xl font-bold text-white">Ingestion Protocols & Discovery</h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Toggle the industrial protocols used on your shop floor and perform an automated network discovery sweep to detect connected PLCs.
                </p>
              </div>

              {/* Protocol Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { key: "opcUa", label: "OPC-UA", desc: "Tag subscriptions" },
                  { key: "modbusTcp", label: "Modbus-TCP", desc: "Register polls" },
                  { key: "mqtt", label: "MQTT Broker", desc: "JSON Pub/Sub" },
                  { key: "ethernetIp", label: "EtherNet/IP", desc: "Allen-Bradley" },
                ].map((item) => (
                  <div
                    key={item.key}
                    onClick={() => setProtocols(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof protocols] }))}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                      protocols[item.key as keyof typeof protocols]
                        ? "bg-brand-cyan/10 border-brand-cyan text-brand-cyan"
                        : "bg-white/2 border-white/5 text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    <span className="text-xs font-bold font-mono">{item.label}</span>
                    <span className="text-[9px] text-gray-500 font-mono">{item.desc}</span>
                  </div>
                ))}
              </div>

              {/* Protocol Specific Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {protocols.opcUa && (
                  <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/2 border border-white/5 animate-float-delayed">
                    <label className="text-[9px] font-mono uppercase text-gray-400">OPC-UA Endpoint Server</label>
                    <input
                      type="text"
                      value={opcEndpoint}
                      onChange={(e) => setOpcEndpoint(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono outline-none focus:border-brand-cyan text-white"
                    />
                  </div>
                )}
                {protocols.modbusTcp && (
                  <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-white/2 border border-white/5 animate-float-delayed">
                    <label className="text-[9px] font-mono uppercase text-gray-400">Modbus-TCP IP Range Search</label>
                    <input
                      type="text"
                      value={modbusSubnet}
                      onChange={(e) => setModbusSubnet(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono outline-none focus:border-brand-cyan text-white"
                    />
                  </div>
                )}
              </div>

              {/* SCAN CONTROLS */}
              <div className="space-y-4">
                <button
                  onClick={handleScan}
                  disabled={isScanning}
                  className="w-full py-3 px-4 rounded-xl font-mono text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-brand-cyan flex items-center justify-center gap-2 transition-all"
                  id="scan-btn"
                >
                  {isScanning ? (
                    <>
                      <span className="animate-spin h-3.5 w-3.5 border-2 border-brand-cyan border-t-transparent rounded-full" />
                      Performing Active Subnet Sweep ({scanProgress}%)
                    </>
                  ) : (
                    "🔍 Discover Local Shop-Floor Machines"
                  )}
                </button>

                {/* Loading bar for scanning */}
                {isScanning && (
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-cyan rounded-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                  </div>
                )}

                {scanLogs.length > 0 && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-[11px] leading-5 text-gray-400 space-y-1.5">
                    {scanLogs.map((log, idx) => (
                      <div key={idx} className={log.includes("Discovered") ? "text-brand-cyan font-semibold" : ""}>
                        {log}
                      </div>
                    ))}
                  </div>
                )}

                {/* Discovered machine list table */}
                {!isScanning && scanLogs.length > 0 && (
                  <div className="border border-white/5 rounded-2xl overflow-hidden animate-float-delayed bg-black/20">
                    <div className="bg-white/5 px-4 py-2.5 font-mono text-[10px] text-gray-500 uppercase tracking-wider flex justify-between">
                      <span>Machine Name & IP Address</span>
                      <span>Protocol & Selection</span>
                    </div>
                    <div className="divide-y divide-white/5">
                      {discoveredMachines.map((m) => (
                        <div key={m.id} className="px-4 py-3 flex items-center justify-between text-xs">
                          <div className="flex flex-col">
                            <span className="font-bold text-white font-sans">{m.name}</span>
                            <span className="font-mono text-[10px] text-gray-500">{m.ip}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400">{m.protocol}</span>
                            <input
                              type="checkbox"
                              checked={m.selected}
                              onChange={() => toggleMachine(m.id)}
                              className="h-4.5 w-4.5 rounded border-white/10 text-brand-cyan bg-black/40 focus:ring-brand-cyan focus:ring-offset-0 cursor-pointer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: EDGE AI CONFIGURATION */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">Step 04 of 05</span>
                <h2 className="text-2xl font-bold text-white">Local Edge AI Predictor Toggles</h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Activate localized deep learning models to predict bearing failure, spindle friction, and thermal fatigue directly on the device with zero cloud latency.
                </p>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block">Available Local Models</span>
                {[
                  { key: "vibration", label: "Spindle Vibration Defect Model v1.4", desc: "Analyzes high-speed Modbus sensor frequencies to spot bearings fatigue.", time: "Infer Time: 1.2ms" },
                  { key: "thermal", label: "Thermal Friction Signature Model v2.1", desc: "Monitors heat spikes vs rotation parameters to identify lack of lube.", time: "Infer Time: 0.8ms" },
                  { key: "current", label: "Current-Draw Fatigue Spike Model v1.0", desc: "Correlates power draws to mechanical work loads to detect motor drag.", time: "Infer Time: 2.1ms" },
                ].map((model) => (
                  <div
                    key={model.key}
                    onClick={() => setLoadedModels(prev => ({ ...prev, [model.key]: !prev[model.key as keyof typeof loadedModels] }))}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                      loadedModels[model.key as keyof typeof loadedModels]
                        ? "bg-brand-indigo/10 border-brand-indigo/30 shadow-[inset_0_0_10px_rgba(99,102,241,0.05)] text-white"
                        : "bg-white/2 border-white/5 text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={loadedModels[model.key as keyof typeof loadedModels]}
                      onChange={() => {}} // handled by click of parent
                      className="mt-1 h-4 w-4 rounded border-white/10 text-brand-indigo focus:ring-brand-indigo focus:ring-offset-0 cursor-pointer"
                    />
                    <div className="flex-1 flex flex-col gap-1">
                      <span className="text-xs font-bold">{model.label}</span>
                      <p className="text-[11px] text-gray-400 leading-relaxed font-sans">{model.desc}</p>
                      <span className="text-[9px] font-mono text-brand-indigo font-semibold mt-1">{model.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Threshold Slider and Live Wave widget */}
              <div className="p-5 rounded-3xl bg-black/40 border border-white/5 space-y-4 relative">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-gray-300">Edge AI Anomaly Alert Threshold</span>
                  <span className="text-brand-indigo font-bold">{anomalyThreshold.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="0.99"
                  step="0.01"
                  value={anomalyThreshold}
                  onChange={(e) => setAnomalyThreshold(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-indigo"
                  id="threshold-slider"
                />

                <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
                  <span>Fast Alert (Sensitive)</span>
                  <span>Strict Verification (Highly Confirmed)</span>
                </div>

                {/* Animated signal wave representation */}
                <div className="h-12 bg-black/60 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 500 50" preserveAspectRatio="none">
                    <path
                      d={Array.from({ length: 50 }, (_, i) => {
                        const freq = (1 - anomalyThreshold) * 1.5;
                        const amp = 15;
                        const y = 25 + Math.sin(i * freq) * amp * (Math.random() * 0.3 + 0.8);
                        return `${i === 0 ? "M" : "L"} ${i * 10} ${y}`;
                      }).join(" ")}
                      fill="none"
                      stroke={loadedModels.vibration ? "#6366f1" : "#4b5563"}
                      strokeWidth="1.5"
                      className="animate-pulse"
                    />
                  </svg>
                  <span className="absolute right-3 top-3 font-mono text-[8px] text-brand-indigo bg-brand-indigo/10 border border-brand-indigo/20 px-2 py-0.5 rounded">
                    LIVE SIGNAL SENSITIVITY
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: FINAL SYSTEM ACTIVATION */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex flex-col gap-1.5 border-b border-white/5 pb-4">
                <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">Step 05 of 05</span>
                <h2 className="text-2xl font-bold text-white">Review & Activate Gateway</h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Lock in configuration parameters, establish encrypted synchronized tunnels, and launch the real-time localized dashboard.
                </p>
              </div>

              {/* Review summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/2 border border-white/5 space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block">Network Parameters</span>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">Mode:</span>
                    <span className="text-white capitalize">{netInterface}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">Assigned IP:</span>
                    <span className="text-brand-cyan">192.168.1.142</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/2 border border-white/5 space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block">Factory Plus Endpoint</span>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">Tenant Workspace:</span>
                    <span className="text-brand-indigo truncate max-w-[130px]" title={fpUrl}>dwapar-industries</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">Secure Link:</span>
                    <span className="text-[#10b981] font-bold">Authenticated</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/2 border border-white/5 space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block">Local Telemetry Ingestion</span>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">OPC-UA Nodes:</span>
                    <span className="text-white">{protocols.opcUa ? "Active" : "Disabled"}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">Monitored Machines:</span>
                    <span className="text-brand-cyan font-bold">
                      {discoveredMachines.filter((m) => m.selected).length} Selected
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/2 border border-white/5 space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block">Edge AI Framework</span>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">Predictive Models:</span>
                    <span className="text-brand-indigo font-bold">
                      {Object.values(loadedModels).filter(Boolean).length} Loaded
                    </span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-gray-400">Alert Threshold:</span>
                    <span className="text-brand-indigo font-bold">{anomalyThreshold.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* REVIEW PROTOCOLS TRIGGER ACTION */}
              <div className="space-y-4">
                <button
                  onClick={handleFinalActivation}
                  disabled={isActivating}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-sm bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-purple hover:scale-[1.01] text-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2"
                  id="activate-btn"
                >
                  {isActivating ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full" />
                      Establishing Encrypted Local Orchestration...
                    </>
                  ) : (
                    "🚀 Establish Secure Tunnel & Activate Node"
                  )}
                </button>

                {/* Progress bar */}
                {isActivating && (
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full transition-all duration-150" style={{ width: `${activationProgress}%` }} />
                  </div>
                )}

                {activationLog.length > 0 && (
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/5 font-mono text-[10px] leading-5 text-gray-400 space-y-1">
                    {activationLog.map((log, idx) => (
                      <div key={idx} className={log.includes("⚡") ? "text-[#10b981] font-semibold" : log.includes("[SERVICES]") ? "text-brand-cyan" : ""}>
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: CONSOLE DASHBOARD - LIVE RUNNING STATE */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-float">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="font-mono text-[10px] text-[#10b981] font-bold uppercase tracking-widest">GATEWAY ACTIVE & SYNCHRONIZED</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    Dwapar Edge Local Console
                  </h2>
                </div>

                <div className="flex bg-black/40 rounded-xl p-1 border border-white/5 self-end">
                  <button
                    onClick={() => setDashboardIsIngesting(!dashboardIsIngesting)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase transition-all ${
                      dashboardIsIngesting ? "bg-[#10b981] text-black font-bold" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {dashboardIsIngesting ? "Ingesting" : "Paused"}
                  </button>
                </div>
              </div>

              {/* Console Dashboard Key Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#06b6d4]/5 border border-brand-cyan/20">
                  <span className="text-[9px] font-mono uppercase text-gray-500 block mb-1">Messages Parsed</span>
                  <span className="text-xl font-extrabold font-mono text-brand-cyan">{dashboardMsgCount}</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[9px] font-mono uppercase text-gray-500 block mb-1">Tunnel Compression</span>
                  <span className="text-xl font-extrabold font-mono text-white">96.4%</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[9px] font-mono uppercase text-gray-500 block mb-1">Model Inference</span>
                  <span className="text-xl font-extrabold font-mono text-brand-indigo">1.4ms</span>
                </div>
              </div>

              {/* Dynamic Console Logs */}
              <div className="space-y-2 relative">
                <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block">Live Synced Telemetry Stream</span>
                
                {dashboardIsIngesting && (
                  <div className="absolute left-0 right-0 h-0.5 bg-brand-cyan/20 animate-telemetry-scan pointer-events-none" />
                )}

                <div className="p-5 rounded-2xl bg-[#030712] border border-white/5 h-[220px] overflow-y-auto font-mono text-[11px] leading-6 space-y-1 scrollbar-thin">
                  {dashboardLogs.map((log, idx) => {
                    let logColor = "text-gray-300";
                    if (log.includes("🚨")) logColor = "text-[#ef4444] font-bold bg-[#ef4444]/10 px-2 py-0.5 rounded";
                    else if (log.includes("[SYSTEM]")) logColor = "text-brand-indigo";
                    else if (log.includes("[INGEST]")) logColor = "text-brand-cyan";
                    return (
                      <div key={idx} className={`${logColor} truncate`}>
                        {log}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Anomaly Simulator Button */}
              <div className="p-4 rounded-2xl bg-white/2 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    💡 Simulating Factory Failures
                  </span>
                  <p className="text-[10px] text-gray-400 max-w-md leading-relaxed font-sans">
                    Force CNC vibration levels to skyrocket. See how the local Edge AI intercepts the anomaly and registers a downtime log immediately inside Factory Plus.
                  </p>
                </div>

                <button
                  onClick={() => setDashboardAnomalyTriggered(!dashboardAnomalyTriggered)}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all border self-stretch sm:self-auto text-center ${
                    dashboardAnomalyTriggered
                      ? "bg-[#ef4444]/15 border-[#ef4444]/40 text-[#ef4444] hover:bg-[#ef4444]/25 animate-pulse"
                      : "bg-[#ef4444]/5 border-[#ef4444]/10 hover:border-[#ef4444]/30 text-[#ef4444]"
                  }`}
                  id="dashboard-sim-fault-btn"
                >
                  {dashboardAnomalyTriggered ? "Anomaly Triggered" : "Trigger CNC Fault"}
                </button>
              </div>
            </div>
          )}

          {/* FOOTER WIZARD NAVIGATION BUTTONS */}
          {currentStep < 6 && (
            <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
              <button
                onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  currentStep === 1
                    ? "opacity-30 cursor-not-allowed border-white/5 text-gray-600"
                    : "border-white/10 text-gray-300 hover:bg-white/5"
                }`}
                id="wizard-prev-btn"
              >
                ← Back
              </button>

              <span className="text-[10px] font-mono text-gray-500">
                Onboarding Step {currentStep} of 5
              </span>

              {currentStep < 4 ? (
                <button
                  onClick={() => currentStep <= Math.max(...completedSteps, 1) && setCurrentStep(currentStep + 1)}
                  disabled={currentStep > Math.max(...completedSteps, 1)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentStep <= Math.max(...completedSteps, 1)
                      ? "bg-brand-cyan text-black hover:scale-[1.02]"
                      : "bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed"
                  }`}
                  id="wizard-next-btn"
                >
                  Continue →
                </button>
              ) : currentStep === 4 ? (
                <button
                  onClick={saveAiSettings}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-cyan text-black hover:scale-[1.02] transition-all"
                  id="wizard-save-ai-btn"
                >
                  Review Summary →
                </button>
              ) : (
                <button
                  onClick={handleFinalActivation}
                  disabled={isActivating}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-cyan to-brand-indigo hover:scale-[1.02] text-black transition-all"
                  id="wizard-finalize-btn"
                >
                  Activate Node
                </button>
              )}
            </div>
          )}

        </section>

      </main>

      {/* FOOTER COLO-BAR */}
      <footer className="glass border-t border-white/5 px-6 lg:px-16 py-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-indigo flex items-center justify-center font-bold text-black text-xs">
              D
            </div>
            <span className="font-mono text-[9px] text-gray-500 uppercase">Dwapar Edge Gateway Configuration Console</span>
          </div>
          <span className="text-[9px] font-mono text-gray-500">
            &copy; {new Date().getFullYear()} Dwapar Technologies. Authorized for Factory Plus Shop Floor Integration.
          </span>
        </div>
      </footer>
    </div>
  );
}

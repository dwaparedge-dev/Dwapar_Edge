"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Play, Factory, LayoutDashboard, BadgeDollarSign, Package, CalendarDays, BarChart3, Settings, Bot, Sparkles, Clock, CheckCircle2, Activity, Database, Search, Globe, Bell, Lock, Shield } from "lucide-react";

export default function Production() {
  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % 7);
    }, 4000); // slightly longer to let user read dropdowns
    return () => clearInterval(timer);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const floatVariants: Variants = {
    animate: { y: [-8, 8, -8], transition: { duration: 5, ease: "easeInOut", repeat: Infinity } },
  };

  const fadeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 1.02, filter: "blur(4px)", transition: { duration: 0.5 } }
  };

  return (
    <section id="product" className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center w-full">
        <motion.div variants={itemVariants} className="flex flex-col items-center w-full relative z-10 mb-12">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#4b6584] animate-pulse" />
            <span className="text-xs font-bold text-[#576574]">Introducing Factory Plus 2.0</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-[#2f3542] max-w-4xl leading-[1.1]">
            Run Your Entire Factory From <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b6584] to-[#2f3542]">One Platform</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base md:text-lg text-[#576574] mb-4 max-w-2xl font-medium">
            ERP + MES + Machine Intelligence for modern manufacturing.
          </motion.p>
        </motion.div>

        {/* Floating Detailed UI Mockup - Video Animation Sequence */}
        <motion.div variants={itemVariants} className="w-full max-w-5xl">
          <motion.div variants={floatVariants} animate="animate" className="w-full relative rounded-2xl bg-[#f8f9fa] border border-gray-200 shadow-[0_30px_80px_-20px_rgba(47,53,66,0.3)] overflow-hidden flex flex-col text-left h-[600px]">
            
            {/* Top Navigation Bar - Pixel Perfect */}
            <div className="h-14 border-b border-gray-200 flex items-center px-4 gap-4 bg-white z-20 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#4b6584] rounded flex items-center justify-center text-white font-bold text-xs shadow-sm">F</div>
                <span className="font-extrabold text-[#2f3542] text-base">Factory Plus</span>
                <span className="text-gray-300 ml-2">&laquo;</span>
              </div>
              <div className="hidden lg:flex items-center gap-1 ml-4 bg-[#f4f5f7] p-1 rounded-lg border border-gray-200">
                <div className="px-3 py-1.5 bg-[#576574] text-white rounded-md text-xs font-bold flex items-center gap-1.5 shadow-sm"><LayoutDashboard className="w-3 h-3"/> Dashboard</div>
                <div className="px-3 py-1.5 text-[#576574] hover:bg-white rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors"><Settings className="w-3 h-3"/> Operations</div>
                <div className="px-3 py-1.5 text-[#576574] hover:bg-white rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors"><BarChart3 className="w-3 h-3"/> Reports</div>
                <div className="px-3 py-1.5 text-[#576574] hover:bg-white rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors"><Database className="w-3 h-3"/> Masters</div>
                <div className="px-3 py-1.5 text-[#576574] hover:bg-white rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors"><Settings className="w-3 h-3"/> Settings</div>
                <div className="px-3 py-1.5 text-[#576574] hover:bg-white rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors"><Bot className="w-3 h-3"/> AI</div>
              </div>
              <div className="ml-auto flex items-center gap-4 hidden sm:flex relative">
                 <div className="relative">
                   <div className={`flex items-center gap-2 px-3 py-1.5 border border-gray-200 bg-gray-50 rounded-lg text-gray-400 text-xs shadow-inner w-48 transition-all ${currentScreen === 0 ? 'ring-2 ring-[#4b6584]' : ''}`}>
                     <Search className="w-3 h-3" /> Search <span className="px-1 bg-white border border-gray-200 rounded ml-auto text-[10px] font-bold text-gray-500 shadow-sm">⌘K</span>
                   </div>
                   <AnimatePresence>
                     {currentScreen === 0 && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                          <span className="text-[10px] font-bold text-gray-400 px-4 pb-2 block uppercase tracking-wider">Suggestions</span>
                          <div className="flex flex-col">
                             <div className="px-4 py-2 hover:bg-gray-50 text-sm font-semibold text-[#2f3542] flex items-center gap-3"><LayoutDashboard className="w-4 h-4 text-gray-400"/> Overview</div>
                             <div className="px-4 py-2 hover:bg-gray-50 text-sm font-semibold text-[#2f3542] flex items-center gap-3"><Package className="w-4 h-4 text-gray-400"/> Purchase Orders</div>
                             <div className="px-4 py-2 bg-gray-50 text-sm font-semibold text-[#2f3542] flex items-center gap-3 border-l-2 border-[#4b6584]"><Activity className="w-4 h-4 text-[#4b6584]"/> Process Entry</div>
                          </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
                 
                 <div className="relative">
                   <Globe className={`w-4 h-4 ${currentScreen === 4 ? 'text-blue-500' : 'text-[#576574]'} cursor-pointer transition-colors`} />
                   <AnimatePresence>
                     {currentScreen === 4 && (
                       <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-5 w-40 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                          <div className="flex flex-col">
                             <div className="px-4 py-2 bg-gray-50 text-sm text-[#2f3542] border-l-2 border-[#4b6584]">
                                <span className="font-bold block">English</span><span className="text-xs text-gray-500">English</span>
                             </div>
                             <div className="px-4 py-2 hover:bg-gray-50 text-sm text-[#2f3542] cursor-pointer">
                                <span className="font-bold block">हिंदी</span><span className="text-xs text-gray-500">Hindi</span>
                             </div>
                             <div className="px-4 py-2 hover:bg-gray-50 text-sm text-[#2f3542] cursor-pointer">
                                <span className="font-bold block">ગુજરાતી</span><span className="text-xs text-gray-500">Gujarati</span>
                             </div>
                          </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>

                 <Bell className="w-4 h-4 text-[#576574] cursor-pointer" />
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center text-[#576574] text-xs font-extrabold shadow-sm cursor-pointer hover:shadow-md transition-all">TC</div>
              </div>
            </div>

            <div className="flex-1 flex bg-[#f4f5f7] overflow-hidden relative">
              {/* Sidebar */}
              <div className="w-56 hidden md:flex flex-col bg-white border-r border-gray-200 py-4 z-10 shrink-0">
                {[
                  { i: <LayoutDashboard className="w-4 h-4"/>, l: "Overview", id: 0 },
                  { i: <Activity className="w-4 h-4"/>, l: "Process Entry", id: 1 },
                  { i: <Database className="w-4 h-4"/>, l: "Staff", id: 2 },
                  { i: <Settings className="w-4 h-4"/>, l: "Roles & Permissions", id: 3 },
                  { i: <Bot className="w-4 h-4"/>, l: "AI Assistant", id: 4 },
                  { i: <Package className="w-4 h-4"/>, l: "Lots Tracking", id: 5 },
                  { i: <Database className="w-4 h-4"/>, l: "Raw Materials", id: 6 }
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 px-6 py-2.5 mx-2 rounded-lg text-sm font-semibold transition-all duration-300 ${currentScreen === item.id ? 'bg-[#4b6584] text-white shadow-md' : 'text-[#576574] hover:bg-gray-100'}`}>
                    {item.i} {item.l}
                  </div>
                ))}
              </div>

              {/* Main Animated Content Area */}
              <div className="flex-1 p-6 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  
                  {/* SCREEN 0: DASHBOARD */}
                  {currentScreen === 0 && (
                    <motion.div key="dashboard" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="absolute inset-6 flex flex-col gap-6">
                      <div className="w-full bg-gradient-to-r from-[#4b6584] to-[#576574] rounded-xl p-5 shadow-sm text-white flex justify-between items-center">
                        <div><h2 className="text-xl font-bold">Dashboard</h2><p className="text-xs text-gray-300">Overview</p></div>
                        <div className="flex gap-2">
                           <span className="px-3 py-1 bg-white/10 rounded border border-white/20 text-xs">Today</span>
                           <span className="px-3 py-1 bg-[#2f3542] rounded border border-white/10 text-xs font-bold shadow-sm">Last 30 Days</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { v: "26,316", l: "TOTAL PARTS", c: "text-purple-600", bg: "bg-purple-100" },
                          { v: "2.06%", l: "UTILIZATION", c: "text-emerald-600", bg: "bg-emerald-100" },
                          { v: "48.48h", l: "PRODUCTION HOURS", c: "text-amber-500", bg: "bg-amber-100" },
                          { v: "848.90", l: "DAILY OUTPUT", c: "text-blue-500", bg: "bg-blue-100" }
                        ].map((stat, i) => (
                          <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center">
                            <div className={`w-10 h-10 rounded-xl ${stat.bg} mb-4 flex items-center justify-center`}><div className={`w-4 h-4 rounded-sm ${stat.c} bg-current`} /></div>
                            <span className="text-[10px] font-bold text-gray-400 mb-1 tracking-wider uppercase">{stat.l}</span>
                            <span className="text-2xl font-extrabold text-[#2f3542]">{stat.v}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col relative overflow-hidden">
                          <h3 className="text-sm font-bold text-[#2f3542] mb-4">Utilization Distribution</h3>
                          <div className="flex-1 flex items-center justify-center">
                             <div className="w-48 h-48 rounded-full shadow-inner relative flex items-center justify-center" style={{ background: 'conic-gradient(#10b981 0% 2%, #8b5cf6 2% 100%)' }}><span className="text-white font-bold text-xl drop-shadow-md">100%</span></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 1: PROCESS ENTRY */}
                  {currentScreen === 1 && (
                    <motion.div key="process" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="absolute inset-6 flex flex-col gap-6 relative">
                      <div className="w-full bg-gradient-to-r from-[#4b6584] to-[#576574] rounded-xl p-5 shadow-sm text-white flex justify-between items-center">
                        <div><h2 className="text-xl font-bold">Process Entry</h2></div>
                        <div className="flex gap-2"><button className="px-4 py-1.5 bg-[#2f3542] text-white rounded border border-white/10 text-xs font-bold">+ New Entry</button></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                         <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" /><span className="text-3xl font-extrabold text-[#2f3542] mt-2">99.6%</span><span className="text-xs text-gray-500 font-bold mt-1">Output Efficiency</span></div>
                         <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" /><span className="text-3xl font-extrabold text-[#2f3542] mt-2">10.7%</span><span className="text-xs text-gray-500 font-bold mt-1">Time Efficiency</span></div>
                         <div className="bg-white rounded-xl p-5 border border-gray-200 flex flex-col relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500" /><span className="text-3xl font-extrabold text-[#2f3542] mt-2">135.6%</span><span className="text-xs text-gray-500 font-bold mt-1">Weight Efficiency</span></div>
                      </div>
                      
                      {/* Live Process Timer Modal Overlay */}
                      <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[2px] bg-white/40 rounded-xl">
                         <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
                           <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                             <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#4b6584]"/><span className="font-bold text-sm text-[#2f3542]">Live Process Timer</span></div>
                           </div>
                           <div className="p-6 flex flex-col items-center gap-6">
                              <div className="text-center relative">
                                 <div className="absolute -right-4 top-2 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                                 <h1 className="text-4xl font-mono font-extrabold text-[#4b6584] tracking-wider mb-1">00:00:16</h1>
                                 <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Elapsed Time</p>
                              </div>
                              <div className="w-full flex flex-col gap-3 text-sm">
                                 <div className="flex justify-between items-center"><span className="text-gray-500">Lot Name</span><span className="font-bold bg-gray-100 px-2 py-0.5 rounded text-[#2f3542] text-xs">Dharmik_start body _Lot_5</span></div>
                                 <div className="flex justify-between items-center"><span className="text-gray-500">Process Name</span><span className="font-bold text-blue-500 border border-blue-200 px-2 py-0.5 rounded-full text-xs">Edging</span></div>
                                 <div className="flex justify-between items-center"><span className="text-gray-500">Standard vs Real</span><span className="font-bold text-[#2f3542] text-xs">6250 mins (0%)</span></div>
                              </div>
                              <div className="flex gap-3 w-full">
                                 <button className="flex-1 py-2 rounded-full border-2 border-amber-400 text-amber-500 font-bold text-sm">Stop / Pause</button>
                                 <button className="flex-1 py-2 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4"/> Complete</button>
                              </div>
                           </div>
                         </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 2: STAFF */}
                  {currentScreen === 2 && (
                    <motion.div key="staff" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="absolute inset-6 flex flex-col gap-6 relative">
                      <div className="w-full bg-gradient-to-r from-[#4b6584] to-[#576574] rounded-xl p-5 shadow-sm text-white flex justify-between items-center">
                        <div><h2 className="text-xl font-bold">Staff</h2></div>
                        <button className="px-4 py-1.5 bg-white/10 text-white rounded border border-white/20 text-xs font-bold">+ Add New</button>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                         <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" /><span className="text-2xl font-extrabold text-[#2f3542] mt-1">4</span><span className="text-xs text-gray-500 font-bold">Total Staffs</span></div>
                         <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" /><span className="text-2xl font-extrabold text-[#2f3542] mt-1">3</span><span className="text-xs text-gray-500 font-bold">ManPower</span></div>
                         <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" /><span className="text-2xl font-extrabold text-[#2f3542] mt-1">4</span><span className="text-xs text-gray-500 font-bold">Operator</span></div>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col">
                        <div className="grid grid-cols-5 text-[10px] font-extrabold tracking-wider text-gray-400 p-4 border-b border-gray-100 bg-gray-50 uppercase">
                          <span>Name</span><span>Employee ID</span><span>Job Title</span><span>Status</span><span>Engaged</span>
                        </div>
                        {[
                          { n: "Dharmik", id: "EMP002", t: "worker", s: "Available", c: "bg-emerald-100 text-emerald-600" },
                          { n: "Meet Ahir", id: "EMP001", t: "worker", s: "Engaged", c: "bg-amber-100 text-amber-600" },
                          { n: "Dev", id: "EMP004", t: "majur", s: "Available", c: "bg-emerald-100 text-emerald-600" }
                        ].map((s, i) => (
                           <div key={i} className="grid grid-cols-5 text-sm font-bold text-[#2f3542] p-4 border-b border-gray-50 items-center">
                             <span className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-[#576574]">{s.n[0]}</div> {s.n}</span>
                             <span className="text-gray-500">{s.id}</span>
                             <span className="text-gray-500">{s.t}</span>
                             <div className="w-8 h-4 rounded-full bg-emerald-500 relative"><div className="absolute right-1 top-1 w-2 h-2 rounded-full bg-white"/></div>
                             <span className={`text-[10px] ${s.c} px-2 py-1 rounded-full w-fit uppercase font-extrabold`}>{s.s}</span>
                           </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 3: ROLES & PERMISSIONS */}
                  {currentScreen === 3 && (
                    <motion.div key="roles" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="absolute inset-6 flex gap-6 relative">
                       <div className="w-64 flex flex-col gap-3">
                         <div className="w-full bg-[#576574] rounded-xl p-5 shadow-sm text-white mb-2">
                           <h2 className="text-lg font-bold">Roles & Perms</h2>
                         </div>
                         <div className="bg-white border-l-4 border-amber-500 shadow-md p-3 rounded-xl flex items-center gap-3 relative">
                           <div className="absolute right-3 top-3"><div className="w-2 h-2 rounded-full bg-amber-500" /></div>
                           <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600"><Lock className="w-5 h-5"/></div>
                           <div><h4 className="font-bold text-sm text-[#2f3542]">Admin <span className="text-[8px] bg-amber-100 text-amber-600 px-1 rounded ml-1">You</span></h4><span className="text-xs text-gray-400 font-medium">186 perms</span></div>
                         </div>
                         <div className="bg-white border border-gray-100 p-3 rounded-xl flex items-center gap-3 hover:bg-gray-50">
                           <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold">M</div>
                           <div><h4 className="font-bold text-sm text-[#2f3542]">Manager</h4><span className="text-xs text-gray-400 font-medium">18 perms</span></div>
                         </div>
                       </div>
                       <div className="flex-1 flex flex-col gap-4">
                         <div className="bg-amber-50 border border-amber-200 shadow-sm rounded-2xl p-5 flex justify-between items-center relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400" />
                            <div className="flex items-center gap-4 pl-2">
                              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600"><Shield className="w-6 h-6"/></div>
                              <div>
                                <h3 className="font-extrabold text-[#2f3542] text-xl flex items-center gap-2">Admin <span className="text-[10px] bg-amber-200/50 border border-amber-300 px-2 py-0.5 rounded text-amber-700">System Admin</span></h3>
                                <span className="text-sm text-gray-500 font-medium">186 of 48 Signal Permissions Granted</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-amber-600 border border-amber-300 bg-amber-100 px-3 py-1.5 rounded-md">7 ACTIVE MODULES</span>
                         </div>
                         <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm">
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#576574]"><LayoutDashboard className="w-5 h-5"/></div>
                             <div><h4 className="font-bold text-[#2f3542] text-base">Dashboard</h4><p className="text-xs text-gray-500 font-medium">7 of 7 Pages Accessible</p></div>
                           </div>
                           <div className="w-10 h-5 rounded-full bg-emerald-500 relative"><div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-white"/></div>
                         </div>
                         <div className="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center shadow-sm">
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#576574]"><Database className="w-5 h-5"/></div>
                             <div><h4 className="font-bold text-[#2f3542] text-base">Master</h4><p className="text-xs text-gray-500 font-medium">8 of 8 Pages Accessible</p></div>
                           </div>
                           <div className="w-10 h-5 rounded-full bg-emerald-500 relative"><div className="absolute right-1 top-1 w-3 h-3 rounded-full bg-white"/></div>
                         </div>
                       </div>
                    </motion.div>
                  )}

                  {/* SCREEN 4: AI ASSISTANT */}
                  {currentScreen === 4 && (
                    <motion.div key="ai" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="absolute inset-6 flex flex-col gap-6">
                      <div className="w-full bg-gradient-to-r from-[#4b6584] to-[#576574] rounded-xl p-5 shadow-sm text-white flex justify-between items-center">
                        <div>
                          <h2 className="text-xl font-bold">AI Assistant</h2>
                          <p className="text-xs text-gray-300">Ask me anything about your factory...</p>
                        </div>
                        <div className="flex gap-2 bg-white/10 p-1 rounded-lg border border-white/20">
                          <span className="px-3 py-1 bg-[#2f3542] text-white rounded text-xs font-bold shadow-sm">English</span>
                          <span className="px-3 py-1 text-white hover:bg-white/10 rounded text-xs font-bold cursor-pointer transition-colors">Hindi</span>
                          <span className="px-3 py-1 text-white hover:bg-white/10 rounded text-xs font-bold cursor-pointer transition-colors">Gujarati</span>
                        </div>
                      </div>
                      <div>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Suggested Intelligence Queries</span>
                         <div className="flex flex-wrap gap-2">
                           {["Today's Production", "Machine Status", "Pending Orders", "Low Stock Alerts", "AI Suggestions"].map((q, i) => (
                             <span key={i} className="px-4 py-2 bg-white rounded-full text-xs font-bold text-[#576574] border border-gray-200 shadow-sm flex items-center gap-2 hover:bg-gray-50 cursor-pointer"><Sparkles className="w-3 h-3 text-[#4b6584]"/> {q}</span>
                           ))}
                        </div>
                      </div>
                      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-4">
                         <div className="flex gap-4 items-start">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4b6584] to-[#2f3542] flex items-center justify-center text-white shrink-0 shadow-md"><Bot className="w-5 h-5"/></div>
                           <div className="bg-[#f4f5f7] p-4 rounded-2xl rounded-tl-none text-sm text-[#2f3542] max-w-[80%] shadow-sm border border-gray-100 font-medium leading-relaxed">
                             Hello! I am your Factory AI Assistant. How can I help you today? You can ask me about production status, machine efficiency, or pending orders.
                           </div>
                         </div>
                         <div className="mt-auto relative">
                           <div className="w-full h-12 border border-gray-200 rounded-xl bg-[#f8f9fa] flex items-center px-4 shadow-inner">
                             <span className="text-gray-400 text-sm">Type your question here...</span>
                           </div>
                         </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 5: LOTS TRACKING */}
                  {currentScreen === 5 && (
                    <motion.div key="lots" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="absolute inset-6 flex flex-col gap-6">
                      <div className="w-full bg-gradient-to-r from-[#4b6584] to-[#576574] rounded-xl p-5 shadow-sm text-white flex justify-between items-center">
                        <div><h2 className="text-xl font-bold">Lots Tracking</h2></div>
                        <div className="flex gap-2"><span className="px-3 py-1 bg-white text-[#2f3542] rounded border text-xs font-bold">General Overview</span></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { n: "Dharmik", p: "Medium Priority", s: "Pending", bg: "bg-emerald-50/50", c: "text-emerald-500", b: "border-emerald-200" },
                          { n: "new cusorm...", p: "Medium Priority", s: "Pending", bg: "bg-emerald-50/50", c: "text-emerald-500", b: "border-emerald-200" },
                          { n: "Meet", p: "High Priority", s: "Active", bg: "bg-blue-50/50", c: "text-blue-500", b: "border-blue-200" }
                        ].map((lot, i) => (
                          <div key={i} className={`p-4 rounded-xl shadow-sm border ${lot.b} ${lot.bg} flex justify-between items-center`}>
                            <div className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"><Clock className={`w-4 h-4 ${lot.c}`} /></div>
                              <div>
                                <h4 className="font-bold text-sm text-[#2f3542] flex items-center gap-2">{lot.n}</h4>
                                <span className="text-[10px] text-gray-500">{lot.p}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400">INSPECT &gt;</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col p-4">
                        <h3 className="text-sm font-bold text-[#2f3542] mb-3">All Active Orders</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {["Dharmik", "new cusorm...", "Meet", "Dharmik", "gnt", "vnkdn"].map((lot, i) => (
                            <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                              <div className="flex gap-3 items-center">
                                <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-500"><Package className="w-3 h-3" /></div>
                                <h4 className="font-bold text-xs text-[#2f3542]">{lot}</h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SCREEN 6: RAW MATERIALS */}
                  {currentScreen === 6 && (
                    <motion.div key="materials" variants={fadeVariants} initial="hidden" animate="visible" exit="exit" className="absolute inset-6 flex flex-col gap-6 relative">
                      <div className="w-full bg-gradient-to-r from-[#4b6584] to-[#576574] rounded-xl p-5 shadow-sm text-white flex justify-between items-center">
                        <div><h2 className="text-xl font-bold">Raw Materials</h2></div>
                        <button className="px-4 py-1.5 bg-white/10 text-white rounded border border-white/20 text-xs font-bold">Add New</button>
                      </div>
                      <div className="flex gap-4 border-b border-gray-200">
                         <span className="text-sm font-bold text-[#4b6584] border-b-2 border-[#4b6584] pb-2">Casting Components</span>
                         <span className="text-sm font-bold text-gray-400 pb-2">Melting Materials</span>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                         <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" /><span className="text-2xl font-extrabold text-[#2f3542] mt-1">6</span><span className="text-xs text-gray-500 font-bold">Total Materials</span></div>
                         <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col relative overflow-hidden shadow-sm"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-500" /><span className="text-2xl font-extrabold text-[#2f3542] mt-1">3</span><span className="text-xs text-gray-500 font-bold">Categories</span></div>
                         <div className="bg-white rounded-xl p-4 border border-gray-200 flex flex-col relative overflow-hidden shadow-sm col-span-2"><div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500" /><span className="text-2xl font-extrabold text-[#2f3542] mt-1">₹4,20,64,000</span><span className="text-xs text-gray-500 font-bold">Total Stock Value</span></div>
                      </div>
                      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-1 flex flex-col">
                        <div className="grid grid-cols-4 text-[10px] font-extrabold tracking-wider text-gray-400 p-4 border-b border-gray-100 bg-gray-50 uppercase">
                          <span>Name</span><span>Code</span><span>Category</span><span>Available Stock</span>
                        </div>
                        {[
                          { n: "nakjnkd", id: "RM9", c: "Premium", s: "0 kg" },
                          { n: "new test star", id: "RM8", c: "Premium", s: "0 piece" },
                          { n: "bibcock 4", id: "RM7", c: "normal", s: "11000 kg" }
                        ].map((s, i) => (
                           <div key={i} className="grid grid-cols-4 text-sm font-bold text-[#2f3542] p-4 border-b border-gray-50 items-center">
                             <span className="flex items-center gap-3"><div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-xs text-[#576574] border border-gray-200">{s.n[0].toUpperCase()}</div> {s.n}</span>
                             <span className="text-gray-500">{s.id}</span>
                             <span className="text-gray-500">{s.c}</span>
                             <span className="text-[#4b6584]">{s.s}</span>
                           </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-12 flex justify-center">
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://factory-plus.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-10 py-5 rounded-2xl bg-[#4b6584] text-white text-lg font-bold transition-all shadow-xl hover:shadow-2xl hover:bg-[#3a4f6a] flex items-center gap-3 group">
            Visit Factory Plus Live <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

      </motion.div>
    </section>
  );
}

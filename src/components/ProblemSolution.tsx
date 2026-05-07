"use client";
import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, Factory, TrendingDown, ClipboardList, DatabaseZap, Clock, ChartBar } from "lucide-react";

export default function ProblemSolution() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const problems = [
    { text: "Manual data entry on paper leading to errors and delays.", icon: <ClipboardList className="w-5 h-5 text-red-500" /> },
    { text: "No real-time tracking of machine utilization or OEE.", icon: <TrendingDown className="w-5 h-5 text-red-500" /> },
    { text: "Poor visibility into order status and department transitions.", icon: <Factory className="w-5 h-5 text-red-500" /> },
    { text: "Downtime is recorded hours or days after it happens.", icon: <Clock className="w-5 h-5 text-red-500" /> }
  ];

  const solutions = [
    { text: "Automated digital workflows with zero paper trails.", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
    { text: "Millisecond-level real-time machine tracking & OEE.", icon: <ChartBar className="w-5 h-5 text-emerald-500" /> },
    { text: "Live dashboards for total visibility across all operations.", icon: <DatabaseZap className="w-5 h-5 text-emerald-500" /> },
    { text: "Instant alerts and intelligent downtime prediction.", icon: <Clock className="w-5 h-5 text-emerald-500" /> }
  ];

  return (
    <section id="problem-solution" className="py-24 px-6 lg:px-12 bg-[#f8f9fa] border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2f3542] mb-4">Why Foundries Switch to Us</h2>
          <p className="text-lg text-[#576574] max-w-2xl mx-auto">Replacing outdated legacy methods with modern, real-time intelligence.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          
          {/* Problem Section */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none border border-gray-200 p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-red-400" />
            <h3 className="text-2xl font-bold text-[#2f3542] mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500"><XCircle className="w-5 h-5" /></div>
              The Old Way
            </h3>
            <div className="flex flex-col gap-6">
              {problems.map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                  <div className="mt-1 shrink-0 bg-red-50 p-2 rounded-lg">{item.icon}</div>
                  <p className="font-semibold text-[#576574] leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solution Section */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#2f3542] rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#4b6584] to-blue-400" />
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 border border-white/20"><CheckCircle2 className="w-5 h-5" /></div>
              The Factory Plus Way
            </h3>
            <div className="flex flex-col gap-6">
              {solutions.map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="mt-1 shrink-0 bg-white/10 p-2 rounded-lg">{item.icon}</div>
                  <p className="font-semibold text-gray-300 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileSpreadsheet, EyeOff, Clock, Unplug } from "lucide-react";

export default function Problem() {
  const problems = [
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-rose-500" />,
      title: "Manual Tracking",
      desc: "Relying on scattered Excel sheets and paper logs that are prone to human error."
    },
    {
      icon: <EyeOff className="w-6 h-6 text-orange-500" />,
      title: "No Real-time Visibility",
      desc: "Finding out about production bottlenecks hours after they happen."
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      title: "Unknown Downtime",
      desc: "Unable to accurately measure OEE because machine health isn't actively monitored."
    },
    {
      icon: <Unplug className="w-6 h-6 text-indigo-500" />,
      title: "Disconnected Systems",
      desc: "Finance, warehouse, and shop floor using different, siloed software."
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#2f3542] mb-4">Manufacturing is broken.</h2>
        <p className="text-[#576574] text-lg font-medium">Legacy systems can't keep up with modern production demands.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {problems.map((prob, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 border border-gray-100">
              {prob.icon}
            </div>
            <h3 className="text-xl font-bold text-[#2f3542] mb-2">{prob.title}</h3>
            <p className="text-sm text-[#576574] leading-relaxed">{prob.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

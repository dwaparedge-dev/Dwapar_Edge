"use client";
import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BrainCircuit, CalendarCheck, FileText } from "lucide-react";

export default function Features() {
  const features = [
    { icon: <LayoutDashboard />, title: "Real-time Dashboards", desc: "Live OEE and factory utilization." },
    { icon: <BrainCircuit />, title: "AI Downtime Prediction", desc: "Catch failures before they happen." },
    { icon: <CalendarCheck />, title: "Smart Planning", desc: "Optimize your production schedule." },
    { icon: <FileText />, title: "Automated Invoicing", desc: "Generate bills instantly upon delivery." }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-[#f1f2f6] text-[#4b6584] flex items-center justify-center mb-4">
              {feat.icon}
            </div>
            <h3 className="text-lg font-bold text-[#2f3542] mb-2">{feat.title}</h3>
            <p className="text-sm text-[#576574]">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

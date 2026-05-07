"use client";
import React from "react";
import { motion } from "framer-motion";
import { Factory, Activity, Package, ShoppingCart, Receipt, Brain } from "lucide-react";

export default function Modules() {
  const modules = [
    { icon: <Factory />, title: "Production Engine", desc: "Track every step from foundry to finishing." },
    { icon: <Activity />, title: "Machine Monitoring", desc: "Live OEE, uptime, and vibration metrics." },
    { icon: <Package />, title: "Inventory & Raw Materials", desc: "Automated stock thresholds and lot tracking." },
    { icon: <ShoppingCart />, title: "Orders & Delivery", desc: "Fulfill purchase orders with total precision." },
    { icon: <Receipt />, title: "Financials", desc: "Auto-generate invoices and track expenses." },
    { icon: <Brain />, title: "AI Insights", desc: "Predictive downtime and scheduling optimization." }
  ];

  return (
    <section id="modules" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#2f3542] mb-4">Everything You Need</h2>
        <p className="text-[#576574] text-lg font-medium">Powerful modules working together seamlessly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            key={i}
            className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#f1f2f6] text-[#4b6584] flex items-center justify-center mb-6 group-hover:bg-[#4b6584] group-hover:text-white transition-colors">
              {mod.icon}
            </div>
            <h3 className="text-xl font-bold text-[#2f3542] mb-2">{mod.title}</h3>
            <p className="text-sm text-[#576574]">{mod.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

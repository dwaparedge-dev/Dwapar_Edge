"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Workflow() {
  const steps = ["Raw Material", "Production", "Quality", "Warehouse", "Delivery", "Analytics"];

  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#2f3542] mb-4">End-to-End Visibility</h2>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 hidden md:block -translate-y-1/2" />
        
        {steps.map((step, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="relative z-10 flex flex-col items-center gap-4 bg-[#f8f9fa] p-4 rounded-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center font-extrabold text-[#4b6584] text-xl">
              {i + 1}
            </div>
            <span className="text-sm font-bold text-[#2f3542]">{step}</span>
            {i !== steps.length - 1 && <ArrowRight className="w-4 h-4 text-gray-400 md:hidden" />}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

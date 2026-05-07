"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Solution() {
  return (
    <section id="product" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="p-12 md:p-16 rounded-[2.5rem] bg-[#4b6584] border border-[#3a4f6a] relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-3xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">The Unified Platform</h2>
          <p className="text-xl text-[#f1f2f6] mb-10 leading-relaxed font-medium">
            Factory Plus replaces your disconnected tools with a single, intelligent source of truth. From the moment raw materials arrive to the second the finished product is delivered.
          </p>
          
          <div className="space-y-4">
            {[
              "Real-time operational insights across all departments",
              "End-to-end tracking of every part and purchase order",
              "Automated data ingestion directly from the shop floor"
            ].map((text, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="w-6 h-6 text-green-300 shrink-0" />
                <span className="text-white font-semibold">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

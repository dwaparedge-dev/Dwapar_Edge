"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="demo" className="py-24 px-6 lg:px-12 max-w-5xl mx-auto text-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-[#4b6584] to-[#2f3542] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">See Factory Plus in Action</h2>
          <p className="text-xl text-[#f1f2f6] mb-10 max-w-2xl mx-auto font-medium">
            Ready to upgrade your manufacturing operations? Get a personalized demo of the cloud platform and edge hardware.
          </p>
          <a href="https://factory-plus.vercel.app/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl bg-white text-[#2f3542] font-bold text-lg hover:bg-gray-100 transition-all shadow-xl flex items-center justify-center gap-2 mx-auto w-fit">
            Visit Website <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

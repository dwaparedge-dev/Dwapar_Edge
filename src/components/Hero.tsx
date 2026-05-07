"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { Play } from "lucide-react";

export default function Hero() {

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
    <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center overflow-visible">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4b6584]/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col items-center w-full relative z-10">
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#4b6584] animate-pulse" />
          <span className="text-xs font-bold text-[#576574]">Introducing Factory Plus 2.0</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[#2f3542] max-w-4xl leading-[1.1]">
          Run Your Entire Factory From <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4b6584] to-[#2f3542]">One Platform</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#576574] mb-10 max-w-2xl font-medium">
          ERP + MES + Machine Intelligence for modern manufacturing.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <motion.a whileHover={{ scale: 1.05, backgroundColor: "#f1f2f6" }} whileTap={{ scale: 0.95 }} href="#product" className="px-8 py-4 rounded-xl bg-white border border-gray-200 text-[#2f3542] font-bold transition-all shadow-sm flex items-center justify-center gap-2">
            <Play className="w-4 h-4" /> See Platform
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

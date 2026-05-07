"use client";
import React from "react";
import { motion } from "framer-motion";
import { Building2, Target, Globe } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="pt-32 lg:pt-48 pb-20 px-6 lg:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 max-w-3xl">
          <p className="text-lg md:text-xl text-[#576574] leading-relaxed">
            <strong className="text-[#4b6584]">Dwapar Edge</strong> is an enterprise technology company dedicated to modernizing the manufacturing sector. We build intelligent, scalable systems that bridge the gap between heavy industrial operations and cutting-edge cloud architecture.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          
          <motion.div variants={itemVariants} className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-200 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#2f3542] mb-3">The Company</h3>
            <p className="text-[#576574] leading-relaxed">Headquartered in Gujarat, India, Dwapar Edge is the parent organization architecting the future of industrial B2B SaaS.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-200 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#2f3542] mb-3">Our Mission</h3>
            <p className="text-[#576574] leading-relaxed">To streamline operations in traditional factories through highly automated, zero-paper digital workflows.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-200 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#2f3542] mb-3">Flagship Product</h3>
            <p className="text-[#576574] leading-relaxed">Factory Plus is our premier ERP and MES platform, actively managing thousands of production hours daily.</p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

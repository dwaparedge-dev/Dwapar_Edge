"use client";
import React from "react";
import { motion } from "framer-motion";
import { Server, Cpu, Cloud, Database, Wifi, Shield, Code2, Zap, Activity, Lock } from "lucide-react";

export default function Technologies() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="tech" className="py-24 px-6 lg:px-12 bg-white border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2f3542] mb-4">Our Technology Stack</h2>
          <p className="text-lg text-[#576574] max-w-2xl mx-auto">A robust, scalable cloud architecture powering modern smart factories.</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={itemVariants} className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-xl text-[#2f3542] mb-3">Next.js</h4>
              <p className="text-sm text-[#576574]">High-performance, server-rendered React framework for the frontend.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <Server className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-xl text-[#2f3542] mb-3">Node.js & Express</h4>
              <p className="text-sm text-[#576574]">Robust and scalable backend architecture for high-throughput APIs.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-xl text-[#2f3542] mb-3">MongoDB</h4>
              <p className="text-sm text-[#576574]">Flexible NoSQL database built for scale and rapid data ingestion.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center group hover:bg-white hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-xl text-[#2f3542] mb-3">WebSockets</h4>
              <p className="text-sm text-[#576574]">Real-time bi-directional communication across all factory devices.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

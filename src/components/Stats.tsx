"use client";
import React from "react";
import { motion } from "framer-motion";
import { TrendingDown, ClipboardCheck, Clock, Zap } from "lucide-react";

export default function Stats() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stats = [
    {
      value: "30%",
      label: "Downtime Reduction",
      desc: "Average decrease in machine downtime across partnered foundries.",
      icon: <TrendingDown className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50",
    },
    {
      value: "10k+",
      label: "Tons Tracked",
      desc: "Of raw melting materials and finished castings managed seamlessly.",
      icon: <ClipboardCheck className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      value: "100%",
      label: "Paperless Operations",
      desc: "Elimination of manual registers, physical logs, and verbal reports.",
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-50",
    },
    {
      value: "24/7",
      label: "Real-Time OEE",
      desc: "Continuous, automated monitoring of machine performance and state.",
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-50",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-12 bg-[#f8f9fa] border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-extrabold text-[#4b6584] uppercase tracking-widest bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
            Key Metrics
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#2f3542] mt-4 mb-4">
            Real Impact, Measured in Real Time
          </h2>
          <p className="text-lg text-[#576574] max-w-2xl mx-auto">
            We don't just promise optimization—we deliver tangible operational breakthroughs that transform your bottom line.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-shadow"
            >
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-[#2f3542] mb-2 tracking-tight">
                {stat.value}
              </h3>
              <h4 className="font-extrabold text-base text-[#4b6584] mb-3">
                {stat.label}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

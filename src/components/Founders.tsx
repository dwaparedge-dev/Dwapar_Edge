"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Globe, Code2, Megaphone } from "lucide-react";

export default function Founders() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const founders = [
    {
      name: "Dharmik Ahir",
      role: "Co-Founder & Chief Technology Officer",
      icon: <Code2 className="w-6 h-6 text-blue-500" />,
      bio: "Leading the architectural vision and engineering of the Factory Plus platform and edge hardware integrations.",
      initials: "DA"
    },
    {
      name: "Meet Gojiya",
      role: "Co-Founder & Chief Marketing Officer",
      icon: <Megaphone className="w-6 h-6 text-purple-500" />,
      bio: "Driving the market strategy, brand positioning, and enterprise sales growth for Dwapar Edge.",
      initials: "MG"
    }
  ];

  return (
    <section id="founders" className="py-24 px-6 lg:px-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2f3542] mb-4">Meet The Founders</h2>
          <p className="text-lg text-[#576574] max-w-2xl mx-auto">The visionaries behind Dwapar Edge and Factory Plus.</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div key={i} variants={itemVariants} className="group relative bg-[#f8f9fa] rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#4b6584] to-[#2f3542] rounded-full flex items-center justify-center text-white text-3xl font-extrabold shadow-lg mb-6 group-hover:scale-110 transition-transform">
                {founder.initials}
              </div>
              <div className="absolute top-6 right-6 bg-white p-2 rounded-full shadow-sm border border-gray-100">
                {founder.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#2f3542] mb-2">{founder.name}</h3>
              <p className="text-sm font-extrabold text-[#4b6584] uppercase tracking-wider mb-4">{founder.role}</p>
              <p className="text-[#576574] font-medium leading-relaxed mb-6">{founder.bio}</p>
              <div className="flex gap-3 mt-auto">
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-200 transition-colors shadow-sm">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-sky-500 hover:border-sky-200 transition-colors shadow-sm">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

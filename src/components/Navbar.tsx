"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm" : "bg-transparent py-6"
      } px-6 lg:px-12`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4b6584] to-[#2f3542] flex items-center justify-center shadow-md">
            <Box className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-[#2f3542]">Dwapar Edge</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#576574]">
          <a href="#product" className="hover:text-[#4b6584] transition-colors">Product</a>
          <a href="#tech" className="hover:text-[#4b6584] transition-colors">Technologies</a>
          <a href="#founders" className="hover:text-[#4b6584] transition-colors">Founders</a>
          <a href="#contact" className="hover:text-[#4b6584] transition-colors">Contact</a>
        </nav>
      </div>
    </motion.header>
  );
}

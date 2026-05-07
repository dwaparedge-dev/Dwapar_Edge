"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-white/5 py-4' : 'bg-transparent py-6'} px-6 lg:px-16`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan to-brand-indigo shadow-lg">
            <span className="font-mono text-xl font-black text-black">D</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xl font-bold tracking-wider text-white">DWAPAR</span>
            <span className="font-mono text-[9px] text-brand-cyan tracking-[0.25em] -mt-1 uppercase">Edge</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#vision" className="hover:text-brand-cyan transition-colors">Vision</a>
          <a href="#products" className="hover:text-brand-cyan transition-colors">Products</a>
          <a href="#team" className="hover:text-brand-cyan transition-colors">Founders</a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-bold transition-all hover:bg-gray-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </header>
  );
}

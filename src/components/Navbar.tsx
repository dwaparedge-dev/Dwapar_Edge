"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["#about", "Company"],
  ["#products", "Platform"],
  ["#approach", "How we work"],
  ["#founders", "Founders"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled || open ? "bg-ink/90 backdrop-blur border-b border-line" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3" aria-label="Dwapar Edge">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="h-7 w-auto" style={{ mixBlendMode: "lighten" }} />
          <span className="text-[13px] font-medium tracking-[0.2em] uppercase text-bone">Dwapar Edge</span>
        </a>

        <nav className="hidden md:flex items-center gap-9 text-sm text-muted">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="hover:text-gold transition-colors">{l}</a>
          ))}
        </nav>

        <a href="#contact" className="hidden md:inline-flex px-4 py-2 bg-gold text-ink text-sm font-semibold hover:bg-gold2 transition-colors">
          Contact
        </a>

        <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2 text-white">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line px-5 py-3 flex flex-col">
          {[...links, ["#contact", "Contact"]].map(([h, l]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-bone border-b border-line last:border-0">{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

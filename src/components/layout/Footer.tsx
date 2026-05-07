"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="glass border-t border-white/5 px-6 lg:px-16 py-12 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-indigo flex items-center justify-center font-bold text-black text-xs">D</div>
            <span className="font-sans font-bold tracking-wider text-white">DWAPAR</span>
          </div>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            Building the nervous system of modern manufacturing with Cloud ERP and Edge computing.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Ecosystem</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="#products" className="hover:text-brand-cyan transition-colors">Factory Plus</a></li>
            <li><Link href="/edge" className="hover:text-brand-cyan transition-colors">Dwapar Edge Gateway</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="#vision" className="hover:text-brand-cyan transition-colors">Our Vision</a></li>
            <li><a href="#team" className="hover:text-brand-cyan transition-colors">Leadership</a></li>
            <li><a href="#contact" className="hover:text-brand-cyan transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5">
        <span className="text-[10px] font-mono text-gray-500">
          &copy; {new Date().getFullYear()} Dwapar Edge. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

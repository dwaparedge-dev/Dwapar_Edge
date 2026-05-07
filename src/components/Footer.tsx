"use client";
import React from "react";
import { Box } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 pt-16 pb-8 px-6 lg:px-12 bg-white mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4b6584] to-[#2f3542] flex items-center justify-center shadow-md">
              <Box className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#2f3542]">Dwapar Edge</span>
          </div>
          <p className="text-[#576574] font-medium text-sm max-w-xs leading-relaxed">
            The modern operating system for foundries and manufacturing companies. Built for scale, speed, and precision.
          </p>
        </div>
        <div>
          <h4 className="font-extrabold text-[#2f3542] mb-4">Platform</h4>
          <ul className="space-y-3 text-sm font-semibold text-[#576574]">
            <li><a href="#modules" className="hover:text-[#4b6584] transition-colors">Modules</a></li>

            <li><a href="#product" className="hover:text-[#4b6584] transition-colors">Integrations</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-extrabold text-[#2f3542] mb-4">Company</h4>
          <ul className="space-y-3 text-sm font-semibold text-[#576574]">
            <li><a href="#" className="hover:text-[#4b6584] transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-[#4b6584] transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-[#4b6584] transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-semibold text-gray-400">&copy; {new Date().getFullYear()} Dwapar Edge. All rights reserved.</p>
      </div>
    </footer>
  );
}

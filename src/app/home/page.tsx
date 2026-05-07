"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Production from "@/components/Production";
import ProblemSolution from "@/components/ProblemSolution";
import Technologies from "@/components/Technologies";
import Founders from "@/components/Founders";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#2f3542] selection:bg-[#4b6584]/20 selection:text-[#2f3542] font-sans overflow-hidden">
      <Navbar />
      <main className="relative z-10 flex flex-col">
        <About />
        <Stats />
        <Production />
        <ProblemSolution />
        <Technologies />
        <Founders />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

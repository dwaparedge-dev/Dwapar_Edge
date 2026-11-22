"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Hero from "@/components/Hero";
import FactoReveal from "@/components/FactoReveal";
import Workflow from "@/components/Workflow";
import Production from "@/components/Production";
import ProblemSolution from "@/components/ProblemSolution";
import Founders from "@/components/Founders";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-ink text-bone selection:bg-gold/30 font-sans overflow-x-clip">
      <Navbar />
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Stats />
        <FactoReveal />
        <Production />
        <Workflow />
        <ProblemSolution />
        <Founders />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

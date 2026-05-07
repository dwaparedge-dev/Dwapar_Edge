"use client";
import React, { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-16 max-w-4xl mx-auto scroll-mt-24">
      <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="text-center mb-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Partner with Dwapar Edge</h2>
          <p className="text-gray-400">Ready to digitize your shop floor? Let's discuss your requirements.</p>
        </div>

        {status === "success" ? (
          <div className="text-center py-12 relative z-10 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#10b981]/20 text-[#10b981] flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message Sent</h3>
            <p className="text-gray-400">Our engineering team will reach out to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-400 uppercase">Full Name</label>
                <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-400 uppercase">Company Name</label>
                <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" placeholder="Acme Manufacturing" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase">Work Email</label>
              <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors" placeholder="john@acme.com" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-400 uppercase">Project Details</label>
              <textarea required rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-colors resize-none" placeholder="Tell us about your factory and edge computing needs..."></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "submitting"}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-indigo text-black font-bold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {status === "submitting" ? (
                <><span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full" /> Sending...</>
              ) : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

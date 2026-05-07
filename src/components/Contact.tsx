"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 lg:px-12 bg-[#f8f9fa] border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2f3542] mb-4">Get In Touch</h2>
          <p className="text-lg text-[#576574] max-w-2xl mx-auto">Ready to upgrade your foundry? Contact us today.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl max-w-5xl mx-auto">
          
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-[#2f3542] mb-6">Contact Information</h3>
              <p className="text-[#576574] font-medium mb-8 leading-relaxed">
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email Us</h4>
                    <a href="mailto:dwaparedge@gmail.com" className="font-bold text-[#2f3542] hover:text-[#4b6584] transition-colors">dwaparedge@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Headquarters</h4>
                    <span className="font-bold text-[#2f3542]">Gujarat, India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form action="mailto:dwaparedge@gmail.com" method="post" encType="text/plain" className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#2f3542]">Full Name</label>
                  <input type="text" name="name" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8f9fa] focus:bg-white focus:ring-2 focus:ring-[#4b6584] focus:border-transparent outline-none transition-all" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#2f3542]">Email Address</label>
                  <input type="email" name="email" placeholder="john@company.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8f9fa] focus:bg-white focus:ring-2 focus:ring-[#4b6584] focus:border-transparent outline-none transition-all" required />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#2f3542]">Company Name</label>
                <input type="text" name="company" placeholder="Acme Foundry Corp" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8f9fa] focus:bg-white focus:ring-2 focus:ring-[#4b6584] focus:border-transparent outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#2f3542]">Message</label>
                <textarea name="message" rows={4} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f8f9fa] focus:bg-white focus:ring-2 focus:ring-[#4b6584] focus:border-transparent outline-none transition-all resize-none" required></textarea>
              </div>
              <button type="submit" className="mt-2 w-full py-4 rounded-xl bg-[#4b6584] text-white font-bold transition-all shadow-md hover:shadow-lg hover:bg-[#3a4f6a] flex items-center justify-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

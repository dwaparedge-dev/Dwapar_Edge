import React from "react";
import { Mail, MapPin } from "lucide-react";
import { Section } from "./Section";

const field = "w-full bg-ink border border-line px-4 py-3 text-bone placeholder:text-dim focus:border-gold outline-none transition-colors";

export default function Contact() {
  return (
    <Section id="contact" tone="coal" pattern eyebrow="06 — Contact" title="Let's walk your shop floor." intro="Tell us about your plant. An engineer from our team replies within 24 hours.">
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col gap-4">
          <a href="mailto:info@dwaparedge.com" className="group bg-ink border border-line p-5 flex items-start gap-4 hover:border-gold transition-colors">
            <Mail className="w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Email</p>
              <p className="mt-1 text-bone group-hover:text-gold transition-colors break-all">info@dwaparedge.com</p>
            </div>
          </a>
          <div className="bg-ink border border-line p-5 flex items-start gap-4">
            <MapPin className="w-5 h-5 text-gold mt-0.5" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">Headquarters</p>
              <p className="mt-1 text-bone">Gujarat, India</p>
            </div>
          </div>
        </div>
        <form action="mailto:info@dwaparedge.com" method="post" encType="text/plain" className="lg:col-span-8 relative bg-ink border border-line p-6 md:p-8 flex flex-col gap-4">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
          <div className="grid sm:grid-cols-2 gap-4">
            <input className={field} type="text" name="name" placeholder="Full name" required />
            <input className={field} type="email" name="email" placeholder="Work email" required />
          </div>
          <input className={field} type="text" name="company" placeholder="Company / plant name" />
          <textarea className={`${field} resize-none`} name="message" rows={4} placeholder="What do you manufacture, and what would you like to fix?" required />
          <button type="submit" className="self-start px-7 py-3.5 bg-gold text-ink text-sm font-semibold hover:bg-gold2 transition-colors">Send message</button>
        </form>
      </div>
    </Section>
  );
}

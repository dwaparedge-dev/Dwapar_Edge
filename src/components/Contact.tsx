import React from "react";
import { Mail, MapPin } from "lucide-react";
import { Section } from "./Section";
import DemoForm from "./DemoForm";

export default function Contact() {
  return (
    <Section id="contact" tone="coal" pattern eyebrow="06 — Contact" title="Book a demo." intro="Leave your details and our team will call you to set up a walkthrough of FactoONE for your plant.">
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
        <DemoForm />
      </div>
    </Section>
  );
}

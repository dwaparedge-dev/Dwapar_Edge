import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { CONSENT_VERSION } from "@/lib/analytics/config";
import PrivacySettingsButton from "@/components/analytics/PrivacySettingsButton";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "What Dwapar Edge collects when you visit this website or book a demo, why, for how long, and how to use your rights under India's Digital Personal Data Protection Act, 2023.",
  alternates: { canonical: "/privacy" },
};

const h2 = "mt-10 text-xl font-semibold text-bone";
const p = "mt-3 text-muted leading-relaxed";
const li = "mt-2 text-muted leading-relaxed";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ink text-bone font-sans">
      <header className="border-b border-line">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
          <Link href="/" className="text-sm tracking-[0.2em] uppercase text-bone hover:text-gold transition-colors">Dwapar Edge</Link>
          <Link href="/" className="text-sm text-muted hover:text-bone transition-colors">Back to home</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">Privacy notice</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold">How we handle your data</h1>
        <p className="mt-3 text-dim text-sm">Version {CONSENT_VERSION} · written to follow the Digital Personal Data Protection Act, 2023 (India)</p>

        <h2 className={h2}>Who we are</h2>
        <p className={p}>{siteConfig.name}, {siteConfig.region}, India, is the data fiduciary for the personal data described here. You can reach us about anything in this notice at <a className="text-gold hover:text-gold2 underline underline-offset-2" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.</p>

        <h2 className={h2}>1. Website analytics (only if you say yes)</h2>
        <p className={p}>When you first open this site we ask whether we may count your visit. <strong className="text-bone">If you decline, or your browser sends a Do Not Track or Global Privacy Control signal, we measure nothing and store nothing on your device.</strong> If you accept, we record:</p>
        <ul className="list-disc pl-6 mt-3">
          <li className={li}>the pages you open (the address path only, never the part after a “?”) and how long each stays on screen, and how far you scroll;</li>
          <li className={li}>which parts of the home page you scroll to (for example “About” or “Contact”), and whether you start or send the demo form;</li>
          <li className={li}>roughly where you are, down to city, worked out from your internet address by our hosting provider;</li>
          <li className={li}>your browser, operating system and device type (phone, tablet or computer), and your language;</li>
          <li className={li}>how you found us: the website you came from and any campaign tags in the link (utm_source, utm_medium, utm_campaign);</li>
          <li className={li}>a random identifier that we create in your browser. It identifies a browser, not you by name.</li>
        </ul>
        <p className={p}><strong className="text-bone">What we do not collect:</strong> your IP address (it is used for a moment to find the city and to limit abuse, then discarded; it is never stored), your name, email or phone from analytics, precise location, what you type, or what you click inside forms. We do not run advertising, use advertising networks, or sell or share this data.</p>
        <p className={p}><strong className="text-bone">Why:</strong> to understand which pages are useful, which campaigns bring visitors, and where visitors come from, so we can improve the site. This is the only purpose.</p>
        <p className={p}><strong className="text-bone">What stays on your device:</strong> only after you accept, the site keeps a random browser identifier, a short-lived visit record and your choice in your browser&apos;s local storage (names: de_vid, de_sess, de_consent). No third-party cookies are used.</p>

        <h2 className={h2}>2. Booking a demo</h2>
        <p className={p}>If you use the “Book a demo” form we collect the name, company, mobile number and email you type, so that our team can call or write to you about FactoONE and arrange a demo. Our servers also keep a one-way scrambled form of your internet address and the type of browser, to spot spam. Providing these details is voluntary; without them we cannot contact you.</p>
        <p className={p}>If you had accepted analytics, the request is linked to the random browser identifier above, so our sales team can see which pages led you to ask for a demo. If you had declined, no such link is made.</p>

        <h2 className={h2}>3. How long we keep it</h2>
        <ul className="list-disc pl-6 mt-3">
          <li className={li}>Analytics records: erased automatically after 13 months.</li>
          <li className={li}>Demo requests: kept while we are in touch with you and while the enquiry is relevant, and erased when you ask us to, or when they are no longer needed.</li>
        </ul>

        <h2 className={h2}>4. Who can see it</h2>
        <p className={p}>Only authorised members of our team, inside our internal business system, with access limited to those who need it. Our hosting and database providers process the data on our instructions and under their security obligations; they may run servers outside India, which the Act permits unless the Government restricts a country. We do not sell your data or use it for profiling beyond the purposes above. We disclose it only if the law requires us to.</p>

        <h2 className={h2}>5. Your choices and rights</h2>
        <p className={p}>You can take back your permission at any time, as easily as you gave it:</p>
        <p className="mt-3"><PrivacySettingsButton className="px-5 py-2.5 text-sm font-semibold border border-line text-bone hover:border-gold transition-colors" /></p>
        <p className={p}>Turning analytics off stops measuring immediately, removes the identifier from your browser and asks our server to erase the visit data held for it.</p>
        <p className={p}>Under the Act you may also ask us for a summary of the personal data we hold about you and how it is used, ask us to correct or complete it, ask us to erase it, and use our grievance process; you may also nominate another person to exercise these rights if you die or become unable to. Email <a className="text-gold hover:text-gold2 underline underline-offset-2" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> from the address you gave us. We will acknowledge within 3 working days and answer within the time the law allows.</p>
        <p className={p}>If you are not satisfied with our response you may complain to the Data Protection Board of India once it is constituted.</p>

        <h2 className={h2}>6. Children</h2>
        <p className={p}>This website is for businesses and is not directed at children. We do not knowingly collect data from anyone under 18.</p>

        <h2 className={h2}>7. Changes</h2>
        <p className={p}>If we change this notice in a way that matters (new data or a new purpose), we will update the version above and ask for your permission again.</p>
      </main>
    </div>
  );
}

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
import { siteConfig } from "@/lib/site";

const orgId = `${siteConfig.url}/#organization`;

// Structured data: tells Google who the company is, what FactoONE is, and who runs it.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon-512.png`,
      description: siteConfig.description,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        addressRegion: siteConfig.region,
        addressCountry: siteConfig.country,
      },
      areaServed: "IN",
      knowsAbout: ["Manufacturing ERP", "MES", "OEE monitoring", "Production planning", "Shop floor management", "Industrial IoT"],
      founder: siteConfig.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.jobTitle })),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: "en-IN",
      publisher: { "@id": orgId },
    },
    {
      "@type": "SoftwareApplication",
      name: siteConfig.productName,
      url: siteConfig.productUrl,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Manufacturing ERP and MES",
      operatingSystem: "Web",
      description:
        "ERP + MES platform for manufacturing factories of every kind: paperless process entry, lot traceability, raw material and inventory control, live OEE and downtime alerts, roles and permissions, and a built-in AI assistant.",
      publisher: { "@id": orgId },
      inLanguage: ["en", "hi", "gu"],
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-ink text-bone selection:bg-gold/30 font-sans overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
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

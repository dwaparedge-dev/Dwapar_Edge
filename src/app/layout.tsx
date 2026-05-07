import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dwapar Edge | Industrial IoT Gateway & Edge Intelligence Platform",
  description: "Next-generation industrial IoT gateway that brings low-latency machine telemetry, real-time edge AI analytics, and flawless syncing with Factory Plus manufacturing ERP.",
  keywords: [
    "Industrial IoT",
    "Edge Computing",
    "Edge AI",
    "Machine Telemetry",
    "Smart Manufacturing",
    "Factory Plus",
    "OPC-UA",
    "Modbus",
    "MQTT Gateway"
  ],
  authors: [{ name: "Dwapar Edge" }],
  openGraph: {
    title: "Dwapar Edge | Industrial IoT Gateway & Edge Intelligence",
    description: "Next-generation industrial IoT edge platform for real-time machine telemetry, local edge AI analytics, and seamless Factory Plus cloud ERP integration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-[#f3f4f6]">
        {children}
      </body>
    </html>
  );
}

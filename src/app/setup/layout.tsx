import type { Metadata } from "next";

// Device demo screen: keep it out of search results.
export const metadata: Metadata = {
  title: "Gateway Setup",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

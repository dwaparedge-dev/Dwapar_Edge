import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// /setup and /console are device demo screens; they carry a noindex meta tag (see their layout.tsx)
// rather than a Disallow here, so crawlers can actually read that noindex.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}

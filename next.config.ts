import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // The homepage used to live at /home; keep old links and any indexed URL pointing at the canonical root.
    return [{ source: "/home", destination: "/", permanent: true }];
  },
};

export default nextConfig;

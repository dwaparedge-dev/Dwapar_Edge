import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${siteConfig.name} — ERP & MES software for manufacturing factories`;

// Shared renderer for opengraph-image and twitter-image (the link preview on WhatsApp, LinkedIn, X, Slack).
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#100f0c",
          backgroundImage: "radial-gradient(ellipse at top left, rgba(201,165,78,0.22), transparent 60%)",
          color: "#f3efe6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 8, textTransform: "uppercase" }}>
          <div style={{ width: 16, height: 16, background: "#c9a54e" }} />
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Intelligence for the</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#c9a54e" }}>modern factory floor.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#aaa497" }}>
            FactoONE · ERP + MES + live OEE for every kind of factory
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#aaa497", borderTop: "1px solid #2a2d33", paddingTop: 24 }}>
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
          <span>Gujarat, India</span>
        </div>
      </div>
    ),
    ogSize,
  );
}

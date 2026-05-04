import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mizan — Wealth, in balance.";

export default async function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0A0B10",
        backgroundImage:
          "radial-gradient(circle at 80% 30%, rgba(212,165,116,0.18), transparent 60%), radial-gradient(circle at 20% 80%, rgba(212,165,116,0.08), transparent 50%)",
        color: "#F4F2EC",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 10,
            background: "#14161E",
            border: "1px solid rgba(212,165,116,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#D4A574",
            fontFamily: "monospace",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          M
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            color: "#F4F2EC",
          }}
        >
          Mizan
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 128,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            fontWeight: 300,
            color: "#F4F2EC",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Wealth,</span>
          <span style={{ color: "#D4A574", fontStyle: "italic" }}>in balance.</span>
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 24,
            color: "#B8B4A8",
            maxWidth: 720,
            display: "flex",
          }}
        >
          The private portfolio tracker for serious investors.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 24,
          fontFamily: "monospace",
          fontSize: 14,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#8B6F47",
        }}
      >
        <span>Local-first</span>
        <span>·</span>
        <span>End-to-end encrypted</span>
        <span>·</span>
        <span>Open source</span>
      </div>
    </div>,
    size,
  );
}

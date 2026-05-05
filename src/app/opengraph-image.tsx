import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mizan — A private portfolio terminal.";

/**
 * 1200×630 OG image. Dark bg, Fraunces-equivalent serif headline 'Wealth, in
 * balance.' centered, gold-cream emphasis on the italic 'in balance.'
 * No decoration beyond a single hairline gold-deep frame and the 'M' mark.
 */
export default async function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        background: "#0A0B10",
        backgroundImage:
          "radial-gradient(circle at 50% 38%, rgba(245,230,200,0.06), transparent 55%)",
        color: "#F4F2EC",
        position: "relative",
      }}
    >
      {/* Hairline frame */}
      <div
        style={{
          position: "absolute",
          inset: 32,
          border: "1px solid rgba(139,111,71,0.28)",
          borderRadius: 4,
          display: "flex",
        }}
      />

      {/* Top-left mark */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 56,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            color: "#F5E6C8",
            fontFamily: "Georgia, serif",
            fontSize: 32,
            lineHeight: 1,
            fontWeight: 500,
            display: "flex",
          }}
        >
          M
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            color: "#F4F2EC",
            display: "flex",
          }}
        >
          Mizan
        </div>
      </div>

      {/* Headline */}
      <div
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 156,
          lineHeight: 1.0,
          letterSpacing: "-0.04em",
          color: "#F4F2EC",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <span style={{ display: "flex" }}>Wealth,</span>
        <span
          style={{
            color: "#F5E6C8",
            fontStyle: "italic",
            display: "flex",
          }}
        >
          in balance.
        </span>
      </div>

      {/* Bottom-left tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: 56,
          right: 56,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontFamily: "monospace",
          fontSize: 16,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#8B6F47",
        }}
      >
        <div style={{ display: "flex" }}>A private portfolio terminal</div>
        <div style={{ display: "flex" }}>mizan.app</div>
      </div>
    </div>,
    size,
  );
}

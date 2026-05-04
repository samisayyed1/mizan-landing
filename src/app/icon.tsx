import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0B10",
        color: "#D4A574",
        fontSize: 24,
        fontWeight: 700,
        fontFamily: "ui-monospace, SF Mono, monospace",
        borderRadius: 6,
      }}
    >
      M
    </div>,
    size,
  );
}

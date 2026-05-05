import { Fraunces, Geist, Geist_Mono } from "next/font/google";

/**
 * Fraunces — display headlines only. opsz/SOFT/WONK axes used via
 * font-variation-settings in globals.css utilities.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  adjustFontFallback: true,
});

/** Geist — body, UI labels. */
export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: true,
});

/** Geist Mono — every number on the page. tabular-nums via .font-mono-data. */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  weight: ["400", "500"],
  adjustFontFallback: true,
});

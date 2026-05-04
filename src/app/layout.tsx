import { JsonLd } from "@/components/seo/json-ld";
import { fraunces, geist, geistMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mizan.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mizan — Wealth, in balance.",
    template: "%s — Mizan",
  },
  description:
    "The private portfolio tracker for serious investors. Local-first. End-to-end encrypted. Open source.",
  applicationName: "Mizan",
  authors: [{ name: "Sami Sayyed" }],
  creator: "Sami Sayyed",
  keywords: [
    "portfolio tracker",
    "investment tracker",
    "local-first finance",
    "open source portfolio",
    "private wealth software",
    "Mizan",
  ],
  openGraph: {
    type: "website",
    siteName: "Mizan",
    title: "Mizan — Wealth, in balance.",
    description:
      "The private portfolio tracker for serious investors. Local-first. End-to-end encrypted. Open source.",
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mizan — Wealth, in balance.",
    description:
      "The private portfolio tracker for serious investors. Local-first. End-to-end encrypted. Open source.",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0B10",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(fraunces.variable, geist.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
      <body className="bg-[var(--bg-base)] text-[var(--text-primary)] antialiased">{children}</body>
    </html>
  );
}

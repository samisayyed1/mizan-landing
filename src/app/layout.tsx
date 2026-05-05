import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { fraunces, geist, geistMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mizan.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mizan — A private portfolio terminal.",
    template: "%s — Mizan",
  },
  description:
    "A private portfolio terminal for investors who actually own their capital. Stewardship over speculation. Restraint over noise.",
  applicationName: "Mizan",
  keywords: [
    "portfolio terminal",
    "private portfolio tracker",
    "investment terminal",
    "wealth management software",
    "Mizan",
  ],
  openGraph: {
    type: "website",
    siteName: "Mizan",
    title: "Mizan — A private portfolio terminal.",
    description:
      "Stewardship over speculation. Restraint over noise. Wealth, in balance.",
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mizan — A private portfolio terminal.",
    description:
      "Stewardship over speculation. Restraint over noise. Wealth, in balance.",
  },
  alternates: { canonical: siteUrl },
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
      <body className="bg-[var(--bg-base)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}

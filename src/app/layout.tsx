import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { fraunces, geist, geistMono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mizan.app";

const description =
  "A private portfolio terminal for investors who actually own their capital. Track every position across every custodian on the device you own. Stewardship over speculation. Restraint over noise.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mizan — A private portfolio terminal.",
    template: "%s — Mizan",
  },
  description,
  applicationName: "Mizan",
  authors: [{ name: "Sami Sayyed" }],
  creator: "Sami Sayyed",
  publisher: "Mizan, Ltd.",
  keywords: [
    "private portfolio terminal",
    "investment terminal",
    "wealth management software",
    "portfolio tracker",
    "multi-currency portfolio",
    "private banking software",
    "Mizan",
  ],
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: "Mizan",
    title: "Mizan — A private portfolio terminal.",
    description,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mizan — Wealth, in balance.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mizan — A private portfolio terminal.",
    description,
    images: ["/opengraph-image"],
  },
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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

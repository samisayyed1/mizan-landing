import { brand } from "@/content/copy";

/**
 * SoftwareApplication schema. No upstream attribution. No repo links.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: brand.name,
    description:
      "A private portfolio terminal for investors who actually own their capital. Stewardship over speculation. Restraint over noise.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "macOS, Windows, Linux",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `https://${brand.domain}`,
  };
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Standard JSON-LD pattern.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

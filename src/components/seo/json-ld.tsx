import { brand } from "@/content/copy";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: brand.name,
    description:
      "The portfolio tracker for serious investors. Local-first. End-to-end encrypted. Open source.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "macOS, Windows, Linux",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `https://${brand.domain}`,
    sameAs: [brand.desktopRepoUrl, brand.connectRepoUrl],
    author: {
      "@type": "Person",
      name: "Sami Sayyed",
    },
    license: "https://www.gnu.org/licenses/agpl-3.0.html",
  };
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Standard pattern for JSON-LD.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

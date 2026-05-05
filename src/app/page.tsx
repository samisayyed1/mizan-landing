import { BentoGrid } from "@/components/bento/bento-grid";
import { FounderLetter } from "@/components/founder/founder-letter";
import { Hero } from "@/components/hero/hero";
import { PricingSection } from "@/components/pricing/pricing-section";
import { SecurityTrio } from "@/components/security/security-trio";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { StatsStrip } from "@/components/stats/stats-strip";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <ShowcaseSection />
      <BentoGrid />
      <FounderLetter />
      <SecurityTrio />
      <PricingSection />
    </main>
  );
}

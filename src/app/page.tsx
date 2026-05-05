import { BentoGrid } from "@/components/bento/bento-grid";
import { FaqSection } from "@/components/faq/faq-section";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer/footer";
import { FounderLetter } from "@/components/founder/founder-letter";
import { Hero } from "@/components/hero/hero";
import { Nav } from "@/components/nav/nav";
import { PricingSection } from "@/components/pricing/pricing-section";
import { SecurityTrio } from "@/components/security/security-trio";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { StatsStrip } from "@/components/stats/stats-strip";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <StatsStrip />
        <ShowcaseSection />
        <BentoGrid />
        <FounderLetter />
        <SecurityTrio />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

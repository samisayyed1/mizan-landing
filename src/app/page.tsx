import { ConnectSection } from "@/components/connect/connect-section";
import { FaqSection } from "@/components/faq/faq-section";
import { FeaturesSection } from "@/components/features/features-section";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/components/hero/hero";
import { HowItWorks } from "@/components/how-it-works/how-it-works";
import { Nav } from "@/components/nav/nav";
import { PrivacyManifesto } from "@/components/privacy/privacy-manifesto";
import { ProductShot } from "@/components/product-shot/product-shot";
import { Testimonials } from "@/components/trust/testimonials";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <ProductShot />
        <FeaturesSection />
        <ConnectSection />
        <HowItWorks />
        <PrivacyManifesto />
        <Testimonials />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

import { Hero } from "@/components/hero/hero";
import { ShowcaseSection } from "@/components/showcase/showcase-section";
import { StatsStrip } from "@/components/stats/stats-strip";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <ShowcaseSection />
    </main>
  );
}

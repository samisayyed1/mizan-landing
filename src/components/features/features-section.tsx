import { Reveal } from "@/components/ui/reveal";
import { featuresCopy } from "@/content/copy";
import { features } from "@/content/features";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative mx-auto max-w-container px-6 py-32 md:px-10 md:py-40"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
          {featuresCopy.eyebrow}
        </p>
        <h2
          id="features-heading"
          className="mt-4 font-serif text-4xl font-light tracking-[-0.02em] text-[var(--text-primary)] md:text-5xl"
        >
          {featuresCopy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
          {featuresCopy.subtitle}
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <FeatureCard key={f.id} feature={f} delay={i * 0.05} />
        ))}
      </div>
    </section>
  );
}

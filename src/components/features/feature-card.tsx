import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Feature } from "@/types";

type Props = {
  feature: Feature;
  delay?: number;
};

export function FeatureCard({ feature, delay = 0 }: Props) {
  const Icon = feature.icon;
  return (
    <Reveal delay={delay} className="h-full">
      <SpotlightCard className="flex h-full flex-col gap-6">
        <span
          aria-hidden
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] text-[var(--gold-primary)] transition-colors duration-300 group-hover:border-[var(--gold-primary)]/40 group-hover:text-[var(--gold-cream)]"
        >
          <Icon />
        </span>
        <div>
          <h3 className="font-serif text-xl font-light tracking-tight text-[var(--text-primary)]">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {feature.body}
          </p>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

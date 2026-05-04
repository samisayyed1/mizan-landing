import { Reveal } from "@/components/ui/reveal";
import { connectCopy } from "@/content/copy";
import { DataFlowDiagram } from "./data-flow-diagram";
import { PricingTiers } from "./pricing-tiers";
import { WaitlistForm } from "./waitlist-form";

export function ConnectSection() {
  return (
    <section
      id="connect"
      aria-labelledby="connect-heading"
      className="relative isolate overflow-hidden border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]/30"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)]/40 to-transparent"
      />
      <div className="mx-auto max-w-container px-6 py-32 md:px-10 md:py-40">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
            {connectCopy.eyebrow}
          </p>
          <h2
            id="connect-heading"
            className="mt-4 font-serif text-4xl font-light tracking-[-0.02em] text-[var(--text-primary)] md:text-5xl"
          >
            {connectCopy.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            {connectCopy.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-20">
          <DataFlowDiagram />
        </Reveal>

        <PricingTiers />

        <Reveal delay={0.2} className="mt-16">
          <WaitlistForm />
        </Reveal>
      </div>
    </section>
  );
}

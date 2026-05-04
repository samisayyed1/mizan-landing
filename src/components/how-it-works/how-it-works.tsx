import { Reveal } from "@/components/ui/reveal";
import { howItWorksCopy } from "@/content/copy";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="relative mx-auto max-w-container px-6 py-32 md:px-10 md:py-40"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
          {howItWorksCopy.eyebrow}
        </p>
        <h2
          id="how-heading"
          className="mt-4 font-serif text-4xl font-light tracking-[-0.02em] text-[var(--text-primary)] md:text-5xl"
        >
          {howItWorksCopy.title}
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-3">
        {howItWorksCopy.steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.08}>
            <div className="relative h-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
                {step.n}
              </div>
              <h3 className="mt-6 font-serif text-2xl font-light tracking-tight text-[var(--text-primary)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {step.body}
              </p>
              {/* Vertical accent line */}
              <div
                aria-hidden
                className="absolute right-6 top-6 h-12 w-px bg-gradient-to-b from-[var(--gold-primary)]/40 to-transparent"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

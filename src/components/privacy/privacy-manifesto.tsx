import { Reveal } from "@/components/ui/reveal";
import { privacyCopy } from "@/content/copy";

export function PrivacyManifesto() {
  return (
    <section
      id="privacy"
      aria-labelledby="privacy-heading"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(212,165,116,0.06),transparent_60%)]"
      />
      <div className="mx-auto max-w-container px-6 py-32 md:px-10 md:py-44">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
            {privacyCopy.eyebrow}
          </p>
          <h2
            id="privacy-heading"
            className="mt-6 font-serif text-[clamp(2.75rem,6vw,5rem)] font-light leading-[1.05] tracking-[-0.025em] text-[var(--text-primary)]"
          >
            <span className="block">Your money is</span>
            <span className="gold-text block italic">your business.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
            {privacyCopy.body}
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3">
          {privacyCopy.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="bg-[var(--bg-surface)] p-8">
              <div className="flex h-full flex-col">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-2xl font-light tracking-tight text-[var(--text-primary)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

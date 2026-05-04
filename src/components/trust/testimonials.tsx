import { Reveal } from "@/components/ui/reveal";
import { brand, trustCopy } from "@/content/copy";
import { Github } from "lucide-react";

export function Testimonials() {
  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="relative mx-auto max-w-container px-6 py-32 md:px-10 md:py-40"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
          {trustCopy.eyebrow}
        </p>
        <h2
          id="trust-heading"
          className="mt-4 font-serif text-4xl font-light tracking-[-0.02em] text-[var(--text-primary)] md:text-5xl"
        >
          {trustCopy.title}
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center justify-center gap-8">
        <a
          href={brand.desktopRepoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full border border-[var(--border-default)] px-4 py-2 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)]"
        >
          <Github aria-hidden className="h-3.5 w-3.5" />
          <span className="font-mono uppercase tracking-[0.18em]">AGPL-3.0 on GitHub</span>
        </a>
        <span className="inline-flex items-center gap-3 rounded-full border border-[var(--border-default)] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          SnapTrade Partner
        </span>
        <span className="inline-flex items-center gap-3 rounded-full border border-[var(--border-default)] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          SOC 2 (in progress)
        </span>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-2">
        {trustCopy.testimonials.map((t, i) => (
          <Reveal key={t.initials} delay={i * 0.06} className="bg-[var(--bg-surface)] p-8 md:p-10">
            <p className="font-serif text-lg font-light leading-relaxed text-[var(--text-primary)] md:text-xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--gold-primary)]/30 bg-[var(--bg-base)] font-mono text-xs text-[var(--gold-primary)]"
              >
                {t.initials}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {t.role}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

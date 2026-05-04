import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { brand, finalCtaCopy } from "@/content/copy";

export function FinalCta() {
  return (
    <section
      id="get-started"
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--gold-primary)]/30 to-transparent"
      />
      <div className="mx-auto max-w-container px-6 py-32 md:px-10 md:py-44">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2
            id="final-cta-heading"
            className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.025em] text-[var(--text-primary)]"
          >
            <span className="block">Built for investors who</span>
            <span className="gold-text block italic">actually own their portfolio.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
            {finalCtaCopy.body}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={brand.releasesUrl} variant="primary" external>
              {finalCtaCopy.cta}
            </Button>
            <Button href={brand.desktopRepoUrl} variant="ghost" external withArrow>
              View on GitHub
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

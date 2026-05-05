import { MagneticButton } from "@/components/ui/magnetic-button";
import { heroCopy } from "@/content/copy";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AmbientGold } from "./ambient-gold";
import { Crosshairs } from "./crosshairs";
import { GridGuides } from "./grid-guides";
import { HeroTerminal } from "./hero-terminal";
import { ScrollCue } from "./scroll-cue";
import { TrustStrip } from "./trust-strip";

/**
 * Editorial layered hero — full premium choreography via CSS animations.
 *
 * Entrance is pure CSS (hero-rise / hero-fade / hero-tilt-in keyframes
 * + delay-N classes). Live behaviors (magnetic button, ticker, hover
 * lifts) attach via Motion post-hydration. This split keeps the LCP
 * paint-only and guarantees the entrance choreography fires regardless
 * of Motion's mount-effect timing.
 *
 * Choreography:
 *   0.00s  Eyebrow (pulse dot + private portfolio terminal)
 *   0.15s  Headline line 1 — Wealth,
 *   0.27s  Headline line 2 — italic gold-gradient 'in'
 *   0.39s  Headline line 3 — balance.
 *   0.55s  Terminal tilts in
 *   0.70s  Subhead
 *   0.95s  CTAs
 *   1.10s  Trust strip pills (handled inside TrustStrip)
 *   2.20s  Scroll cue (handled inside ScrollCue)
 */
export function Hero() {
  const [line1, line2, line3] = heroCopy.headline;

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <AmbientGold />
      <GridGuides />
      <Crosshairs />

      <div className="relative mx-auto max-w-[var(--container-default)] px-6 pt-24 pb-24 md:px-10 md:pt-28 lg:pt-32 lg:pb-32">
        <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
          {/* Editorial column */}
          <div className="lg:col-span-7">
            <div className="hero-fade delay-0 inline-flex items-center gap-2">
              <span
                aria-hidden
                className="pulse-dot block h-1.5 w-1.5 rounded-full bg-[var(--gold-cream)]"
              />
              <p className="eyebrow text-[var(--gold-cream)]">{heroCopy.eyebrow}</p>
            </div>

            <h1
              id="hero-heading"
              className="mt-6 text-balance font-display text-[var(--text-primary)] text-glow-gold"
              style={{
                fontSize: "clamp(44px, 7.6vw, 124px)",
                lineHeight: 0.92,
              }}
            >
              <span className="hero-rise delay-1 block">{line1}</span>
              <span className="hero-rise delay-2 block italic">
                <span className="gold-gradient-text">{line2}</span>
              </span>
              <span className="hero-rise delay-3 block">{line3}</span>
            </h1>

            <p className="hero-fade delay-5 mt-8 max-w-xl text-balance text-[17px] leading-relaxed text-[var(--text-muted)] md:text-lg">
              {heroCopy.subhead}
            </p>

            <div className="hero-fade delay-7 mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
              <MagneticButton href="/contact" variant="primary">
                {heroCopy.primaryCta}
              </MagneticButton>

              <Link
                href="/#founder"
                className="group inline-flex items-center gap-1 text-sm tracking-tight text-[var(--gold-cream)] transition-colors duration-150 hover:text-[var(--gold-primary)]"
              >
                {heroCopy.tertiaryCta}
                <ArrowRight
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-1"
                />
              </Link>
            </div>

            <TrustStrip />
          </div>

          {/* Terminal column */}
          <div className="relative lg:col-span-5">
            <div className="hero-tilt-in delay-4">
              <HeroTerminal />
            </div>
          </div>
        </div>

        {/* Hero accent line — draws across on load */}
        <div
          className="accent-line pointer-events-none absolute inset-x-0 bottom-0 h-px"
          aria-hidden
        >
          <div className="mx-auto h-px max-w-[var(--container-default)] bg-gradient-to-r from-transparent via-[rgba(212,165,116,0.5)] to-transparent" />
        </div>
      </div>

      <ScrollCue />

      {/* Soft fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg-base)]" />
    </section>
  );
}

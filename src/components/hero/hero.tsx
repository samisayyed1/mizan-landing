import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { heroCopy } from "@/content/copy";
import { BalanceScale } from "./balance-scale";
import { Crosshairs } from "./crosshairs";
import { GridGuides } from "./grid-guides";

/**
 * Editorial layered hero.
 *
 * z-order (bottom → top):
 *  1. radial gold-cream bloom behind headline (CSS only, no JS)
 *  2. CSS grid guides — 12-column hairlines at lg
 *  3. SVG balance-scale icon, animated path-draw on enter
 *  4. crosshair print-marks at quadrant intersections
 *  5. headline + subhead + primary CTA + tertiary link
 *
 * Hero text + grid + crosshairs render server-side in pure HTML/CSS so LCP
 * is paint-only. Motion attaches post-hydration.
 */
export function Hero() {
  const [line1, line2, line3] = heroCopy.headline;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Radial gold-cream bloom (server-rendered, masked behind headline) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80vh] w-[80vw] max-h-[900px] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 [background:radial-gradient(ellipse_at_center,rgba(245,230,200,0.05)_0%,rgba(245,230,200,0.025)_30%,transparent_60%)]"
      />

      <GridGuides />
      <Crosshairs />

      <div className="mx-auto flex min-h-[100svh] max-w-[var(--container-default)] flex-col px-6 pt-32 md:px-10 lg:pt-40">
        <div className="relative grid flex-1 grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* Decorative balance-scale icon — top-right of hero */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 hidden text-[var(--gold-deep)] md:block lg:right-4 lg:top-8"
          >
            <BalanceScale className="h-32 w-32 lg:h-44 lg:w-44 opacity-60" />
          </div>

          {/* Editorial column — text first */}
          <div className="lg:col-span-9">
            <p className="eyebrow">{heroCopy.eyebrow}</p>

            <h1
              id="hero-heading"
              className="mt-6 text-balance font-display text-[var(--text-primary)]"
              style={{
                fontSize: "clamp(48px, 8.5vw, 144px)",
                lineHeight: 0.95,
              }}
            >
              <span className="block">{line1}</span>
              <span className="block italic text-[var(--gold-cream)]">
                {line2}
              </span>
              <span className="block">{line3}</span>
            </h1>

            <p className="mt-10 max-w-xl text-balance text-lg leading-relaxed text-[var(--text-muted)]">
              {heroCopy.subhead}
            </p>

            <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
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
          </div>
        </div>
      </div>

      {/* Soft fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg-base)]" />
    </section>
  );
}

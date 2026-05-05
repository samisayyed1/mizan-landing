"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { heroCopy } from "@/content/copy";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AmbientGold } from "./ambient-gold";
import { BalanceScale } from "./balance-scale";
import { Crosshairs } from "./crosshairs";
import { GridGuides } from "./grid-guides";
import { HeroTerminal } from "./hero-terminal";
import { ScrollCue } from "./scroll-cue";
import { TrustStrip } from "./trust-strip";

const HEADLINE_VARIANTS = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      delay: 0.15 + i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/**
 * Editorial layered hero — full premium choreography.
 *
 * z-order (bottom → top):
 *  1. AmbientGold — three drifting blurred blobs + 12 floating motes,
 *     pure CSS animation (no JS), gated by prefers-reduced-motion.
 *  2. CSS grid guides — 12-column hairlines.
 *  3. Crosshair print-marks at quadrants.
 *  4. Large balance-scale SVG behind right column with motion path-draw.
 *  5. Headline (line-by-line stagger with blur-to-clear), subhead, CTAs,
 *     trust strip — all on a 0.15s base + 0.12s stagger.
 *  6. HeroTerminal with live ticker, 3D-perspective tilt, hover lift.
 *  7. ScrollCue at bottom — pulsing gold hairline with "Scroll" label.
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
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2"
            >
              <span
                aria-hidden
                className="pulse-dot block h-1.5 w-1.5 rounded-full bg-[var(--gold-cream)]"
              />
              <p className="eyebrow text-[var(--gold-cream)]">{heroCopy.eyebrow}</p>
            </motion.div>

            <h1
              id="hero-heading"
              className="mt-6 text-balance font-display text-[var(--text-primary)] text-glow-gold"
              style={{
                fontSize: "clamp(44px, 7.6vw, 124px)",
                lineHeight: 0.92,
              }}
            >
              <motion.span
                custom={0}
                initial="hidden"
                animate="show"
                variants={HEADLINE_VARIANTS}
                className="block"
              >
                {line1}
              </motion.span>
              <motion.span
                custom={1}
                initial="hidden"
                animate="show"
                variants={HEADLINE_VARIANTS}
                className="block italic gold-gradient-text"
              >
                {line2}
              </motion.span>
              <motion.span
                custom={2}
                initial="hidden"
                animate="show"
                variants={HEADLINE_VARIANTS}
                className="block"
              >
                {line3}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 max-w-xl text-balance text-[17px] leading-relaxed text-[var(--text-muted)] md:text-lg"
            >
              {heroCopy.subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6"
            >
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
            </motion.div>

            <TrustStrip />
          </div>

          {/* Terminal preview column */}
          <div className="relative lg:col-span-5">
            {/* Large decorative balance scale behind the terminal */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-12 -z-10 hidden text-[var(--gold-deep)] opacity-40 lg:block xl:-right-16"
            >
              <BalanceScale className="h-[260px] w-[260px] xl:h-[320px] xl:w-[320px]" />
            </div>

            <HeroTerminal />
          </div>
        </div>

        {/* Hero accent line — draws across on load */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="accent-line pointer-events-none absolute inset-x-0 bottom-0 h-px"
          aria-hidden
        >
          <div className="mx-auto h-px max-w-[var(--container-default)] bg-gradient-to-r from-transparent via-[rgba(212,165,116,0.5)] to-transparent" />
        </motion.div>
      </div>

      <ScrollCue />

      {/* Soft fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg-base)]" />
    </section>
  );
}

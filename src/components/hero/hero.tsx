"use client";

import { Button } from "@/components/ui/button";
import { brand, heroCopy } from "@/content/copy";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LiveTicker } from "./live-ticker";
import { SphereLazy } from "./sphere-lazy";
import { TrustStrip } from "./trust-strip";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="mx-auto flex min-h-[100svh] max-w-container flex-col px-6 pt-32 md:px-10 lg:pt-36">
        <div className="grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.33, 1, 0.68, 1] }}
            className="lg:col-span-7"
          >
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)]/60 px-3.5 py-1.5 backdrop-blur">
              <span aria-hidden className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold-primary)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--gold-primary)]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                {heroCopy.badge}
              </span>
            </div>

            <h1
              id="hero-heading"
              className="font-serif text-[clamp(3.5rem,9vw,9rem)] font-light leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]"
            >
              <span className="block">Wealth,</span>
              <span className="block italic">in </span>
              <span className="gold-text block italic">balance.</span>
            </h1>

            <p className="mt-8 max-w-[540px] text-lg leading-relaxed text-[var(--text-secondary)]">
              {heroCopy.subhead}
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href={brand.releasesUrl} variant="primary" external>
                {heroCopy.primaryCta}
              </Button>
              <Button href="#connect" variant="ghost" withArrow>
                {heroCopy.secondaryCta}
              </Button>
            </div>

            <TrustStrip />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.15,
              ease: [0.33, 1, 0.68, 1],
            }}
            className="relative aspect-square w-full lg:col-span-5 lg:aspect-auto lg:h-[560px]"
          >
            <SphereLazy />
          </motion.div>
        </div>

        <div className="mt-auto pt-16 lg:pt-24">
          <LiveTicker />
        </div>
      </div>

      {/* Decorative bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--bg-base)]" />

      {/* Hidden anchor for skip-to-product flow */}
      <a
        href="#product"
        className="sr-only focus:not-sr-only focus:absolute focus:bottom-4 focus:left-4 focus:rounded focus:bg-[var(--gold-primary)] focus:px-3 focus:py-1.5 focus:text-xs focus:text-[var(--bg-base)]"
      >
        <ArrowRight aria-hidden className="inline h-3 w-3" /> Skip to product
      </a>
    </section>
  );
}

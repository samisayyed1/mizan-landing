"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { finalCtaCopy } from "@/content/copy";
import { VIEWPORT_DEFAULT, fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCta() {
  return (
    <section
      id="get-started"
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,165,116,0.4)] to-transparent"
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_DEFAULT}
        variants={fadeUp}
        className="mx-auto max-w-[var(--container-default)] px-6 py-32 md:px-10 md:py-44"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="final-cta-heading"
            className="font-display text-balance text-[var(--text-primary)]"
            style={{
              fontSize: "clamp(40px, 6vw, 88px)",
              lineHeight: 1.05,
              fontVariationSettings: "'opsz' 144, 'wght' 400, 'SOFT' 30, 'WONK' 0",
            }}
          >
            <span className="block">{finalCtaCopy.headlinePre}</span>
            <span className="block italic text-[var(--gold-cream)]">
              {finalCtaCopy.headlineEmphasis}
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
            {finalCtaCopy.subhead}
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <MagneticButton href="/download" variant="primary">
              {finalCtaCopy.primaryCta}
            </MagneticButton>
            <Link
              href="/#founder"
              className="group inline-flex items-center gap-1 text-sm tracking-tight text-[var(--gold-cream)] transition-colors duration-150 hover:text-[var(--gold-primary)]"
            >
              {finalCtaCopy.tertiaryCta}
              <ArrowRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

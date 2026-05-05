"use client";

import { motion } from "framer-motion";
import { founderCopy } from "@/content/copy";
import { fadeUp, VIEWPORT_DEFAULT } from "@/lib/motion";

/**
 * Editorial founder letter. Single column, 600px max, ~280 words.
 * Fraunces opsz 9 for body — small-optical-size readable serif.
 * Drop-cap 'M' in opsz 144 (display).
 *
 * Tone: Patek. Quiet, confident, generational.
 */
export function FounderLetter() {
  const [first, ...rest] = founderCopy.paragraphs;
  const firstChar = first?.[0] ?? "M";
  const firstRest = first?.slice(1) ?? "";

  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Soft horizontal hairlines top + bottom — editorial frame */}
      <div className="border-t border-[var(--border-subtle)]" />

      <div className="mx-auto max-w-[var(--container-default)] px-6 py-32 md:px-10 md:py-44">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_DEFAULT}
          variants={fadeUp}
          className="mx-auto max-w-[640px]"
        >
          <p className="eyebrow text-center md:text-left">
            {founderCopy.eyebrow}
          </p>

          <h2 id="founder-heading" className="sr-only">
            A letter from the founder
          </h2>

          {/* First paragraph with drop-cap */}
          <p className="font-editorial mt-10 text-[18px] leading-[1.65] text-[var(--text-primary)] md:text-[19px]">
            <span
              className="font-display float-left mr-3 mt-1 text-[88px] leading-[0.8] text-[var(--gold-cream)] md:text-[112px]"
              style={{
                fontVariationSettings:
                  "'opsz' 144, 'wght' 400, 'SOFT' 30, 'WONK' 0",
              }}
              aria-hidden
            >
              {firstChar}
            </span>
            <span className="sr-only">{firstChar}</span>
            {firstRest}
          </p>

          {rest.map((p, i) => (
            <motion.p
              // biome-ignore lint/suspicious/noArrayIndexKey: stable order
              key={i}
              variants={fadeUp}
              className="font-editorial mt-7 text-[18px] leading-[1.65] text-[var(--text-primary)] md:text-[19px]"
            >
              {p}
            </motion.p>
          ))}

          <div className="mt-12 flex items-center gap-4 border-t border-[var(--border-subtle)] pt-8">
            {/* Signature mark — gold-deep handwritten 'S' (Sami) */}
            <span
              aria-hidden
              className="font-display inline-flex h-12 w-12 items-center justify-center text-[42px] italic text-[var(--gold-deep)]"
            >
              S
            </span>
            <p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {founderCopy.signature}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="border-b border-[var(--border-subtle)]" />
    </section>
  );
}

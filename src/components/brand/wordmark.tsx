"use client";

import { brand } from "@/content/copy";
import { motion } from "framer-motion";

type Props = {
  size?: "sm" | "md" | "lg";
  showWord?: boolean;
};

const sizeMap = {
  sm: { mark: 22, word: 16, gap: 10 },
  md: { mark: 30, word: 19, gap: 12 },
  lg: { mark: 44, word: 24, gap: 16 },
};

/**
 * Mizan wordmark — opsz-144 italic 'M' in a tinted square + Fraunces
 * wordmark. The square has a thin gold-deep frame and a soft gold halo
 * that pulses subtly on hover.
 */
export function Wordmark({ size = "md", showWord = true }: Props) {
  const s = sizeMap[size];
  const square = s.mark + 14;

  return (
    <motion.span
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group inline-flex items-center"
      style={{ gap: s.gap }}
    >
      <span
        aria-hidden
        className="relative inline-flex shrink-0 items-center justify-center rounded-md border border-[rgba(139,111,71,0.45)] bg-[var(--bg-base)] transition-colors duration-200 group-hover:border-[var(--gold-primary)]"
        style={{ width: square, height: square }}
      >
        {/* Soft gold halo */}
        <span
          className="absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow: "0 0 24px rgba(212, 165, 116, 0.35)",
          }}
        />
        <span
          className="font-display italic leading-none text-[var(--gold-cream)] transition-colors duration-200 group-hover:text-[var(--gold-primary)]"
          style={{
            fontSize: s.mark,
            fontVariationSettings: "'opsz' 144, 'wght' 500, 'SOFT' 30, 'WONK' 0",
            paddingTop: 1,
          }}
        >
          M
        </span>
      </span>
      {showWord ? (
        <span
          className="font-display tracking-tight text-[var(--text-primary)]"
          style={{
            fontSize: s.word,
            fontVariationSettings: "'opsz' 72, 'wght' 500, 'SOFT' 30, 'WONK' 0",
          }}
        >
          {brand.name}
        </span>
      ) : null}
    </motion.span>
  );
}

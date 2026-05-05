"use client";

import { motion } from "framer-motion";

/**
 * Scroll cue — small Geist Mono "scroll" label with a hand-drawn vertical
 * line that pulses downward. Bottom-center of the hero.
 */
export function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      aria-hidden
    >
      <span className="font-mono-data text-[9px] uppercase tracking-[0.3em] text-[var(--text-subtle)]">
        Scroll
      </span>
      <motion.span
        className="block h-8 w-px bg-gradient-to-b from-[var(--gold-deep)] to-transparent"
        animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
        style={{ transformOrigin: "top" }}
        transition={{
          duration: 2.4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

const ITEMS = [
  { label: "Local-first" },
  { label: "End-to-end encrypted" },
  { label: "No tracking" },
] as const;

/** Small trust pills below the hero CTAs. Pulsing gold-cream dots. */
export function TrustStrip() {
  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } },
      }}
      className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono-data text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)]"
    >
      {ITEMS.map((item) => (
        <motion.li
          key={item.label}
          variants={{
            hidden: { opacity: 0, y: 6 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="inline-flex items-center gap-2"
        >
          <span
            aria-hidden
            className="pulse-dot inline-block h-1 w-1 rounded-full bg-[var(--gold-cream)]"
          />
          {item.label}
        </motion.li>
      ))}
    </motion.ul>
  );
}

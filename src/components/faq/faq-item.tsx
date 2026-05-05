"use client";

import type { FaqItem as FaqItemType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * Custom 1.5px-stroke plus/minus glyph (Phosphor-equivalent).
 * Rotates on open via Motion. Stroke never changes weight (no shift).
 */
function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="h-4 w-4"
      aria-hidden
    >
      <line x1="3" y1="8" x2="13" y2="8" />
      <motion.line
        x1="8"
        y1="3"
        x2="8"
        y2="13"
        animate={{ scaleY: open ? 0 : 1 }}
        transition={{ duration: 0.18, ease: [0.33, 1, 0.68, 1] }}
        style={{ transformOrigin: "8px 8px" }}
      />
    </svg>
  );
}

type Props = {
  item: FaqItemType;
};

export function FaqItem({ item }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border-subtle)] last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-150 hover:text-[var(--gold-cream)]"
      >
        <span className="font-display-h2 text-[18px] tracking-tight text-[var(--text-primary)] group-hover:text-[var(--gold-cream)] md:text-[22px]">
          {item.q}
        </span>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--gold-primary)] transition-colors duration-150 group-hover:border-[var(--gold-primary)]">
          <PlusMinus open={open} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-8 pr-12 text-[15px] leading-relaxed text-[var(--text-muted)]">
              {item.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

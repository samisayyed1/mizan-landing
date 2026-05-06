"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const ROWS = [
  {
    os: "macOS",
    text: "11.0 (Big Sur) or later. Apple Silicon (M1+) or Intel.",
  },
  {
    os: "Windows",
    text: "Windows 10 version 1809 or later. 64-bit only.",
  },
  {
    os: "Linux",
    text: "Most modern distributions. AppImage requires FUSE (libfuse2 on Ubuntu 22.04+ or fuse on older systems).",
  },
] as const;

/**
 * Single full-width accordion. Mirrors the FAQ item's plus/minus glyph
 * and motion exactly (line scaleY, 0.18s ease-out cubic, 0.32s height).
 */
export function SystemRequirements() {
  const [open, setOpen] = useState(false);

  return (
    <section
      aria-labelledby="sysreqs-heading"
      className="mt-24 border-y border-[var(--border-subtle)]"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="sysreqs-content"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span
          id="sysreqs-heading"
          className="font-display text-[var(--text-primary)] transition-colors duration-150 group-hover:text-[var(--gold-cream)]"
          style={{
            fontSize: 24,
            lineHeight: 1.16,
            fontVariationSettings: "'opsz' 24, 'wght' 500, 'SOFT' 30, 'WONK' 0",
          }}
        >
          System requirements
        </span>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--gold-primary)] transition-colors duration-150 group-hover:border-[var(--gold-primary)]">
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
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
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="sysreqs-content"
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <dl className="pb-8">
              {ROWS.map((row, i) => (
                <div
                  key={row.os}
                  className={`grid grid-cols-1 gap-2 py-5 md:grid-cols-12 md:gap-8 ${
                    i > 0 ? "border-t border-[rgba(139,111,71,0.18)]" : ""
                  }`}
                >
                  <dt className="font-mono-data text-[13px] uppercase tracking-[0.18em] text-[var(--gold-deep)] md:col-span-3">
                    {row.os}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-[var(--text-muted)] md:col-span-9">
                    {row.text}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

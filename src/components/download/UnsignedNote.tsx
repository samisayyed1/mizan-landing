"use client";

import { RELEASES_INDEX_URL } from "@/lib/downloads";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * Two stacked tertiary surfaces under the installer grid:
 *
 *  1. A surface-2 callout explaining the unsigned-binary state, with a
 *     "Why is it unsigned?" disclosure that expands into a short FAQ
 *     paragraph (matches the FAQ accordion's plus/minus glyph).
 *  2. A tertiary "Older versions →" link. This is the SOLE allowed
 *     mention of the source host site-wide per the design ban list.
 */
export function UnsignedNote() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-12 flex flex-col gap-8">
      <div className="grain relative isolate w-full max-w-[600px] rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-2)] p-6 md:p-7">
        <p className="text-[15px] leading-relaxed text-[var(--text-muted)]">
          Mizan is unsigned during the founding-member period. On macOS,
          right-click the
          <span className="font-mono-data text-[14px] text-[var(--text-primary)]">
            {" "}
            .dmg{" "}
          </span>
          and choose <span className="text-[var(--text-primary)]">Open</span>.
          On Windows, click
          <span className="text-[var(--text-primary)]">
            {" "}
            More info → Run anyway
          </span>
          . We&rsquo;ll add code signing once we exit private beta.
        </p>

        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="group mt-4 inline-flex items-center gap-2 text-[13px] tracking-tight text-[var(--gold-cream)] transition-colors duration-150 hover:text-[var(--gold-primary)]"
        >
          <span>Why is it unsigned?</span>
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
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
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="why"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.33, 1, 0.68, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-4 max-w-prose text-[14px] leading-relaxed text-[var(--text-muted)]">
                Code signing certificates cost ~$300/year and require an
                established business identity. We&rsquo;re prioritising the
                product first. The installers are unmodified and built
                reproducibly on every release.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Sole allowed GitHub mention per ban-list exemption */}
      <a
        href={RELEASES_INDEX_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 self-start text-[13px] tracking-tight text-[var(--text-subtle)] transition-colors duration-150 hover:text-[var(--gold-cream)]"
      >
        Older versions →
      </a>
    </div>
  );
}

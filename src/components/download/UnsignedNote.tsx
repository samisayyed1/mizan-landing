"use client";

import { RELEASES_INDEX_URL } from "@/lib/downloads";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
 * Unsigned-binary callout.
 *
 * Two stacked surfaces:
 *
 *  1. A surface-2 callout explaining the unsigned-binary state, with a
 *     "Why is it unsigned?" disclosure and a copy-paste Terminal fix
 *     for the macOS "damaged and can't be opened" Gatekeeper dialog.
 *     The right-click → Open path doesn't work on macOS Sequoia for
 *     quarantined unsigned binaries; the xattr command is the only
 *     reliable bypass without an Apple Developer cert.
 *  2. A tertiary "Older versions →" link. This is the SOLE allowed
 *     mention of the source host site-wide per the design ban list.
 */

const MACOS_FIX_COMMAND =
  "xattr -dr com.apple.quarantine /Applications/Mizan.app";

export function UnsignedNote() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MACOS_FIX_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silent no-op; user can still
      // select-all + copy from the visible code block.
    }
  };

  return (
    <div className="mt-12 flex flex-col gap-8">
      <div className="grain relative isolate w-full max-w-[680px] rounded-[16px] border border-[var(--border-default)] bg-[var(--surface-2)] p-6 md:p-7">
        <p className="text-[15px] leading-relaxed text-[var(--text-muted)]">
          Mizan is unsigned during the founding-member period. First launch
          needs one extra step.
        </p>

        <div className="mt-5 flex flex-col gap-5">
          {/* macOS path */}
          <div>
            <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">
              macOS
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-muted)]">
              If you see{" "}
              <span className="text-[var(--text-primary)]">
                &ldquo;Mizan is damaged and can&rsquo;t be opened&rdquo;
              </span>
              , that&rsquo;s a macOS quarantine flag — not real damage. Open
              Terminal, paste this once, and re-launch:
            </p>
            <div className="mt-3 flex items-stretch gap-2">
              <code className="font-mono-data flex-1 select-all overflow-x-auto rounded-[10px] border border-[var(--border-default)] bg-[var(--surface-1)] px-3 py-2.5 text-[13px] text-[var(--text-primary)]">
                {MACOS_FIX_COMMAND}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy command"
                className="shrink-0 rounded-[10px] border border-[var(--border-default)] bg-[var(--surface-1)] px-3 text-[12px] tracking-tight text-[var(--gold-cream)] transition-colors duration-150 hover:border-[var(--gold-cream)] hover:text-[var(--gold-primary)]"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-subtle)]">
              Open Terminal: ⌘+Space, type{" "}
              <span className="font-mono-data text-[12px] text-[var(--text-muted)]">
                terminal
              </span>
              , press Enter.
            </p>
          </div>

          {/* Windows path */}
          <div>
            <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">
              Windows
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-muted)]">
              SmartScreen will warn you. Click{" "}
              <span className="text-[var(--text-primary)]">
                More info → Run anyway
              </span>
              .
            </p>
          </div>

          {/* Linux path */}
          <div>
            <p className="text-[13px] font-medium uppercase tracking-wider text-[var(--text-subtle)]">
              Linux
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-muted)]">
              Make the AppImage executable, then run it:
            </p>
            <code className="font-mono-data mt-3 block select-all overflow-x-auto rounded-[10px] border border-[var(--border-default)] bg-[var(--surface-1)] px-3 py-2.5 text-[13px] text-[var(--text-primary)]">
              chmod +x Mizan_*.AppImage && ./Mizan_*.AppImage
            </code>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="group mt-6 inline-flex items-center gap-2 text-[13px] tracking-tight text-[var(--gold-cream)] transition-colors duration-150 hover:text-[var(--gold-primary)]"
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
                Code-signing certificates cost ~$300/year and require an
                established business identity. We&rsquo;re prioritising the
                product first. Installers are unmodified and built reproducibly
                on every release.
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

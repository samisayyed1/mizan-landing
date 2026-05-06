"use client";

import { PlatformIcon } from "@/components/download/PlatformIcon";
import type { Download } from "@/lib/downloads";
import { motion } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";

type Props = {
  download: Download;
  recommended: boolean;
};

/**
 * Single installer card. Bento-tile surface treatment (1px border,
 * surface bg, 20px radius, grain overlay) per the design contract.
 *
 * Recommended state swaps the border to gold-primary and renders an
 * eyebrow pill above. Reserved space for the pill is fixed via
 * min-h on its slot so the four cards align row-wise even when only
 * one is highlighted.
 */
export function InstallerCard({ download, recommended }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex h-6 items-end pb-2">
        {recommended ? (
          <motion.span
            layout
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono-data text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gold-cream)]"
          >
            Recommended for your system
          </motion.span>
        ) : null}
      </div>

      <div
        className={`grain group relative isolate flex flex-1 flex-col overflow-hidden rounded-[20px] bg-[var(--bg-surface)] p-8 transition-colors duration-200 ${
          recommended
            ? "border border-[var(--gold-primary)]"
            : "border border-[var(--border-default)] hover:border-[rgba(139,111,71,0.45)]"
        }`}
      >
        <PlatformIcon platform={download.key} className="h-8 w-8 text-[var(--gold-deep)]" />

        <h3
          className="font-display mt-6 text-[var(--text-primary)]"
          style={{
            fontSize: 28,
            lineHeight: 1.16,
            fontVariationSettings: "'opsz' 28, 'wght' 500, 'SOFT' 30, 'WONK' 0",
          }}
        >
          {download.label}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{download.detail}</p>

        <p className="mt-4 font-mono-data text-[13px] text-[var(--text-subtle)] tabular">
          {download.size}
        </p>

        <a
          href={download.url}
          className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-[var(--gold-cream)] bg-transparent text-sm font-medium tracking-tight text-[var(--gold-cream)] transition-colors duration-200 hover:border-[var(--gold-primary)] hover:bg-[var(--gold-primary)] hover:text-[var(--bg-base)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-primary)]"
        >
          <ArrowDownToLine aria-hidden className="h-4 w-4" strokeWidth={1.5} />
          Download
        </a>
      </div>
    </div>
  );
}

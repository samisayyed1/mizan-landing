"use client";

import { motion } from "framer-motion";

export type PlatformTab = "desktop" | "mobile";

type Props = {
  value: PlatformTab;
  onChange: (next: PlatformTab) => void;
};

/**
 * Two-segment switch — Desktop / Mobile. Mirrors the pricing-page
 * billing toggle's choreography (sliding indicator on a spring; tab
 * labels in Geist Mono caps; active label = text-primary, inactive =
 * text-subtle).
 */
export function PlatformTabs({ value, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Platform"
      className="relative inline-flex rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] p-1"
    >
      <motion.div
        aria-hidden
        className="absolute inset-y-1 w-1/2 rounded bg-[var(--bg-elevated)]"
        animate={{ x: value === "desktop" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      <button
        type="button"
        role="tab"
        aria-selected={value === "desktop"}
        onClick={() => onChange("desktop")}
        className={`relative z-10 px-5 py-1.5 font-mono-data text-[11px] uppercase tracking-[0.18em] transition-colors duration-150 ${
          value === "desktop" ? "text-[var(--text-primary)]" : "text-[var(--text-subtle)]"
        }`}
      >
        Desktop
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === "mobile"}
        onClick={() => onChange("mobile")}
        className={`relative z-10 px-5 py-1.5 font-mono-data text-[11px] uppercase tracking-[0.18em] transition-colors duration-150 ${
          value === "mobile" ? "text-[var(--text-primary)]" : "text-[var(--text-subtle)]"
        }`}
      >
        Mobile
      </button>
    </div>
  );
}

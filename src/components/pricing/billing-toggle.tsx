"use client";

import { motion } from "framer-motion";
import { pricingCopy } from "@/content/copy";

type Props = {
  annual: boolean;
  onChange: (annual: boolean) => void;
};

/**
 * Linear-style segmented switch. Annual default with save-20% pill.
 */
export function BillingToggle({ annual, onChange }: Props) {
  return (
    <div className="inline-flex items-center gap-3">
      <div
        role="tablist"
        aria-label="Billing frequency"
        className="relative inline-flex rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] p-1"
      >
        {/* Sliding indicator */}
        <motion.div
          aria-hidden
          className="absolute inset-y-1 w-1/2 rounded bg-[var(--bg-elevated)]"
          animate={{ x: annual ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
        <button
          type="button"
          role="tab"
          aria-selected={annual}
          onClick={() => onChange(true)}
          className={`relative z-10 px-4 py-1.5 font-mono-data text-[11px] uppercase tracking-[0.18em] transition-colors duration-150 ${
            annual ? "text-[var(--text-primary)]" : "text-[var(--text-subtle)]"
          }`}
        >
          {pricingCopy.toggle.annual}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!annual}
          onClick={() => onChange(false)}
          className={`relative z-10 px-4 py-1.5 font-mono-data text-[11px] uppercase tracking-[0.18em] transition-colors duration-150 ${
            !annual ? "text-[var(--text-primary)]" : "text-[var(--text-subtle)]"
          }`}
        >
          {pricingCopy.toggle.monthly}
        </button>
      </div>

      {annual ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="rounded-full border border-[rgba(245,230,200,0.35)] bg-[var(--surface-2)] px-2 py-1 font-mono-data text-[10px] uppercase tracking-[0.18em] text-[var(--gold-cream)]"
        >
          {pricingCopy.toggle.saveLabel}
        </motion.span>
      ) : null}
    </div>
  );
}

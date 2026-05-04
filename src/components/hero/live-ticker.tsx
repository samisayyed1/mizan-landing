"use client";

import { CountUp } from "@/components/ui/count-up";
import { heroCopy } from "@/content/copy";
import { motion } from "framer-motion";

export function LiveTicker() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
      aria-label="Mizan at a glance"
      className="relative w-full border-t border-[var(--border-subtle)] bg-[var(--bg-base)]"
    >
      <div className="mx-auto grid max-w-container grid-cols-2 divide-x divide-[var(--border-subtle)] md:grid-cols-4">
        {heroCopy.metrics.map((m) => (
          <div key={m.label} className="px-6 py-6 md:px-10 md:py-8">
            <div className="font-mono text-2xl text-[var(--text-primary)] md:text-3xl">
              <CountUp
                value={m.value}
                prefix={"prefix" in m ? m.prefix : undefined}
                suffix={"suffix" in m ? m.suffix : undefined}
                format={m.format}
              />
            </div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

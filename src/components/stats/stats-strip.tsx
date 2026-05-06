"use client";

import { CountUp } from "@/components/ui/count-up";
import { statsCopy } from "@/content/copy";
import { VIEWPORT_DEFAULT, fadeUp, stagger } from "@/lib/motion";
import { motion } from "framer-motion";

/**
 * Stats strip — four metrics, count-up on viewport entry.
 *
 * Each value is a software fact about Mizan — module count, currency
 * coverage, brokerage breadth, asset-class scope. No user-count
 * placeholders, no fabrication. Source of truth: `statsCopy.metrics`.
 */
export function StatsStrip() {
  return (
    <section
      aria-label="Mizan at a glance"
      className="relative border-y border-[var(--border-subtle)]"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_DEFAULT}
        variants={stagger}
        className="mx-auto grid max-w-[var(--container-default)] grid-cols-2 divide-[var(--border-subtle)] md:grid-cols-4 md:divide-x"
      >
        {statsCopy.metrics.map((m) => (
          <motion.div
            key={m.label}
            variants={fadeUp}
            className="px-6 py-10 md:px-10 md:py-12"
          >
            <div className="font-mono-data text-3xl text-[var(--text-primary)] md:text-4xl">
              <CountUp
                value={m.value}
                prefix={"prefix" in m ? m.prefix : undefined}
                suffix={"suffix" in m ? m.suffix : undefined}
                format={m.format}
              />
            </div>
            <div className="eyebrow mt-3">{m.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

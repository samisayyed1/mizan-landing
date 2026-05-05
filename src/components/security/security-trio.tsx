"use client";

import { motion } from "framer-motion";
import { securityCopy } from "@/content/copy";
import { fadeUp, stagger, VIEWPORT_DEFAULT } from "@/lib/motion";

/**
 * Three numbered claims (01/02/03 in gold-deep small numerals, Geist Mono).
 * Editorial restraint — no icons, no decorative shapes. The numbers are the
 * detail.
 */
export function SecurityTrio() {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="relative isolate"
    >
      <div className="mx-auto max-w-[var(--container-default)] px-6 py-32 md:px-10 md:py-40">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_DEFAULT}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow">{securityCopy.eyebrow}</p>
          <h2
            id="security-heading"
            className="font-display-h2 mt-4 text-balance text-[var(--text-primary)]"
            style={{ fontSize: "clamp(32px, 3.5vw, 56px)", lineHeight: 1.1 }}
          >
            {securityCopy.title}
          </h2>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_DEFAULT}
          variants={stagger}
          className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3"
        >
          {securityCopy.claims.map((c) => (
            <motion.li
              key={c.n}
              variants={fadeUp}
              className="relative flex flex-col bg-[var(--bg-surface)] p-8 md:p-10"
            >
              <span
                aria-hidden
                className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-[var(--gold-deep)]"
              >
                {c.n}
              </span>
              <h3 className="font-display-h2 mt-6 text-2xl text-[var(--text-primary)]">
                {c.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-muted)]">
                {c.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_DEFAULT}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center font-mono-data text-[11px] uppercase tracking-[0.2em] text-[var(--text-subtle)]"
        >
          Auditor and full scope published when SOC 2 Type II completes.
        </motion.p>
      </div>
    </section>
  );
}

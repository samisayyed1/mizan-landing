"use client";

import { brand, pricingCopy } from "@/content/copy";
import { VIEWPORT_DEFAULT, fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { BillingToggle } from "./billing-toggle";

/**
 * Three-tier pricing — Founder / Private / Family Office.
 *
 * Per the brief: prices ship as $X / $Y placeholders. Sami fills in real
 * numbers; we never fabricate. The pitch is the structure (founding-member
 * scarcity + lock-in), not the dollar value.
 */
export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative isolate border-t border-[var(--border-subtle)] bg-[var(--bg-base)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,165,116,0.4)] to-transparent"
      />

      <div className="mx-auto max-w-[var(--container-default)] px-6 py-32 md:px-10 md:py-40">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_DEFAULT}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow">{pricingCopy.eyebrow}</p>
          <h2
            id="pricing-heading"
            className="font-display-h2 mt-4 text-balance text-[var(--text-primary)]"
            style={{ fontSize: "clamp(32px, 3.5vw, 56px)", lineHeight: 1.1 }}
          >
            {pricingCopy.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
            {pricingCopy.subtitle}
          </p>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <BillingToggle annual={annual} onChange={setAnnual} />
        </div>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_DEFAULT}
          variants={stagger}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {pricingCopy.tiers.map((tier) => {
            const price = annual ? tier.priceAnnual : tier.priceMonthly;
            const cadence = annual ? "/ year" : "/ month";

            return (
              <motion.li
                key={tier.id}
                variants={fadeUp}
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8",
                  tier.highlighted
                    ? "border-[var(--gold-primary)] bg-[var(--bg-surface)] shadow-[0_30px_80px_-40px_rgba(212,165,116,0.45)]"
                    : "border-[var(--border-default)] bg-[var(--bg-surface)]",
                )}
              >
                {tier.highlighted ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--gold-primary)] bg-[var(--bg-base)] px-3 py-1 font-mono-data text-[10px] uppercase tracking-[0.2em] text-[var(--gold-cream)]">
                    Most popular
                  </span>
                ) : null}

                <div>
                  <h3 className="font-display-h2 text-2xl text-[var(--text-primary)]">
                    {tier.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {tier.blurb}
                  </p>
                </div>

                <div className="my-8 flex items-baseline gap-2">
                  {price ? (
                    <>
                      <span className="font-mono-data text-[12px] text-[var(--text-subtle)]">
                        $
                      </span>
                      <span className="font-display text-5xl text-[var(--text-primary)] tabular">
                        {price}
                      </span>
                      <span className="font-mono-data text-xs text-[var(--text-muted)]">
                        {cadence}
                      </span>
                    </>
                  ) : (
                    <span className="font-display text-3xl italic text-[var(--gold-cream)]">
                      Bespoke
                    </span>
                  )}
                </div>

                <ul className="flex-1 space-y-3 border-t border-[var(--border-subtle)] pt-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-[var(--gold-deep)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {tier.id === "family-office" ? (
                    <Link
                      href="/contact"
                      className={cn(
                        "inline-flex w-full items-center justify-center rounded-md border px-4 py-3 text-sm font-medium tracking-tight transition-colors duration-150",
                        "border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)]",
                      )}
                    >
                      {tier.cta}
                    </Link>
                  ) : (
                    <Link
                      href="/contact"
                      className={cn(
                        "inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-medium tracking-tight transition-colors duration-150",
                        tier.highlighted
                          ? "bg-[var(--gold-primary)] text-[var(--bg-base)] hover:bg-[var(--gold-cream)]"
                          : "border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)]",
                      )}
                    >
                      {tier.cta}
                    </Link>
                  )}
                </div>
              </motion.li>
            );
          })}
        </motion.ol>

        <p className="mt-10 text-center font-mono-data text-[11px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
          {pricingCopy.footnote}
        </p>

        <p className="mt-3 text-center text-xs text-[var(--text-subtle)]">
          For bespoke arrangements:{" "}
          <a
            href={`mailto:${brand.contactEmail}`}
            className="text-[var(--gold-cream)] underline-offset-4 hover:text-[var(--gold-primary)] hover:underline"
          >
            {brand.contactEmail}
          </a>
        </p>
      </div>
    </section>
  );
}

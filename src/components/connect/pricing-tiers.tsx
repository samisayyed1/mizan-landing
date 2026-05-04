"use client";

import { Reveal } from "@/components/ui/reveal";
import { connectCopy } from "@/content/copy";
import { pricingTiers } from "@/content/pricing";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

export function PricingTiers() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="mt-16">
      <Reveal className="flex items-center justify-center gap-3">
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-[0.18em] transition-colors",
            yearly ? "text-[var(--text-muted)]" : "text-[var(--text-primary)]",
          )}
        >
          Monthly
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={yearly}
          onClick={() => setYearly((v) => !v)}
          className="relative inline-flex h-6 w-11 items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] transition-colors hover:border-[var(--gold-primary)]"
        >
          <motion.span
            layout
            className="ml-0.5 inline-block h-5 w-5 rounded-full bg-[var(--gold-primary)]"
            animate={{ x: yearly ? 18 : 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
          />
        </button>
        <span
          className={cn(
            "font-mono text-xs uppercase tracking-[0.18em] transition-colors",
            yearly ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]",
          )}
        >
          Yearly
          <span className="ml-1.5 rounded-full border border-[var(--gold-primary)]/40 bg-[var(--gold-primary)]/10 px-1.5 py-0.5 text-[10px] tracking-normal text-[var(--gold-primary)]">
            Save 18%
          </span>
        </span>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier, i) => {
          const price = yearly ? tier.yearly / 12 : tier.monthly;
          return (
            <Reveal key={tier.id} delay={i * 0.06} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 transition-colors",
                  tier.highlighted
                    ? "border-[var(--gold-primary)]/40 bg-[var(--bg-surface)] shadow-[0_24px_60px_-24px_rgba(212,165,116,0.25)]"
                    : "border-[var(--border-default)] bg-[var(--bg-surface)] hover:border-[var(--gold-primary)]/30",
                )}
              >
                {tier.highlighted ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[var(--gold-primary)]/50 bg-[var(--bg-base)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
                    Recommended
                  </span>
                ) : null}

                <div>
                  <h3 className="font-serif text-2xl font-light text-[var(--text-primary)]">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {tier.blurb}
                  </p>
                </div>

                <div className="my-8 flex items-baseline gap-1">
                  <span className="font-serif text-5xl font-light tracking-tight text-[var(--text-primary)]">
                    ${price.toFixed(2)}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">/month</span>
                </div>

                <ul className="flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                    >
                      <Check
                        aria-hidden
                        className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold-primary)]"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-[var(--border-default)] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  {connectCopy.comingSoon}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {connectCopy.pricingNote}
      </p>
    </div>
  );
}

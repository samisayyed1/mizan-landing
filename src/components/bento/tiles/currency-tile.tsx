"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BentoTile } from "../bento-tile";

const CURRENCIES = [
  { code: "USD", symbol: "$", value: 4_289_531, locale: "en-US" },
  { code: "EUR", symbol: "€", value: 3_945_408, locale: "de-DE" },
  { code: "GBP", symbol: "£", value: 3_412_874, locale: "en-GB" },
] as const;

export function CurrencyTile({ className }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let id: ReturnType<typeof setInterval> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          id = setInterval(() => {
            setIdx((i) => (i + 1) % CURRENCIES.length);
          }, 2400);
        } else if (id) {
          clearInterval(id);
          id = null;
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      if (id) clearInterval(id);
      observer.disconnect();
    };
  }, []);

  const c = CURRENCIES[idx]!;
  const formatted = new Intl.NumberFormat(c.locale, {
    style: "currency",
    currency: c.code,
    maximumFractionDigits: 0,
  }).format(c.value);

  return (
    <BentoTile
      eyebrow="05 · Multi-currency"
      title="Native global. Cost basis preserved."
      body="Real-time FX. Historical conversion. No rebases."
      className={className}
    >
      <div ref={ref} className="space-y-5">
        <div className="relative h-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 flex items-baseline gap-3"
            >
              <span className="font-mono-data text-3xl text-[var(--text-primary)] tabular md:text-[34px]">
                {formatted}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
          {CURRENCIES.map((cc, i) => (
            <div key={cc.code} className="flex items-center gap-2">
              <span
                aria-hidden
                className={`h-1 w-1 rounded-full transition-colors duration-300 ${
                  i === idx
                    ? "bg-[var(--gold-primary)]"
                    : "bg-[var(--text-subtle)]"
                }`}
              />
              <span
                className={`font-mono-data text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  i === idx
                    ? "text-[var(--gold-cream)]"
                    : "text-[var(--text-subtle)]"
                }`}
              >
                {cc.code}
              </span>
            </div>
          ))}
          <span className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[var(--text-subtle)]">
            +27 more
          </span>
        </div>
      </div>
    </BentoTile>
  );
}

"use client";

import { motion } from "framer-motion";
import { BentoTile } from "../bento-tile";

const POSITIONS = [
  { ticker: "AAPL", name: "Apple", value: 412_840, pl: 4.21 },
  { ticker: "BRK.B", name: "Berkshire", value: 287_115, pl: 2.06 },
  { ticker: "BTC", name: "Bitcoin", value: 184_320, pl: -1.84 },
  { ticker: "VOO", name: "S&P 500 ETF", value: 312_590, pl: 1.12 },
  { ticker: "RE-01", name: "London flat", value: 612_000, pl: 0.4 },
] as const;

function fmtUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1,
  }).format(n);
}

export function TrackingTile({ className }: { className?: string }) {
  return (
    <BentoTile
      eyebrow="03 · Asset Tracking"
      title="One ledger. Every custodian."
      body="Equities, crypto, real estate, alternatives — together, finally."
      className={className}
    >
      <ul className="space-y-2.5">
        {POSITIONS.map((p, i) => (
          <motion.li
            key={p.ticker}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex items-center gap-3 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-3 py-2.5"
          >
            <span
              aria-hidden
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--gold-deep)]/40 font-mono-data text-[10px] tracking-tight text-[var(--gold-cream)]"
            >
              {p.ticker.slice(0, 2)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-mono-data text-xs uppercase tracking-[0.12em] text-[var(--text-primary)]">
                {p.ticker}
              </div>
              <div className="truncate text-[11px] text-[var(--text-muted)]">{p.name}</div>
            </div>
            <div className="text-right">
              <div className="font-mono-data text-sm tabular text-[var(--text-primary)]">
                {fmtUSD(p.value)}
              </div>
              <div
                className={`font-mono-data text-[11px] tabular ${
                  p.pl >= 0 ? "text-[var(--gold-cream)]" : "text-[var(--text-muted)]"
                }`}
              >
                {p.pl >= 0 ? "+" : ""}
                {p.pl.toFixed(2)}%
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </BentoTile>
  );
}

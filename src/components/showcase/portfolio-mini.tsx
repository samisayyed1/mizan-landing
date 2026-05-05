"use client";

import { VIEWPORT_DEFAULT, fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { PortfolioMiniFallback } from "./portfolio-mini-fallback";

const PortfolioMiniChart = dynamic(() => import("./portfolio-mini-chart"), {
  ssr: false,
  loading: () => <PortfolioMiniFallback />,
});

/**
 * Twelve months of plausible portfolio value: gentle uptrend with one
 * meaningful drawdown around month 4 (a 'taste-of-volatility' ~9%
 * correction), recovery, then continued climb. Numbers are mock — used
 * to illustrate the look of the real product, never quoted as truth.
 */
const SERIES = [
  { m: "Jun", v: 3_640_000 },
  { m: "Jul", v: 3_722_000 },
  { m: "Aug", v: 3_811_000 },
  { m: "Sep", v: 3_544_000 }, // drawdown
  { m: "Oct", v: 3_478_000 }, // trough
  { m: "Nov", v: 3_602_000 },
  { m: "Dec", v: 3_795_000 },
  { m: "Jan", v: 3_924_000 },
  { m: "Feb", v: 4_017_000 },
  { m: "Mar", v: 4_096_000 },
  { m: "Apr", v: 4_213_000 },
  { m: "May", v: 4_289_531 },
];

const CURRENT = SERIES[SERIES.length - 1]?.v ?? 0;
const START = SERIES[0]?.v ?? 0;
const PERIOD_RETURN_PCT = ((CURRENT - START) / START) * 100;

const ALLOCATION = [
  { label: "Equities", pct: 62 },
  { label: "Crypto", pct: 14 },
  { label: "Real Estate", pct: 18 },
  { label: "Cash", pct: 6 },
] as const;

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

type Props = {
  /** Show window chrome and sidebar (full terminal frame). */
  framed?: boolean;
  className?: string;
};

/**
 * PortfolioMini — the real, reusable showcase component. Replaces every
 * fake-screenshot dashboard. Recharts area chart with gold gradient,
 * Geist Mono numbers with tabular-nums, allocation row with gold-deep
 * dividers.
 */
export function PortfolioMini({ framed = true, className }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_DEFAULT}
      variants={fadeUp}
      className={[
        "relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)]",
        framed ? "shadow-[var(--shadow-elevation)]" : "",
        className ?? "",
      ].join(" ")}
    >
      {framed ? (
        <div className="flex items-center gap-1.5 border-b border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 py-3">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--bg-overlay)]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--bg-overlay)]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--bg-overlay)]" />
          <span className="ml-3 font-mono-data text-[10px] tracking-[0.18em] text-[var(--text-subtle)] uppercase">
            mizan · overview
          </span>
        </div>
      ) : null}

      <div className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
        <div>
          <p className="eyebrow">Total net worth</p>
          <div className="mt-3 flex items-baseline gap-3">
            <div className="font-mono-data text-4xl text-[var(--text-primary)] md:text-5xl">
              {formatUSD(CURRENT)}
            </div>
          </div>
          <div className="mt-2 font-mono-data text-sm text-[var(--gold-cream)]">
            {PERIOD_RETURN_PCT >= 0 ? "+" : ""}
            {PERIOD_RETURN_PCT.toFixed(2)}% · trailing 12 months
          </div>
        </div>

        {/* Time-range pills (decorative — non-interactive in showcase) */}
        <div
          aria-hidden
          className="hidden gap-1 rounded-md border border-[var(--border-subtle)] p-1 md:inline-flex"
        >
          {["1M", "3M", "1Y", "5Y", "ALL"].map((label) => (
            <span
              key={label}
              className={`px-3 py-1 font-mono-data text-[10px] tracking-[0.18em] uppercase ${
                label === "1Y"
                  ? "rounded bg-[var(--bg-elevated)] text-[var(--gold-primary)]"
                  : "text-[var(--text-subtle)]"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="px-2 md:px-6">
        <PortfolioMiniChart data={SERIES} />
      </div>

      {/* Allocation row */}
      <div className="grid grid-cols-2 divide-y divide-[rgba(139,111,71,0.18)] border-t border-[rgba(139,111,71,0.18)] md:grid-cols-4 md:divide-x md:divide-y-0">
        {ALLOCATION.map((a) => (
          <div key={a.label} className="px-6 py-5">
            <p className="eyebrow">{a.label}</p>
            <div className="mt-2 font-mono-data text-2xl text-[var(--text-primary)]">{a.pct}%</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

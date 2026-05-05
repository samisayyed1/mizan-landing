"use client";

import { useEffect, useState } from "react";

const BASE_VALUE = 4_289_531;

type Holding = {
  ticker: string;
  name: string;
  value: number;
  pct: number;
  spark: number[];
};

const HOLDINGS_INIT: Holding[] = [
  {
    ticker: "AAPL",
    name: "Apple",
    value: 412_840,
    pct: 0.42,
    spark: [42, 44, 41, 45, 47, 46, 49, 51, 50, 52, 54, 56],
  },
  {
    ticker: "NVDA",
    name: "Nvidia",
    value: 284_115,
    pct: 1.18,
    spark: [50, 48, 52, 55, 58, 56, 62, 64, 67, 70, 72, 76],
  },
  {
    ticker: "BRK.B",
    name: "Berkshire",
    value: 241_300,
    pct: 0.04,
    spark: [55, 56, 54, 55, 57, 56, 58, 57, 58, 59, 58, 60],
  },
  {
    ticker: "BTC",
    name: "Bitcoin",
    value: 184_320,
    pct: -0.82,
    spark: [62, 65, 60, 58, 56, 53, 55, 51, 49, 52, 48, 46],
  },
  {
    ticker: "GLD",
    name: "Gold ETF",
    value: 156_750,
    pct: 0.21,
    spark: [40, 41, 42, 41, 43, 44, 43, 45, 44, 46, 47, 48],
  },
];

const KPIS = [
  { label: "SHARPE", value: "1.82" },
  { label: "BETA", value: "0.78" },
  { label: "MAX DD", value: "-8.4%" },
  { label: "VOL", value: "12.3%" },
  { label: "ALPHA", value: "+3.2%" },
];

const TAPE_ITEMS = [
  ["SPX", "+0.31%"],
  ["NDX", "+0.48%"],
  ["AAPL", "+0.42%"],
  ["NVDA", "+1.18%"],
  ["MSFT", "+0.27%"],
  ["BRK.B", "+0.04%"],
  ["BTC", "-0.82%"],
  ["ETH", "-0.34%"],
  ["GLD", "+0.21%"],
  ["US10Y", "4.31%"],
  ["DXY", "102.34"],
  ["VIX", "14.21"],
  ["EUR/USD", "1.0824"],
  ["WTI", "$78.40"],
] as const;

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

function formatCompactUSD(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${Math.round(n)}`;
}

function sparkPath(values: number[], width = 60, height = 16): string {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  return values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * height;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function nowEastern(): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/New_York",
  }).format(new Date());
}

/**
 * The Mizan Command Terminal — an institutional-density portfolio monitor
 * meant to read like Bloomberg / Refinitiv / IBKR rather than a polished
 * fintech mockup. Dense numbers, sparklines on each row, scrolling tape,
 * institutional KPIs, live timestamp.
 *
 * Live behavior: top value, holdings prices, and the timestamp tick on
 * staggered intervals. The scrolling tape is a CSS marquee. Everything
 * else (chart paths, layout, structure) is SSR-only — no layout shift on
 * hydration.
 */
export function HeroTerminal() {
  const [value, setValue] = useState(BASE_VALUE);
  const [holdings, setHoldings] = useState(HOLDINGS_INIT);
  const [time, setTime] = useState("");

  // initialize timestamp client-side to avoid SSR/CSR mismatch
  useEffect(() => {
    setTime(`${nowEastern()} EST`);
    const id = setInterval(() => setTime(`${nowEastern()} EST`), 30_000);
    return () => clearInterval(id);
  }, []);

  // top value ticker
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => v + (Math.random() - 0.4) * 1500);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // holdings random walk
  useEffect(() => {
    const id = setInterval(() => {
      setHoldings((prev) =>
        prev.map((h) => ({
          ...h,
          value: h.value + (Math.random() - 0.5) * h.value * 0.0008,
          pct: h.pct + (Math.random() - 0.5) * 0.04,
        })),
      );
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      {/* outer gold halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[64px] bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.20),transparent_70%)] blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-[0_60px_140px_-40px_rgba(0,0,0,0.85),0_0_60px_-20px_rgba(212,165,116,0.18)]">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 py-2.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--bg-overlay)]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--bg-overlay)]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--bg-overlay)]" />
          <span className="ml-3 font-mono-data text-[10px] uppercase tracking-[0.18em] text-[var(--text-subtle)]">
            mizan · command
          </span>
          <span className="ml-auto inline-flex items-center gap-2 font-mono-data text-[10px] uppercase tracking-[0.18em] text-[var(--text-subtle)]">
            <span suppressHydrationWarning>{time || "—"}</span>
            <span aria-hidden className="text-[var(--border-default)]">
              |
            </span>
            <span className="inline-flex items-center gap-1.5 text-[var(--gold-cream)]">
              <span
                aria-hidden
                className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--gold-cream)]"
              />
              LIVE
            </span>
          </span>
        </div>

        {/* Net worth + time pills */}
        <div className="grid grid-cols-[1fr_auto] items-end gap-4 px-5 pt-5">
          <div>
            <p className="eyebrow">Total net worth</p>
            <div className="mt-1.5 font-mono-data text-[34px] leading-none text-[var(--text-primary)] tabular md:text-[38px]">
              {formatUSD(value)}
            </div>
            <div className="mt-1.5 font-mono-data text-[11px] tabular text-[var(--gold-cream)]">
              +17.85% · TWRR 1Y
              <span className="mx-2 text-[var(--text-subtle)]">·</span>
              <span className="text-[var(--text-muted)]">+$648,212 YTD</span>
            </div>
          </div>
          <div
            aria-hidden
            className="hidden gap-0.5 rounded border border-[var(--border-subtle)] p-0.5 sm:inline-flex"
          >
            {["1M", "3M", "1Y", "5Y", "ALL"].map((p) => (
              <span
                key={p}
                className={`px-2 py-1 font-mono-data text-[9px] uppercase tracking-[0.18em] ${
                  p === "1Y"
                    ? "rounded bg-[var(--bg-elevated)] text-[var(--gold-primary)]"
                    : "text-[var(--text-subtle)]"
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="mt-3 px-3">
          <svg
            viewBox="0 0 800 160"
            className="h-[140px] w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="cmd-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A574" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="cmd-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F5E6C8" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#D4A574" />
                <stop offset="100%" stopColor="#F5E6C8" />
              </linearGradient>
            </defs>
            {/* Hairline grid */}
            <line
              x1="0"
              x2="800"
              y1="40"
              y2="40"
              stroke="rgba(139,111,71,0.10)"
              strokeDasharray="2 6"
            />
            <line
              x1="0"
              x2="800"
              y1="80"
              y2="80"
              stroke="rgba(139,111,71,0.10)"
              strokeDasharray="2 6"
            />
            <line
              x1="0"
              x2="800"
              y1="120"
              y2="120"
              stroke="rgba(139,111,71,0.10)"
              strokeDasharray="2 6"
            />
            {/* Benchmark — dashed muted */}
            <path
              d="M0 110 L 50 105 L 100 102 L 150 110 L 200 100 L 250 92 L 300 86 L 350 78 L 400 72 L 450 64 L 500 58 L 550 52 L 600 48 L 650 44 L 700 38 L 750 34 L 800 30"
              fill="none"
              stroke="rgba(139,111,71,0.55)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
            {/* Mizan area */}
            <path
              d="M0 122 L 50 110 L 100 100 L 150 124 L 200 108 L 250 88 L 300 72 L 350 60 L 400 50 L 450 40 L 500 30 L 550 24 L 600 18 L 650 14 L 700 12 L 750 10 L 800 8 L 800 160 L 0 160 Z"
              fill="url(#cmd-area)"
            />
            <path
              d="M0 122 L 50 110 L 100 100 L 150 124 L 200 108 L 250 88 L 300 72 L 350 60 L 400 50 L 450 40 L 500 30 L 550 24 L 600 18 L 650 14 L 700 12 L 750 10 L 800 8"
              fill="none"
              stroke="url(#cmd-stroke)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Endpoint pulse */}
            <circle cx="800" cy="8" r="6" fill="#F5E6C8" opacity="0.18">
              <animate attributeName="r" values="6;14;6" dur="2.4s" repeatCount="indefinite" />
              <animate
                attributeName="opacity"
                values="0.18;0;0.18"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="800" cy="8" r="3" fill="#F5E6C8" />
          </svg>
          {/* Chart legend */}
          <div className="mt-1 flex items-center gap-5 px-2 font-mono-data text-[9px] uppercase tracking-[0.18em] text-[var(--text-subtle)]">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-[2px] w-3 bg-[var(--gold-primary)]" />
              Mizan
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="h-[2px] w-3 border-t border-dashed border-[var(--gold-deep)]"
              />
              60/40 benchmark
            </span>
          </div>
        </div>

        {/* Holdings table */}
        <div className="mt-2 px-5">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Top positions</p>
            <span className="font-mono-data text-[9px] uppercase tracking-[0.18em] text-[var(--text-subtle)]">
              5 of 24
            </span>
          </div>
          <ul className="mt-2 space-y-px">
            {holdings.map((h) => (
              <li
                key={h.ticker}
                className="grid grid-cols-[64px_1fr_72px_56px_60px] items-center gap-3 border-b border-[var(--border-subtle)] py-1.5 last:border-b-0"
              >
                <span className="font-mono-data text-[11px] uppercase tracking-tight text-[var(--text-primary)]">
                  {h.ticker}
                </span>
                <span className="truncate text-[11px] text-[var(--text-muted)]">{h.name}</span>
                <span className="text-right font-mono-data text-[11px] tabular text-[var(--text-primary)]">
                  {formatCompactUSD(h.value)}
                </span>
                <svg width="56" height="14" viewBox="0 0 60 16" aria-hidden>
                  <path
                    d={sparkPath(h.spark)}
                    fill="none"
                    stroke={h.pct >= 0 ? "#F5E6C8" : "#8B6F47"}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={h.pct >= 0 ? 0.95 : 0.65}
                  />
                </svg>
                <span
                  className={`text-right font-mono-data text-[11px] tabular ${
                    h.pct >= 0 ? "text-[var(--gold-cream)]" : "text-[var(--text-muted)]"
                  }`}
                >
                  {h.pct >= 0 ? "+" : ""}
                  {h.pct.toFixed(2)}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* KPI strip */}
        <div className="mt-3 grid grid-cols-5 divide-x divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
          {KPIS.map((k) => (
            <div key={k.label} className="px-2 py-2.5 text-center">
              <p className="font-mono-data text-[8.5px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                {k.label}
              </p>
              <div className="mt-1 font-mono-data text-[13px] tabular text-[var(--text-primary)]">
                {k.value}
              </div>
            </div>
          ))}
        </div>

        {/* Ticker tape — scrolling marquee */}
        <div className="relative overflow-hidden border-t border-[var(--border-default)] bg-[var(--bg-base)] py-2">
          <div
            className="flex whitespace-nowrap"
            style={{
              animation: "tape-scroll 48s linear infinite",
              willChange: "transform",
            }}
          >
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0">
                {TAPE_ITEMS.map(([sym, val]) => {
                  const isUp = val.startsWith("+");
                  const isDown = val.startsWith("-");
                  return (
                    <span
                      key={`${dup}-${sym}`}
                      className="inline-flex items-center gap-1.5 px-4 font-mono-data text-[10px] uppercase tracking-[0.14em]"
                    >
                      <span className="text-[var(--text-muted)]">{sym}</span>
                      <span
                        className={
                          isUp
                            ? "text-[var(--gold-cream)] tabular"
                            : isDown
                              ? "text-[var(--gold-deep)] tabular"
                              : "text-[var(--text-subtle)] tabular"
                        }
                      >
                        {val}
                      </span>
                      <span aria-hidden className="text-[var(--text-subtle)]">
                        ·
                      </span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

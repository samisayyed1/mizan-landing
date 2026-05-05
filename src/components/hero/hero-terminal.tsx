"use client";

import { useEffect, useState } from "react";

const BASE_VALUE = 4_289_531;

function formatUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

/**
 * Compact portfolio-terminal preview for the hero with a live-ticking
 * value driven by useState + setInterval (no Motion dependency for the
 * ticker — keeps it deterministic).
 *
 * Entrance animation handled by the parent's CSS hero-tilt-in class.
 */
export function HeroTerminal() {
  const [value, setValue] = useState(BASE_VALUE);
  const [trend, setTrend] = useState(17.85);

  useEffect(() => {
    const id = setInterval(() => {
      // Realistic micro-movement: ±$200..$1200, biased slightly upward
      setValue((v) => v + (Math.random() - 0.45) * 1200);
      setTrend((t) => Math.max(15.6, Math.min(19.4, t + (Math.random() - 0.5) * 0.04)));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      {/* Outer gold halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-[64px] bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.22),transparent_70%)] blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-[0_60px_140px_-40px_rgba(0,0,0,0.85),0_0_60px_-20px_rgba(212,165,116,0.18)] transition-transform duration-300 ease-out hover:-translate-y-1">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 border-b border-[var(--border-subtle)] bg-[var(--bg-base)] px-4 py-3">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--bg-overlay)]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--bg-overlay)]" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[var(--bg-overlay)]" />
          <span className="ml-3 font-mono-data text-[10px] uppercase tracking-[0.18em] text-[var(--text-subtle)]">
            mizan · overview
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono-data text-[10px] uppercase tracking-[0.18em] text-[var(--gold-cream)]">
            <span
              aria-hidden
              className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--gold-cream)]"
            />
            Live
          </span>
        </div>

        {/* Headline number */}
        <div className="px-6 pt-6">
          <p className="eyebrow">Total net worth</p>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-mono-data text-[40px] leading-none text-[var(--text-primary)] tabular md:text-[44px]">
              {formatUSD(value)}
            </span>
          </div>
          <div className="mt-2 font-mono-data text-[13px] text-[var(--gold-cream)] tabular">
            +{trend.toFixed(2)}% · trailing 12 months
          </div>
        </div>

        {/* Static area chart with gold gradient — same shape as PortfolioMini */}
        <div className="mt-2 px-2">
          <svg
            viewBox="0 0 800 200"
            className="h-[180px] w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A574" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hero-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F5E6C8" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#D4A574" />
                <stop offset="100%" stopColor="#F5E6C8" />
              </linearGradient>
            </defs>

            {/* Hairline grid */}
            <line
              x1="0"
              x2="800"
              y1="60"
              y2="60"
              stroke="rgba(139,111,71,0.12)"
              strokeDasharray="2 6"
            />
            <line
              x1="0"
              x2="800"
              y1="120"
              y2="120"
              stroke="rgba(139,111,71,0.12)"
              strokeDasharray="2 6"
            />

            {/* Area fill */}
            <path
              d="M0 152 C 90 138, 160 148, 220 168 S 290 178, 330 158 S 430 96, 510 70 S 630 38, 740 22 L 800 14 L 800 200 L 0 200 Z"
              fill="url(#hero-area)"
            />
            {/* Stroke */}
            <path
              d="M0 152 C 90 138, 160 148, 220 168 S 290 178, 330 158 S 430 96, 510 70 S 630 38, 740 22 L 800 14"
              fill="none"
              stroke="url(#hero-stroke)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Endpoint dot — pulses via CSS keyframe */}
            <circle cx="800" cy="14" r="6" fill="#F5E6C8" opacity="0.18">
              <animate attributeName="r" values="6;14;6" dur="2.4s" repeatCount="indefinite" />
              <animate
                attributeName="opacity"
                values="0.18;0;0.18"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="800" cy="14" r="3" fill="#F5E6C8" />
          </svg>
        </div>

        {/* Allocation row */}
        <div className="grid grid-cols-4 divide-x divide-[rgba(139,111,71,0.18)] border-t border-[rgba(139,111,71,0.18)]">
          {[
            { label: "Equities", pct: "62%" },
            { label: "Crypto", pct: "14%" },
            { label: "Real estate", pct: "18%" },
            { label: "Cash", pct: "6%" },
          ].map((a) => (
            <div key={a.label} className="px-3 py-4 md:px-4">
              <p className="eyebrow text-[9px]">{a.label}</p>
              <div className="mt-1.5 font-mono-data text-lg text-[var(--text-primary)] tabular md:text-xl">
                {a.pct}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calibration marks */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-3 left-6 font-mono-data text-[9px] uppercase tracking-[0.2em] text-[var(--text-subtle)]"
      >
        01
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-3 right-6 font-mono-data text-[9px] uppercase tracking-[0.2em] text-[var(--text-subtle)]"
      >
        m · usd
      </div>
    </div>
  );
}

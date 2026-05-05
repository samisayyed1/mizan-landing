"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import { BentoTile } from "../bento-tile";

const MIZAN_SERIES = [
  { x: 0, v: 100 },
  { x: 1, v: 102.4 },
  { x: 2, v: 104.1 },
  { x: 3, v: 99.6 },
  { x: 4, v: 101.8 },
  { x: 5, v: 105.3 },
  { x: 6, v: 108.1 },
  { x: 7, v: 110.4 },
  { x: 8, v: 112.6 },
  { x: 9, v: 115.2 },
  { x: 10, v: 117.8 },
  { x: 11, v: 121.4 },
];

const BENCHMARK = [
  { x: 0, v: 100 },
  { x: 1, v: 100.8 },
  { x: 2, v: 102.2 },
  { x: 3, v: 99.1 },
  { x: 4, v: 100.4 },
  { x: 5, v: 102.8 },
  { x: 6, v: 105.1 },
  { x: 7, v: 106.3 },
  { x: 8, v: 107.4 },
  { x: 9, v: 108.9 },
  { x: 10, v: 110.2 },
  { x: 11, v: 112.6 },
];

const COMBINED = MIZAN_SERIES.map((p, i) => ({
  x: p.x,
  mizan: p.v,
  bench: BENCHMARK[i]?.v ?? 100,
}));

export function PerformanceTile({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [twrr, setTwrr] = useState(0);
  const [maxDD, setMaxDD] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const total = 1400;
    const animate = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      const eased = 1 - (1 - p) ** 3;
      setTwrr(21.4 * eased);
      setMaxDD(-4.4 * eased);
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          frame = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <BentoTile
      eyebrow="01 · Performance Intelligence"
      title="Time-weighted returns. Drawdowns. Drift."
      body="The numbers institutions actually use, on a portfolio you actually own."
      className={className}
    >
      <div ref={ref} className="space-y-6">
        <div className="flex items-end gap-8">
          <div>
            <p className="eyebrow">TWRR · 1Y</p>
            <div className="mt-2 font-mono-data text-3xl text-[var(--gold-cream)] tabular">
              +{twrr.toFixed(1)}%
            </div>
          </div>
          <div>
            <p className="eyebrow">Max drawdown</p>
            <div className="mt-2 font-mono-data text-3xl text-[var(--text-primary)] tabular">
              {maxDD.toFixed(1)}%
            </div>
          </div>
          <div className="hidden sm:block">
            <p className="eyebrow">vs benchmark</p>
            <div className="mt-2 font-mono-data text-3xl text-[var(--gold-cream)] tabular">
              +8.8%
            </div>
          </div>
        </div>

        <div className="-mx-2 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={COMBINED}
              margin={{ top: 4, right: 8, bottom: 4, left: 8 }}
            >
              <defs>
                <linearGradient id="perf-mizan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4A574" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#D4A574" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis hide domain={["dataMin - 4", "dataMax + 4"]} />
              <Area
                type="monotone"
                dataKey="bench"
                stroke="rgba(139,111,71,0.45)"
                strokeDasharray="3 4"
                strokeWidth={1.25}
                fill="transparent"
                isAnimationActive
                animationDuration={1200}
                dot={false}
                activeDot={false}
              />
              <Area
                type="monotone"
                dataKey="mizan"
                stroke="#D4A574"
                strokeWidth={1.75}
                fill="url(#perf-mizan)"
                isAnimationActive
                animationDuration={1400}
                dot={false}
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center gap-6 font-mono-data text-[10px] uppercase tracking-[0.18em] text-[var(--text-subtle)]">
          <span className="inline-flex items-center gap-2">
            <motion.span
              aria-hidden
              className="h-[2px] w-4 bg-[var(--gold-primary)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            Your portfolio
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="h-[2px] w-4 border-t border-dashed border-[var(--gold-deep)]"
            />
            Benchmark
          </span>
        </div>
      </div>
    </BentoTile>
  );
}

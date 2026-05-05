"use client";

import { motion } from "framer-motion";
import { BentoTile } from "../bento-tile";

const CURRENT = [
  { label: "Equities", pct: 71, color: "#D4A574" },
  { label: "Fixed income", pct: 14, color: "#8B6F47" },
  { label: "Alternatives", pct: 9, color: "#F5E6C8" },
  { label: "Cash", pct: 6, color: "#5C5A56" },
] as const;

const TARGET = [
  { label: "Equities", pct: 60, color: "#D4A574" },
  { label: "Fixed income", pct: 25, color: "#8B6F47" },
  { label: "Alternatives", pct: 10, color: "#F5E6C8" },
  { label: "Cash", pct: 5, color: "#5C5A56" },
] as const;

function donutSegments(slices: readonly { pct: number; color: string }[]) {
  const C = 2 * Math.PI * 36;
  let cumulative = 0;
  return slices.map((s) => {
    const length = (s.pct / 100) * C;
    const dasharray = `${length} ${C - length}`;
    const dashoffset = -((cumulative / 100) * C);
    cumulative += s.pct;
    return { ...s, dasharray, dashoffset };
  });
}

export function PlanningTile({ className }: { className?: string }) {
  const current = donutSegments(CURRENT);
  const target = donutSegments(TARGET);

  return (
    <BentoTile
      eyebrow="02 · Portfolio Planning"
      title="Rebalance with intent."
      body="Drift alerts before they become drift problems."
      className={className}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-3">
            <p className="eyebrow">Current</p>
            <svg viewBox="0 0 80 80" className="h-24 w-24" aria-hidden>
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="var(--bg-base)"
                strokeWidth="6"
              />
              {current.map((s, i) => (
                <motion.circle
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable order
                  key={i}
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke={s.color}
                  strokeWidth="6"
                  strokeDasharray={s.dasharray}
                  strokeDashoffset={s.dashoffset}
                  transform="rotate(-90 40 40)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.0, delay: i * 0.1 }}
                />
              ))}
            </svg>
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="eyebrow text-[var(--gold-primary)]">Target</p>
            <svg viewBox="0 0 80 80" className="h-24 w-24" aria-hidden>
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="var(--bg-base)"
                strokeWidth="6"
              />
              {target.map((s, i) => (
                <motion.circle
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable order
                  key={i}
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke={s.color}
                  strokeWidth="6"
                  strokeDasharray={s.dasharray}
                  strokeDashoffset={s.dashoffset}
                  transform="rotate(-90 40 40)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.0, delay: 0.5 + i * 0.1 }}
                />
              ))}
            </svg>
          </div>
        </div>

        <ul className="space-y-2 border-t border-[var(--border-subtle)] pt-4">
          {CURRENT.map((c, i) => {
            const target = TARGET[i];
            if (!target) return null;
            const drift = c.pct - target.pct;
            return (
              <li
                key={c.label}
                className="flex items-center justify-between font-mono-data text-xs text-[var(--text-muted)]"
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full"
                    style={{ background: c.color }}
                  />
                  <span className="uppercase tracking-[0.12em]">{c.label}</span>
                </span>
                <span className="tabular text-[var(--text-primary)]">
                  {drift > 0 ? "+" : ""}
                  {drift}%
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </BentoTile>
  );
}

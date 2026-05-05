"use client";

import { motion } from "framer-motion";
import { BentoTile } from "../bento-tile";

/**
 * Time-arc projection chart. SVG path from "Today" rising to "Goal" with
 * milestone markers. Pure SVG so no Recharts dependency for this tile.
 */
export function GoalsTile({ className }: { className?: string }) {
  return (
    <BentoTile
      eyebrow="04 · Goals & Retirement"
      title="The trajectory you actually want."
      body="Withdrawal modeling. FIRE projections. Scenario testing."
      className={className}
    >
      <div className="space-y-5">
        <div className="flex items-end justify-between font-mono-data text-xs">
          <div>
            <div className="eyebrow">Today</div>
            <div className="mt-1 text-[var(--text-primary)] tabular">$4.29M</div>
          </div>
          <div className="text-right">
            <div className="eyebrow text-[var(--gold-primary)]">Goal · 2042</div>
            <div className="mt-1 text-[var(--gold-cream)] tabular">$11.8M</div>
          </div>
        </div>

        <svg viewBox="0 0 320 120" className="h-32 w-full" aria-hidden>
          <defs>
            <linearGradient id="goal-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4A574" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* horizontal grid hairline */}
          <line
            x1="0"
            x2="320"
            y1="60"
            y2="60"
            stroke="rgba(139,111,71,0.18)"
            strokeDasharray="2 5"
          />
          <line
            x1="0"
            x2="320"
            y1="100"
            y2="100"
            stroke="rgba(139,111,71,0.18)"
            strokeDasharray="2 5"
          />

          {/* projection envelope (range) */}
          <motion.path
            d="M0 92 Q 80 80, 160 56 T 320 14 L 320 120 L 0 120 Z"
            fill="url(#goal-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4 }}
          />
          {/* mean projection */}
          <motion.path
            d="M0 92 Q 80 80, 160 56 T 320 14"
            fill="none"
            stroke="#D4A574"
            strokeWidth="1.75"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* milestones */}
          {[0, 80, 160, 240, 320].map((cx, i) => {
            const cy = [92, 80, 56, 30, 14][i] ?? 60;
            return (
              <motion.circle
                // biome-ignore lint/suspicious/noArrayIndexKey: static
                key={i}
                cx={cx}
                cy={cy}
                r={i === 4 ? 4 : 2.5}
                fill={i === 4 ? "#F5E6C8" : "#8B6F47"}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              />
            );
          })}
        </svg>

        <div className="grid grid-cols-3 gap-3 border-t border-[var(--border-subtle)] pt-4 font-mono-data text-[11px] text-[var(--text-muted)]">
          <div>
            <div className="eyebrow">Years</div>
            <div className="mt-1 text-[var(--text-primary)] tabular">17</div>
          </div>
          <div>
            <div className="eyebrow">Withdrawal</div>
            <div className="mt-1 text-[var(--text-primary)] tabular">3.4%</div>
          </div>
          <div>
            <div className="eyebrow">Probability</div>
            <div className="mt-1 text-[var(--gold-cream)] tabular">94%</div>
          </div>
        </div>
      </div>
    </BentoTile>
  );
}

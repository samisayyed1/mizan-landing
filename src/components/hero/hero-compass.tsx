"use client";

import { useEffect, useState } from "react";

const BASE_VALUE = 4_289_531;
const RETURN_PCT = 17.85;

/* Geometry */
const SIZE = 480;
const CENTER = SIZE / 2;
const R_OUTER = 220;
const R_TICK_OUTER = 220;
const R_TICK_INNER_SHORT = 214;
const R_TICK_INNER_LONG = 206;
const R_RETURN_ARC = 200;
const R_ALLOC = 168;
const R_INNER_DISK = 130;
const R_NOW = 230;

/* Allocation in % — must sum to 100 */
const ALLOC = [
  { label: "Equities", pct: 62, color: "#D4A574", opacity: 1 },
  { label: "Crypto", pct: 14, color: "#8B6F47", opacity: 1 },
  { label: "Property", pct: 18, color: "#F5E6C8", opacity: 0.7 },
  { label: "Cash", pct: 6, color: "#5C5A56", opacity: 1 },
] as const;

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [
    CENTER + radius * Math.cos(a),
    CENTER + radius * Math.sin(a),
  ] as const;
}

/** SVG arc path between two angles, in degrees, going clockwise. */
function arcPath(startDeg: number, endDeg: number, radius: number): string {
  const [x1, y1] = polar(startDeg, radius);
  const [x2, y2] = polar(endDeg, radius);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
}

function formatCompactUSD(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${Math.round(n)}`;
}

function formatExactUSD(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

/**
 * The Mizan Compass — circular portfolio instrument inspired by mechanical
 * watch faces and the literal meaning of 'mizan' (balance/scale, Arabic).
 *
 * Layout (concentric):
 *   Outer ring     hairline + 12 month tick marks
 *   Return arc     gold-cream filled arc, 0° → (RETURN_PCT * 3.6°)
 *   Allocation ring 4 sectors, varying gold weights
 *   Center disk    big $X.XXM number + trailing return
 *   Now-pointer    thin gold tick that rotates 360° / 60s (CSS keyframe)
 *
 * Pure SSR — no client JS for the layout. A useState ticker nudges the
 * centre value every 4s so it feels alive without being noisy.
 */
export function HeroCompass() {
  const [value, setValue] = useState(BASE_VALUE);

  useEffect(() => {
    const id = setInterval(() => {
      // ±$200..$1500, biased slightly upward
      setValue((v) => v + (Math.random() - 0.4) * 1500);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  /* Build allocation sector arcs */
  let cursor = 0;
  const allocSectors = ALLOC.map((a) => {
    const start = cursor;
    cursor += (a.pct / 100) * 360;
    return {
      ...a,
      startDeg: start + 1.2, // tiny gap between sectors
      endDeg: cursor - 1.2,
    };
  });

  /* Return arc — fills 0..(RETURN_PCT × 3.6) degrees out of 360 */
  const returnEndDeg = Math.min(355, RETURN_PCT * 3.6);

  return (
    <div className="relative">
      {/* Outer ambient halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.22),transparent_70%)] blur-3xl"
      />

      {/* Soft inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,230,200,0.05),transparent_70%)]"
      />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="h-auto w-full max-w-[520px]"
        aria-label="Mizan portfolio compass"
        role="img"
      >
        <defs>
          <linearGradient id="compass-return" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5E6C8" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#D4A574" stopOpacity="1" />
            <stop offset="100%" stopColor="#F5E6C8" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="compass-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1B1E28" />
            <stop offset="100%" stopColor="#0A0B10" />
          </radialGradient>
          <filter
            id="compass-glow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Outer hairline */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R_OUTER}
          fill="none"
          stroke="rgba(139,111,71,0.35)"
          strokeWidth="1"
        />

        {/* 12 month tick marks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const long = i % 3 === 0;
          const [x1, y1] = polar(angle, R_TICK_OUTER);
          const [x2, y2] = polar(
            angle,
            long ? R_TICK_INNER_LONG : R_TICK_INNER_SHORT,
          );
          return (
            <line
              // biome-ignore lint/suspicious/noArrayIndexKey: static
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={long ? "#D4A574" : "rgba(139,111,71,0.45)"}
              strokeWidth={long ? "1.5" : "1"}
              strokeLinecap="round"
            />
          );
        })}

        {/* Cardinal labels (12-month range markers) */}
        {[
          { deg: 0, label: "MAY" },
          { deg: 90, label: "AUG" },
          { deg: 180, label: "NOV" },
          { deg: 270, label: "FEB" },
        ].map((m) => {
          const [x, y] = polar(m.deg, R_OUTER + 20);
          return (
            <text
              key={m.label}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#5C5A56"
              fontFamily="ui-monospace, 'SF Mono', monospace"
              fontSize="9"
              letterSpacing="2"
            >
              {m.label}
            </text>
          );
        })}

        {/* Return arc background (full ring at very low opacity) */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R_RETURN_ARC}
          fill="none"
          stroke="rgba(212,165,116,0.10)"
          strokeWidth="3"
        />

        {/* Return arc — animated draw on load via stroke-dasharray */}
        <path
          d={arcPath(0, returnEndDeg, R_RETURN_ARC)}
          fill="none"
          stroke="url(#compass-return)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px rgba(212,165,116,0.4))",
            strokeDasharray: 1400,
            strokeDashoffset: 1400,
            animation:
              "compass-arc-draw 1.8s cubic-bezier(0.16,1,0.3,1) 0.3s forwards",
          }}
        />

        {/* Return-arc endpoint dot — pulses */}
        {(() => {
          const [x, y] = polar(returnEndDeg, R_RETURN_ARC);
          return (
            <g
              style={{
                opacity: 0,
                animation: "compass-fade-in 0.5s ease-out 2.0s forwards",
              }}
            >
              <circle cx={x} cy={y} r="8" fill="#F5E6C8" opacity="0.18">
                <animate
                  attributeName="r"
                  values="8;14;8"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.18;0;0.18"
                  dur="2.6s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={x} cy={y} r="3.5" fill="#F5E6C8" />
            </g>
          );
        })()}

        {/* Allocation sectors */}
        {allocSectors.map((s, i) => (
          <path
            // biome-ignore lint/suspicious/noArrayIndexKey: stable order
            key={i}
            d={arcPath(s.startDeg, s.endDeg, R_ALLOC)}
            fill="none"
            stroke={s.color}
            strokeOpacity={s.opacity}
            strokeWidth="9"
            strokeLinecap="butt"
            style={{
              strokeDasharray: 1200,
              strokeDashoffset: 1200,
              animation: `compass-arc-draw 1.2s cubic-bezier(0.16,1,0.3,1) ${1.0 + i * 0.15}s forwards`,
            }}
          />
        ))}

        {/* Center disk — base */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R_INNER_DISK}
          fill="url(#compass-center)"
          stroke="rgba(139,111,71,0.30)"
          strokeWidth="1"
        />

        {/* Center disk — gold hairline frame at 4 cardinals */}
        {[0, 90, 180, 270].map((deg) => {
          const [x1, y1] = polar(deg, R_INNER_DISK - 8);
          const [x2, y2] = polar(deg, R_INNER_DISK + 6);
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#D4A574"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.7"
            />
          );
        })}

        {/* Center text — eyebrow */}
        <text
          x={CENTER}
          y={CENTER - 38}
          textAnchor="middle"
          fill="#5C5A56"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          letterSpacing="2.2"
        >
          TOTAL · USD
        </text>

        {/* Center text — big number (live ticker) */}
        <text
          x={CENTER}
          y={CENTER + 6}
          textAnchor="middle"
          fill="#F4F2EC"
          fontFamily="ui-monospace, 'SF Mono', monospace"
          fontSize="42"
          fontWeight="500"
          letterSpacing="-0.5"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {formatCompactUSD(value)}
        </text>

        {/* Center text — exact value, small */}
        <text
          x={CENTER}
          y={CENTER + 32}
          textAnchor="middle"
          fill="#9B9892"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {formatExactUSD(value)}
        </text>

        {/* Center text — return % */}
        <text
          x={CENTER}
          y={CENTER + 60}
          textAnchor="middle"
          fill="#F5E6C8"
          fontFamily="ui-monospace, monospace"
          fontSize="13"
          letterSpacing="0.5"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          +{RETURN_PCT.toFixed(2)}% · 12M
        </text>

        {/* Now-pointer — rotates slowly */}
        <g
          style={{
            transformOrigin: `${CENTER}px ${CENTER}px`,
            animation: "compass-now-rotate 60s linear infinite",
          }}
        >
          <line
            x1={CENTER}
            y1={CENTER - R_NOW + 4}
            x2={CENTER}
            y2={CENTER - R_NOW + 14}
            stroke="#F5E6C8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx={CENTER} cy={CENTER - R_NOW + 4} r="2" fill="#F5E6C8" />
        </g>

        {/* Live indicator — top of dial */}
        <g
          style={{
            opacity: 0,
            animation: "compass-fade-in 0.5s ease-out 1.5s forwards",
          }}
        >
          <circle cx={CENTER} cy={28} r="2.5" fill="#F5E6C8">
            <animate
              attributeName="opacity"
              values="1;0.4;1"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x={CENTER + 10}
            y={32}
            fill="#9B9892"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            letterSpacing="2.5"
          >
            LIVE
          </text>
        </g>

        {/* Bottom signature — Mizan compass */}
        <text
          x={CENTER}
          y={SIZE - 18}
          textAnchor="middle"
          fill="#5C5A56"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          letterSpacing="3"
        >
          MIZAN · COMPASS
        </text>
      </svg>

      {/* Allocation legend — small chips below dial */}
      <ul
        className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2 px-4 sm:grid-cols-4"
        style={{
          opacity: 0,
          animation: "compass-fade-in 0.6s ease-out 2.4s forwards",
        }}
      >
        {ALLOC.map((a) => (
          <li
            key={a.label}
            className="flex items-center gap-2 font-mono-data text-[10px] uppercase tracking-[0.18em] text-[var(--text-subtle)]"
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: a.color, opacity: a.opacity }}
            />
            <span className="text-[var(--text-muted)]">{a.label}</span>
            <span className="ml-auto tabular text-[var(--text-primary)]">
              {a.pct}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

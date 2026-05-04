"use client";

import { Reveal } from "@/components/ui/reveal";
import { productShotCopy } from "@/content/copy";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * 3D-tilted desktop dashboard mock. Pure SVG/CSS — no raster image dependency.
 * Parallaxes vertically on scroll. Replace inner SVG with a real screenshot
 * when one is ready.
 */
export function ProductShot() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="product"
      ref={ref}
      aria-labelledby="product-heading"
      className="relative isolate mx-auto max-w-container px-6 py-32 md:px-10 md:py-40"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--gold-primary)]">
          {productShotCopy.eyebrow}
        </p>
        <h2
          id="product-heading"
          className="mt-4 font-serif text-4xl font-light tracking-[-0.02em] text-[var(--text-primary)] md:text-5xl"
        >
          {productShotCopy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
          {productShotCopy.body}
        </p>
      </Reveal>

      <motion.div style={{ y, perspective: 2400 }} className="relative mx-auto mt-20 max-w-5xl">
        {/* Gold halo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-32 -inset-y-16 -z-10 rounded-[64px] bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.15),transparent_70%)] blur-3xl"
        />

        <motion.div
          initial={{ rotateX: 14, opacity: 0 }}
          whileInView={{ rotateX: 8, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center top",
          }}
          className="relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8),0_30px_60px_-20px_rgba(212,165,116,0.15)]"
        >
          <DashboardMock />
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Minimal SVG dashboard. Replace with real screenshot when ready. */
function DashboardMock() {
  return (
    <div className="aspect-[16/10] w-full">
      <svg
        viewBox="0 0 1600 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-label="Mizan desktop dashboard preview"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14161E" />
            <stop offset="100%" stopColor="#0A0B10" />
          </linearGradient>
          <linearGradient id="goldLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F5E6C8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#D4A574" />
            <stop offset="100%" stopColor="#F5E6C8" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A574" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1600" height="1000" fill="url(#bgGradient)" />

        {/* Window chrome */}
        <g>
          <rect x="0" y="0" width="1600" height="48" fill="#0A0B10" />
          <circle cx="22" cy="24" r="6" fill="#2A2D38" />
          <circle cx="42" cy="24" r="6" fill="#2A2D38" />
          <circle cx="62" cy="24" r="6" fill="#2A2D38" />
        </g>

        {/* Sidebar */}
        <g transform="translate(0, 48)">
          <rect width="220" height="952" fill="#0E1018" />
          <text
            x="32"
            y="40"
            fontFamily="ui-monospace"
            fontSize="14"
            fill="#D4A574"
            fontWeight="700"
          >
            M Mizan
          </text>
          {[
            "Overview",
            "Holdings",
            "Performance",
            "Allocation",
            "Goals",
            "Connect",
            "Settings",
          ].map((label, i) => (
            <g key={label} transform={`translate(0, ${80 + i * 44})`}>
              <rect
                x="16"
                y="0"
                width="188"
                height="32"
                rx="6"
                fill={i === 0 ? "#1B1E28" : "transparent"}
              />
              <text
                x="32"
                y="20"
                fontFamily="ui-sans-serif"
                fontSize="13"
                fill={i === 0 ? "#F4F2EC" : "#8B8478"}
              >
                {label}
              </text>
            </g>
          ))}
        </g>

        {/* Main content */}
        <g transform="translate(220, 48)">
          {/* Top KPI row */}
          <g transform="translate(40, 40)">
            <text
              x="0"
              y="20"
              fontFamily="ui-sans-serif"
              fontSize="12"
              fill="#8B8478"
              letterSpacing="2"
            >
              TOTAL NET WORTH
            </text>
            <text x="0" y="76" fontFamily="serif" fontSize="56" fill="#F4F2EC" fontWeight="300">
              $4,289,531
            </text>
            <text x="0" y="108" fontFamily="ui-monospace" fontSize="14" fill="#34D399">
              + $42,184 (+0.99%) this week
            </text>
          </g>

          {/* Time range pills */}
          <g transform="translate(900, 64)">
            {["1D", "1W", "1M", "1Y", "ALL"].map((p, i) => (
              <g key={p} transform={`translate(${i * 60}, 0)`}>
                <rect
                  width="48"
                  height="28"
                  rx="6"
                  fill={i === 3 ? "#1B1E28" : "transparent"}
                  stroke="#2A2D38"
                  strokeWidth="1"
                />
                <text
                  x="24"
                  y="18"
                  fontFamily="ui-monospace"
                  fontSize="11"
                  fill={i === 3 ? "#D4A574" : "#8B8478"}
                  textAnchor="middle"
                >
                  {p}
                </text>
              </g>
            ))}
          </g>

          {/* Chart */}
          <g transform="translate(40, 180)">
            <rect
              width="1300"
              height="380"
              rx="12"
              fill="#14161E"
              stroke="#1B1E28"
              strokeWidth="1"
            />
            <g transform="translate(40, 40)">
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="0"
                  x2="1220"
                  y1={i * 80}
                  y2={i * 80}
                  stroke="#1B1E28"
                  strokeDasharray="2 6"
                />
              ))}
              <path
                d="M0 240 C 100 220, 200 230, 300 200 S 500 120, 600 130 S 800 100, 900 70 S 1100 40, 1220 30 L 1220 320 L 0 320 Z"
                fill="url(#areaFill)"
              />
              <path
                d="M0 240 C 100 220, 200 230, 300 200 S 500 120, 600 130 S 800 100, 900 70 S 1100 40, 1220 30"
                fill="none"
                stroke="url(#goldLine)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* End-of-line dot */}
              <circle cx="1220" cy="30" r="4" fill="#F5E6C8" />
              <circle cx="1220" cy="30" r="10" fill="#F5E6C8" opacity="0.15" />
            </g>
          </g>

          {/* Bottom holdings strip */}
          <g transform="translate(40, 600)">
            {[
              ["Equities", "62%", "$2,659,510"],
              ["Crypto", "14%", "$600,534"],
              ["Real estate", "18%", "$772,116"],
              ["Cash", "6%", "$257,371"],
            ].map(([k, p, v], i) => (
              <g key={k} transform={`translate(${i * 320}, 0)`}>
                <rect
                  width="300"
                  height="120"
                  rx="12"
                  fill="#14161E"
                  stroke="#1B1E28"
                  strokeWidth="1"
                />
                <text
                  x="20"
                  y="32"
                  fontFamily="ui-mono"
                  fontSize="11"
                  fill="#8B8478"
                  letterSpacing="2"
                >
                  {k?.toUpperCase()}
                </text>
                <text
                  x="20"
                  y="68"
                  fontFamily="serif"
                  fontSize="32"
                  fill="#F4F2EC"
                  fontWeight="300"
                >
                  {p}
                </text>
                <text x="20" y="100" fontFamily="ui-monospace" fontSize="12" fill="#B8B4A8">
                  {v}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}

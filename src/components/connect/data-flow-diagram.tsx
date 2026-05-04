"use client";

import { connectCopy } from "@/content/copy";
import { motion } from "framer-motion";

/**
 * Animated SVG: Your device ↔ Mizan Connect ↔ SnapTrade ↔ Brokers
 * Pulsing gold lines flow between nodes.
 */
export function DataFlowDiagram() {
  const nodes = connectCopy.diagramNodes;
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 1000 240"
        className="w-full"
        aria-label="Mizan Connect data flow"
        role="img"
      >
        <defs>
          <linearGradient id="flowGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4A574" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4A574" />
            <stop offset="100%" stopColor="#D4A574" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Static connecting line */}
        <line
          x1="120"
          y1="120"
          x2="880"
          y2="120"
          stroke="#2A2D38"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Animated pulse — left to right (broker → device) */}
        <motion.line
          x1="120"
          y1="120"
          x2="880"
          y2="120"
          stroke="url(#flowGold)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.2 }}
        />

        {/* Pulse dot */}
        <motion.circle
          r="6"
          fill="#F5E6C8"
          initial={{ cx: 880, opacity: 0 }}
          whileInView={{ cx: 120, opacity: [0, 1, 1, 0] }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
          cy="120"
        />

        {/* Nodes */}
        {nodes.map((label, i) => {
          const x = 120 + (i * 760) / (nodes.length - 1);
          const isPrimary = i === 0 || i === 1;
          return (
            <g key={label} transform={`translate(${x}, 120)`}>
              <motion.circle
                r="36"
                fill="#14161E"
                stroke={isPrimary ? "#D4A574" : "#2A2D38"}
                strokeWidth="1.5"
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * i,
                  ease: [0.33, 1, 0.68, 1],
                }}
              />
              {isPrimary ? (
                <motion.circle
                  r="36"
                  fill="none"
                  stroke="#D4A574"
                  strokeWidth="1"
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{
                    duration: 2.4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                />
              ) : null}
              <text
                y="68"
                textAnchor="middle"
                fontFamily="ui-monospace"
                fontSize="11"
                fill="#B8B4A8"
                letterSpacing="2"
              >
                {label.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

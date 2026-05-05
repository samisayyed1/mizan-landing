"use client";

import { useReducedMotionPref } from "@/lib/use-reduced-motion";
import { motion } from "framer-motion";

/**
 * Hand-drawn balance scale (mizan = balance, in Arabic). 1.5px stroke
 * gold-deep. motion.path with pathLength 0→1 over 1.6s ease-out on mount.
 *
 * Decorative; aria-hidden. Falls back to fully-drawn static path under
 * prefers-reduced-motion.
 */
export function BalanceScale({ className }: { className?: string }) {
  const reduced = useReducedMotionPref();

  const draw = (delay: number) =>
    reduced
      ? { initial: false, animate: { pathLength: 1, opacity: 0.65 } }
      : ({
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 0.65 },
          transition: {
            pathLength: { duration: 1.6, ease: [0.16, 1, 0.3, 1], delay },
          },
        } as const);

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Vertical column */}
      <motion.line x1="120" y1="60" x2="120" y2="200" {...draw(0)} />
      {/* Base */}
      <motion.line x1="92" y1="200" x2="148" y2="200" {...draw(0.05)} />
      {/* Crossbeam */}
      <motion.line x1="40" y1="78" x2="200" y2="78" {...draw(0.15)} />
      {/* Top finial */}
      <motion.circle cx="120" cy="60" r="3" {...draw(0.25)} />
      {/* Left chain */}
      <motion.line x1="56" y1="78" x2="44" y2="120" {...draw(0.3)} />
      <motion.line x1="56" y1="78" x2="68" y2="120" {...draw(0.3)} />
      {/* Right chain */}
      <motion.line x1="184" y1="78" x2="172" y2="120" {...draw(0.3)} />
      <motion.line x1="184" y1="78" x2="196" y2="120" {...draw(0.3)} />
      {/* Left pan (shallow ellipse) */}
      <motion.path d="M30 122 Q56 138 82 122" {...draw(0.5)} />
      <motion.path d="M30 122 Q56 130 82 122" {...draw(0.55)} />
      {/* Right pan */}
      <motion.path d="M158 122 Q184 138 210 122" {...draw(0.5)} />
      <motion.path d="M158 122 Q184 130 210 122" {...draw(0.55)} />
    </svg>
  );
}

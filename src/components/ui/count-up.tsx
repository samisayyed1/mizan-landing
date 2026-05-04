"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Format = "money" | "int";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: Format;
  duration?: number;
};

function formatValue(n: number, format: Format): string {
  if (format === "money") {
    if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return Math.round(n).toString();
  }
  return Math.round(n).toLocaleString("en-US");
}

/**
 * Animated number counter. Counts from 0 → value when scrolled into view.
 * Respects prefers-reduced-motion via Framer Motion's MotionConfig.
 */
export function CountUp({ value, prefix, suffix, format = "int", duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => formatValue(v, format));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.33, 1, 0.68, 1],
    });
    return () => controls.stop();
  }, [inView, value, duration, mv]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      {prefix ? <span aria-hidden>{prefix}</span> : null}
      <motion.span>{display}</motion.span>
      {suffix ? <span aria-hidden>{suffix}</span> : null}
    </span>
  );
}

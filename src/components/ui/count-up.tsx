"use client";

import { COUNTUP_SPRING_OPTS } from "@/lib/motion";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type Format = "money" | "int";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: Format;
  className?: string;
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
 * Animated number counter. useInView + useSpring(60, 20) per the brief.
 * Geist Mono with tabular-nums via the parent's font class.
 */
export function CountUp({ value, prefix, suffix, format = "int", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const target = useMotionValue(0);
  const spring = useSpring(target, COUNTUP_SPRING_OPTS);
  const display = useTransform(spring, (v) => formatValue(v, format));

  useEffect(() => {
    if (inView) target.set(value);
  }, [inView, value, target]);

  return (
    <span ref={ref} className={className}>
      <span className="inline-flex items-baseline tabular">
        {prefix ? <span aria-hidden>{prefix}</span> : null}
        <motion.span>{display}</motion.span>
        {suffix ? <span aria-hidden>{suffix}</span> : null}
      </span>
    </span>
  );
}

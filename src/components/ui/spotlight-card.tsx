"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { type MouseEvent, type ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Card with cursor-following gold radial spotlight. Lifts on hover.
 */
export function SpotlightCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(212, 165, 116, 0.08), transparent 60%)`;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 transition-colors duration-300 ease-out hover:bg-[var(--bg-elevated)]",
        className,
      )}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent, type ReactNode, useRef } from "react";
import { MAGNETIC_SPRING_OPTS_OPTS } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
  className?: string;
  /** 0..1, fraction of cursor delta applied to the button. Default 0.5. */
  strength?: number;
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium tracking-tight outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-primary)] will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--gold-primary)] text-[var(--bg-base)] hover:bg-[var(--gold-cream)] px-7 py-4 transition-colors duration-150 shadow-[0_8px_32px_-12px_rgba(212,165,116,0.5)]",
  ghost:
    "border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)] px-7 py-4 bg-transparent transition-colors duration-150",
};

/**
 * Magnetic-hover button. Tracks cursor proximity, translates toward it via
 * a spring (stiffness 400 / damping 100). Disabled on touch via the parent
 * wrapping in a media query if needed.
 *
 * Strength of 0.5 (default) is the brief's MAX_DISTANCE.
 */
export function MagneticButton({
  href,
  variant = "primary",
  external,
  children,
  className,
  strength = 0.5,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, MAGNETIC_SPRING_OPTS);
  const sy = useSpring(y, MAGNETIC_SPRING_OPTS);

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" as const }
    : {};

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn(base, variants[variant], className)}
      {...linkProps}
    >
      {children}
    </motion.a>
  );
}

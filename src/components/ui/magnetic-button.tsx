"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent, type ReactNode, useRef } from "react";

type Variant = "primary" | "ghost";

type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
  className?: string;
  strength?: number;
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium tracking-tight transition-colors duration-200 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-primary)] will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--gold-primary)] text-[var(--bg-base)] hover:bg-[var(--gold-cream)] px-7 py-4 shadow-[0_8px_32px_-12px_rgba(212,165,116,0.5)] hover:shadow-[0_16px_48px_-12px_rgba(212,165,116,0.7)]",
  ghost:
    "border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)] px-7 py-4 bg-transparent",
};

/**
 * Magnetic-hover button: tracks cursor proximity and translates toward it.
 * Strength of 0.4 (default) feels responsive without being cartoonish.
 * Renders an `<a>` — use for both internal hash-anchor links and external
 * downloads. Pass `external` to add safe rel + target.
 */
export function MagneticButton({
  href,
  variant = "primary",
  external,
  children,
  className,
  strength = 0.4,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

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

  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" as const } : {};

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

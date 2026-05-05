import type { Transition, Variants } from "framer-motion";

/**
 * Mizan motion presets. Imports use the framer-motion package (now branded
 * "Motion"). Every preset is paired with a useReducedMotion-aware helper.
 *
 * Rules (Rauno-derived):
 *  - Interactions ≤200ms
 *  - Scale 0.92→1, never 0→1
 *  - Font weight never changes on hover (no layout shift)
 *  - tabular-nums on every number
 *  - Looping animations pause when off-screen (Intersection Observer)
 */

export const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1] as const;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const MAGNETIC_SPRING: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 100,
  mass: 0.5,
};

export const COUNTUP_SPRING: Transition = {
  type: "spring",
  stiffness: 60,
  damping: 20,
};

/** Standard scroll reveal — 16px translate + opacity, 600ms ease-out cubic. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_CUBIC },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_CUBIC } },
};

/** Scale reveal — 0.92 → 1, never 0 → 1. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_CUBIC },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const VIEWPORT_DEFAULT = { once: true, amount: 0.2 } as const;

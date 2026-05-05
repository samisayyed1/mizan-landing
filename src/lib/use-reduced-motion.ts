"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe wrapper around prefers-reduced-motion.
 * Returns false during SSR so we ship the visual layer; live-updates after
 * mount and on media-query changes.
 */
export function useReducedMotionPref(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

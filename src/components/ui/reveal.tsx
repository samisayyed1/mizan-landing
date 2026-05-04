"use client";

import { VIEWPORT_DEFAULT, fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
};

/** Wrap any subtree in a scroll-triggered fade-up. */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_DEFAULT}
      variants={fadeUp}
      transition={{ delay, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </Component>
  );
}

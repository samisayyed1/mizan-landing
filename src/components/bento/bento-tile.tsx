"use client";

import { VIEWPORT_DEFAULT, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Bento tile shell. 1px border, surface bg, 20px radius, 3% noise overlay,
 * gold-deep border tint on hover. No scale, no shadow — restraint.
 */
export function BentoTile({ eyebrow, title, body, children, className, delay = 0 }: Props) {
  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_DEFAULT}
      variants={fadeUp}
      transition={{ delay }}
      className={cn(
        "group grain relative isolate overflow-hidden rounded-[20px] border border-[var(--border-default)] bg-[var(--bg-surface)] p-7 transition-colors duration-200 hover:border-[rgba(139,111,71,0.45)] md:p-8",
        className,
      )}
    >
      <header>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h3 className="font-display-h2 mt-3 text-[var(--text-primary)] text-2xl md:text-[26px]">
          {title}
        </h3>
        {body ? (
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">{body}</p>
        ) : null}
      </header>

      <div className="relative mt-7">{children}</div>
    </motion.article>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { showcaseCopy } from "@/content/copy";
import { fadeUp, VIEWPORT_DEFAULT } from "@/lib/motion";
import { PortfolioMini } from "./portfolio-mini";

/**
 * Showcase section — wraps the real PortfolioMini in an editorial frame
 * with eyebrow + display-h2 + body, plus a subtle scroll-tied parallax
 * applied to the terminal.
 */
export function ShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="showcase"
      ref={ref}
      aria-labelledby="showcase-heading"
      className="relative isolate mx-auto max-w-[var(--container-default)] px-6 py-32 md:px-10 md:py-40"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_DEFAULT}
        variants={fadeUp}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="eyebrow">{showcaseCopy.eyebrow}</p>
        <h2
          id="showcase-heading"
          className="font-display-h2 mt-4 text-balance text-[var(--text-primary)]"
          style={{ fontSize: "clamp(32px, 3.5vw, 56px)", lineHeight: 1.1 }}
        >
          {showcaseCopy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
          {showcaseCopy.subtitle}
        </p>
      </motion.div>

      <motion.div style={{ y }} className="relative mx-auto mt-20 max-w-5xl">
        {/* Soft gold halo behind terminal */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-24 -inset-y-12 -z-10 rounded-[64px] bg-[radial-gradient(ellipse_at_center,rgba(212,165,116,0.10),transparent_70%)] blur-3xl"
        />
        <PortfolioMini />
      </motion.div>
    </section>
  );
}

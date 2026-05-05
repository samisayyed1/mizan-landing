"use client";

import { bentoCopy } from "@/content/copy";
import { VIEWPORT_DEFAULT, fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import { AssistantTile } from "./tiles/assistant-tile";
import { CurrencyTile } from "./tiles/currency-tile";
import { GoalsTile } from "./tiles/goals-tile";
import { PerformanceTile } from "./tiles/performance-tile";
import { PlanningTile } from "./tiles/planning-tile";
import { TrackingTile } from "./tiles/tracking-tile";

/**
 * Six-module bento grid.
 *   Row 1 (8/4):  Performance | Planning
 *   Row 2 (4/4/4): Tracking | Goals | Currency
 *   Row 3 (12):    Assistant
 *
 * Each tile owns a real animation or chart. No icon-only feature cards.
 */
export function BentoGrid() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative mx-auto max-w-[var(--container-default)] px-6 py-32 md:px-10 md:py-40"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT_DEFAULT}
        variants={fadeUp}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="eyebrow">{bentoCopy.eyebrow}</p>
        <h2
          id="features-heading"
          className="font-display-h2 mt-4 text-balance text-[var(--text-primary)]"
          style={{ fontSize: "clamp(32px, 3.5vw, 56px)", lineHeight: 1.1 }}
        >
          {bentoCopy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
          {bentoCopy.subtitle}
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12">
        {/* Row 1 */}
        <PerformanceTile className="md:col-span-12 lg:col-span-8" />
        <PlanningTile className="md:col-span-12 lg:col-span-4" />
        {/* Row 2 */}
        <TrackingTile className="md:col-span-12 lg:col-span-4" />
        <GoalsTile className="md:col-span-12 lg:col-span-4" />
        <CurrencyTile className="md:col-span-12 lg:col-span-4" />
        {/* Row 3 */}
        <AssistantTile className="md:col-span-12" />
      </div>
    </section>
  );
}

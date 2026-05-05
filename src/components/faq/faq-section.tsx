"use client";

import { faqCopy } from "@/content/copy";
import { VIEWPORT_DEFAULT, fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";
import { FaqItem } from "./faq-item";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative mx-auto max-w-[var(--container-default)] px-6 py-32 md:px-10 md:py-40"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_DEFAULT}
          variants={fadeUp}
          className="lg:col-span-4"
        >
          <p className="eyebrow">{faqCopy.eyebrow}</p>
          <h2
            id="faq-heading"
            className="font-display-h2 mt-4 text-balance text-[var(--text-primary)]"
            style={{ fontSize: "clamp(32px, 3.5vw, 56px)", lineHeight: 1.1 }}
          >
            {faqCopy.title}
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-[var(--text-muted)]">
            {faqCopy.intro}
          </p>
        </motion.div>

        <div className="lg:col-span-8">
          {faqCopy.items.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

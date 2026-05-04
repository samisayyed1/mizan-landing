"use client";

import type { FaqItem as FaqItemType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  item: FaqItemType;
};

export function FaqItem({ item }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border-subtle)] last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className="font-serif text-lg font-light tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--gold-cream)] md:text-xl">
          {item.q}
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-default)] text-[var(--gold-primary)] transition-colors group-hover:border-[var(--gold-primary)]"
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-8 pr-12 text-base leading-relaxed text-[var(--text-secondary)]">
              {item.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

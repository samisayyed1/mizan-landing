"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BentoTile } from "../bento-tile";

const QUESTION = "How exposed am I to tech?";
const ANSWER =
  "Tech is 38% of your equity sleeve — concentrated in AAPL (12%), NVDA (9%), MSFT (7%). Combined with your VOO holding (which is itself 28% tech), your effective tech exposure is closer to 49% of equities.";

function useTypewriter(text: string, active: boolean, speed = 18) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) {
      setOut("");
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return out;
}

export function AssistantTile({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setStage(1), 600);
    const t2 = setTimeout(() => setStage(2), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  const typedAnswer = useTypewriter(ANSWER, stage === 2, 14);

  return (
    <BentoTile
      eyebrow="06 · Portfolio Assistant"
      title="Ask in plain language. Cited to the positions."
      body="Reasoned answers, never invented. Local-model option keeps queries on-device."
      className={className}
    >
      <div ref={ref} className="space-y-3">
        {/* User bubble */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={stage >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm border border-[var(--border-default)] bg-[var(--bg-base)] px-4 py-2.5"
        >
          <p className="text-sm text-[var(--text-primary)]">{QUESTION}</p>
        </motion.div>

        {/* Mizan bubble */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-[88%] rounded-2xl rounded-tl-sm border border-[rgba(139,111,71,0.4)] bg-[var(--surface-2)] px-4 py-3"
        >
          <p className="eyebrow text-[var(--gold-primary)]">Mizan</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
            {typedAnswer}
            {typedAnswer.length < ANSWER.length ? (
              <motion.span
                aria-hidden
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                className="ml-0.5 inline-block h-4 w-[2px] -translate-y-[2px] bg-[var(--gold-primary)]"
              />
            ) : null}
          </p>
          {typedAnswer.length === ANSWER.length ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {["AAPL · 12%", "NVDA · 9%", "MSFT · 7%", "VOO · 28% tech"].map(
                (cite) => (
                  <span
                    key={cite}
                    className="rounded-full border border-[var(--border-default)] bg-[var(--bg-base)] px-2.5 py-1 font-mono-data text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]"
                  >
                    {cite}
                  </span>
                ),
              )}
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </BentoTile>
  );
}

"use client";

import { DownloadGrid } from "@/components/download/DownloadGrid";
import { MobileWaitlist } from "@/components/download/MobileWaitlist";
import { type PlatformTab, PlatformTabs } from "@/components/download/PlatformTabs";
import { SystemRequirements } from "@/components/download/SystemRequirements";
import { UnsignedNote } from "@/components/download/UnsignedNote";
import { Footer } from "@/components/footer/footer";
import { Nav } from "@/components/nav/nav";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

/**
 * /download — installer hub.
 *
 * Sections:
 *   1. Hero (eyebrow / headline / subhead). Sized to /contact, not full-screen.
 *   2. Platform tabs (Desktop default | Mobile coming-soon).
 *   3. Tab content cross-fades via AnimatePresence — Desktop = installer
 *      grid + unsigned note; Mobile = waitlist.
 *   4. System requirements accordion (full-width).
 *   5. Final small CTA — quiet text link to founder letter.
 *
 * Page is a Client Component because the tab switch + OS auto-detect
 * both need browser state. The page metadata still ships from
 * layout.tsx-level defaults; we don't define `metadata` here because
 * "use client" forbids it. Acceptable for this route — the homepage
 * already sets the title template.
 */
export default function DownloadPage() {
  const [tab, setTab] = useState<PlatformTab>("desktop");

  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[100svh] max-w-[var(--container-default)] flex-col px-6 pt-32 pb-16 md:px-10 md:pt-40">
        {/* 1. Hero */}
        <section aria-labelledby="download-heading">
          <p className="eyebrow">Download</p>
          <h1
            id="download-heading"
            className="font-display mt-6 max-w-[18ch] text-balance text-[var(--text-primary)]"
            style={{
              fontSize: "clamp(40px, 5.5vw, 88px)",
              lineHeight: 1.08,
              fontVariationSettings: "'opsz' 96, 'wght' 400, 'SOFT' 30, 'WONK' 0",
            }}
          >
            Install Mizan
            <br />
            on your <span className="italic text-[var(--gold-cream)]">machine.</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-[17px] leading-relaxed text-[var(--text-muted)]">
            A private portfolio terminal. Free to download.
            <br />
            Subscribe to Mizan Connect for live broker sync.
          </p>
        </section>

        {/* 2. Platform tabs */}
        <div className="mt-14">
          <PlatformTabs value={tab} onChange={setTab} />
        </div>

        {/* 3. Tab content (cross-fade) */}
        <div className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            {tab === "desktop" ? (
              <motion.div
                key="desktop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <DownloadGrid />
                <UnsignedNote />
              </motion.div>
            ) : (
              <motion.div
                key="mobile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="py-12"
              >
                <MobileWaitlist />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. System requirements (full-width accordion) */}
        <SystemRequirements />

        {/* 5. Final small CTA */}
        <section className="mt-24 mb-8 flex flex-col items-center text-center">
          <p className="eyebrow">Already downloaded?</p>
          <h2
            className="font-display mt-4 max-w-[480px] text-balance text-[var(--text-primary)]"
            style={{
              fontSize: 32,
              lineHeight: 1.16,
              fontVariationSettings: "'opsz' 32, 'wght' 500, 'SOFT' 30, 'WONK' 0",
            }}
          >
            Open Mizan and connect your first broker.
          </h2>
          <Link
            href="/#founder"
            className="mt-6 inline-flex items-center gap-1 text-sm tracking-tight text-[var(--gold-cream)] transition-colors duration-150 hover:text-[var(--gold-primary)]"
          >
            Read the founder letter →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

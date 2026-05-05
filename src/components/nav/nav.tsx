"use client";

import { brand } from "@/content/copy";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#features", label: "Product" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#security", label: "Security" },
  { href: "/#faq", label: "FAQ" },
];

/**
 * Sticky nav. Transparent over hero; transitions to glass after 80px scroll
 * (backdrop-blur capped at 12px per the motion contract).
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const blurOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled ? "border-b border-[var(--border-subtle)]" : "",
      )}
    >
      <motion.div
        aria-hidden
        style={{ opacity: blurOpacity }}
        className="absolute inset-0 -z-10 bg-[rgba(10,11,16,0.72)] backdrop-blur-[12px]"
      />
      <div className="mx-auto flex h-16 max-w-[var(--container-default)] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          aria-label={`${brand.name} home`}
          className="group inline-flex items-center gap-2.5"
        >
          <span
            aria-hidden
            className="font-display text-[20px] leading-none text-[var(--gold-cream)] transition-colors duration-150 group-hover:text-[var(--gold-primary)]"
            style={{
              fontVariationSettings: "'opsz' 144, 'wght' 500, 'SOFT' 30, 'WONK' 0",
            }}
          >
            M
          </span>
          <span className="font-display text-[17px] tracking-tight text-[var(--text-primary)]">
            {brand.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm tracking-tight text-[var(--text-muted)] transition-colors duration-150 hover:text-[var(--gold-cream)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/contact"
            className="rounded-md bg-[var(--gold-primary)] px-4 py-2 text-xs font-medium tracking-tight text-[var(--bg-base)] transition-colors duration-150 hover:bg-[var(--gold-cream)]"
          >
            Download
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          className="md:hidden text-[var(--text-primary)]"
        >
          <svg
            viewBox="0 0 16 16"
            width="18"
            height="18"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            aria-hidden
          >
            {open ? (
              <>
                <line x1="3" y1="3" x2="13" y2="13" />
                <line x1="3" y1="13" x2="13" y2="3" />
              </>
            ) : (
              <>
                <line x1="3" y1="5" x2="13" y2="5" />
                <line x1="3" y1="11" x2="13" y2="11" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-[var(--border-subtle)] bg-[var(--bg-base)] md:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-1 px-6 py-6">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base tracking-tight text-[var(--text-primary)] transition-colors duration-150 hover:text-[var(--gold-cream)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-4">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-md bg-[var(--gold-primary)] px-5 py-3 text-sm font-medium text-[var(--bg-base)]"
                >
                  Download Mizan
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </motion.header>
  );
}

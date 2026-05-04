"use client";

import { brand } from "@/content/copy";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#product", label: "Product" },
  { href: "#connect", label: "Connect" },
  { href: "#privacy", label: "Privacy" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-[var(--border-subtle)] bg-[var(--bg-base)]/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <motion.div
        aria-hidden
        style={{ opacity }}
        className="absolute inset-0 -z-10 bg-[var(--bg-base)]/40"
      />
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[var(--text-primary)] transition-colors hover:text-[var(--gold-primary)]"
          aria-label={`${brand.name} home`}
        >
          <span className="font-mono text-xl font-bold tracking-tight">M</span>
          <span className="font-serif text-lg tracking-tight">{brand.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm tracking-tight text-[var(--text-secondary)] transition-colors hover:text-[var(--gold-primary)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={brand.desktopRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--text-secondary)] transition-colors hover:text-[var(--gold-primary)]"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={brand.releasesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-[var(--gold-primary)] px-4 py-2 text-xs font-medium tracking-tight text-[var(--bg-base)] transition-colors hover:bg-[var(--gold-cream)]"
          >
            Download
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          className="md:hidden text-[var(--text-primary)]"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-[var(--border-subtle)] bg-[var(--bg-base)] md:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-2 px-6 py-6">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-base tracking-tight text-[var(--text-primary)] transition-colors hover:text-[var(--gold-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-4">
                <a
                  href={brand.releasesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-md bg-[var(--gold-primary)] px-5 py-2.5 text-sm font-medium text-[var(--bg-base)]"
                >
                  Download Mizan
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </motion.header>
  );
}

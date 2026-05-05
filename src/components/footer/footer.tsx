import Link from "next/link";
import { brand, footerCopy } from "@/content/copy";
import { StatusIndicator } from "./status-indicator";

/**
 * Minimal four-column footer. No repo links. No upstream attribution.
 * Every removed link from the previous design lands here as a clean slate.
 */
export function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-base)]"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-[var(--container-default)] px-6 py-20 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="font-display text-[20px] leading-none text-[var(--gold-cream)]"
              >
                M
              </span>
              <span className="font-display text-[17px] tracking-tight text-[var(--text-primary)]">
                {brand.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--text-muted)]">
              {footerCopy.tagline}
            </p>
            <div className="mt-6">
              <StatusIndicator />
            </div>
          </div>

          {footerCopy.columns.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <p className="eyebrow">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--text-muted)] transition-colors duration-150 hover:text-[var(--gold-cream)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 md:flex-row md:items-center">
          <p className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
            {footerCopy.copyright}
          </p>
          <a
            href={`mailto:${brand.contactEmail}`}
            className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)] transition-colors duration-150 hover:text-[var(--gold-cream)]"
          >
            {brand.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}

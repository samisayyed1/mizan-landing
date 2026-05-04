import { brand } from "@/content/copy";
import { Github } from "lucide-react";
import { StatusIndicator } from "./status-indicator";

const sections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Privacy", href: "#privacy" },
      { label: "Download", href: brand.releasesUrl, external: true },
      { label: "GitHub", href: brand.desktopRepoUrl, external: true },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Overview", href: "#connect" },
      { label: "Pricing", href: "#connect" },
      { label: "Waitlist", href: "#connect" },
      {
        label: "Connect repo",
        href: brand.connectRepoUrl,
        external: true,
      },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "FAQ", href: "#faq" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
      { label: "Security", href: "#privacy" },
      { label: "AGPL-3.0", href: brand.desktopRepoUrl, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative border-t border-[var(--border-subtle)] bg-[var(--bg-base)]"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-container px-6 py-20 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xl font-bold tracking-tight text-[var(--gold-primary)]">
                M
              </span>
              <span className="font-serif text-lg tracking-tight text-[var(--text-primary)]">
                {brand.name}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">
              The portfolio tracker for serious investors. Local-first. End-to-end encrypted. Open
              source.
            </p>
            <div className="mt-6">
              <StatusIndicator />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={brand.desktopRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--text-muted)] transition-colors hover:text-[var(--gold-primary)]"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title} className="md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {s.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={"external" in l && l.external ? "_blank" : undefined}
                      rel={"external" in l && l.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--gold-primary)]"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Forked from{" "}
            <a
              href="https://github.com/afadil/wealthfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--gold-primary)]"
            >
              Wealthfolio
            </a>{" "}
            · AGPL-3.0
          </p>
        </div>
      </div>
    </footer>
  );
}

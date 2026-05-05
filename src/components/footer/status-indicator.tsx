import { footerCopy } from "@/content/copy";

/** Pulsing dot — gold-cream, never green. Quiet status signal. */
export function StatusIndicator() {
  return (
    <div className="inline-flex items-center gap-2.5 font-mono-data text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
      <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--gold-cream)] opacity-50" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--gold-cream)]" />
      </span>
      {footerCopy.status}
    </div>
  );
}

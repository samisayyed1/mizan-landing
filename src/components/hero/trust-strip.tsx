import { heroCopy } from "@/content/copy";

export function TrustStrip() {
  return (
    <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--gold-deep)]">
      {heroCopy.trustStrip.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          <span aria-hidden className="block h-1 w-1 rounded-full bg-[var(--gold-primary)]" />
          {item}
          {i < heroCopy.trustStrip.length - 1 ? (
            <span aria-hidden className="text-[var(--text-muted)]">
              ·
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

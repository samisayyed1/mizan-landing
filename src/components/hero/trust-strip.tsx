const ITEMS = [
  { label: "Local-first", delayClass: "delay-8" },
  { label: "End-to-end encrypted", delayClass: "delay-9" },
  { label: "No tracking", delayClass: "delay-10" },
] as const;

/** Small trust pills below the hero CTAs. CSS-driven entrance + pulsing dots. */
export function TrustStrip() {
  return (
    <ul className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono-data text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
      {ITEMS.map((item) => (
        <li
          key={item.label}
          className={`hero-fade ${item.delayClass} inline-flex items-center gap-2`}
        >
          <span
            aria-hidden
            className="pulse-dot inline-block h-1 w-1 rounded-full bg-[var(--gold-cream)]"
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

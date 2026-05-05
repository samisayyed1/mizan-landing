/**
 * Scroll cue — small Geist Mono "scroll" label with a hand-drawn vertical
 * line that pulses downward. Bottom-center of the hero.
 */
export function ScrollCue() {
  return (
    <div
      className="hero-fade delay-13 pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      aria-hidden
    >
      <span className="font-mono-data text-[9px] uppercase tracking-[0.3em] text-[var(--text-subtle)]">
        Scroll
      </span>
      <span
        className="block h-8 w-px bg-gradient-to-b from-[var(--gold-deep)] to-transparent pulse-dot"
        style={{ transformOrigin: "top" }}
      />
    </div>
  );
}

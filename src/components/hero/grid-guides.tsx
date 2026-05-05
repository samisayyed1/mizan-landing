/**
 * Rauno-pattern CSS grid guides. Pure decorative SSR — no client JS.
 * 12-column grid at lg+, 6-column at md, hidden below.
 *
 * Uses gold-deep at 6% opacity for hairlines. Sits behind hero content
 * via z-index, aria-hidden.
 */
export function GridGuides() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:grid md:grid-cols-6 lg:grid-cols-12"
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static decorative array
          key={i}
          className={`border-l border-[rgba(139,111,71,0.06)] ${i >= 6 ? "hidden lg:block" : ""}`}
        />
      ))}
    </div>
  );
}

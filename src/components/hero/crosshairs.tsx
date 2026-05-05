/**
 * Print-style crosshair marks at notable hero coordinates (Rauno reference).
 * Pure decorative SSR.
 */
export function Crosshairs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:block"
    >
      {/* Top-left */}
      <span className="crosshair left-8 top-24" />
      {/* Top-right */}
      <span className="crosshair right-8 top-24" />
      {/* Bottom-left */}
      <span className="crosshair left-8 bottom-16" />
      {/* Bottom-right */}
      <span className="crosshair right-8 bottom-16" />
    </div>
  );
}

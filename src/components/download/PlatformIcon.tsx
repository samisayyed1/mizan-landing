import type { DownloadKey } from "@/lib/downloads";

/**
 * Platform glyphs — 1.5px stroke, currentColor, 32px square.
 * Custom SVG (no Lucide / Phosphor) per the design contract.
 *
 * Macs share one mark — silicon-vs-Intel is communicated via the
 * card label, not a glyph difference.
 */
type Props = {
  platform: DownloadKey;
  className?: string;
};

const STROKE = 1.5;

function MacGlyph(props: { className?: string }) {
  // Apple-mark inspired silhouette, simplified to two open arcs + leaf
  // so we stay clear of Apple's protected logo.
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden
    >
      <path d="M21.5 17.4c.05-3.7 3-5.4 3.1-5.5-1.7-2.5-4.3-2.8-5.2-2.9-2.2-.2-4.3 1.3-5.4 1.3-1.1 0-2.9-1.3-4.7-1.2-2.4 0-4.6 1.4-5.9 3.5-2.5 4.4-.6 10.8 1.8 14.4 1.2 1.7 2.6 3.7 4.4 3.6 1.8-.1 2.5-1.1 4.6-1.1 2.1 0 2.7 1.1 4.6 1.1 1.9 0 3.1-1.7 4.3-3.5 1.4-2 1.9-3.9 1.9-4-.1 0-3.6-1.4-3.6-5.7Z" />
      <path d="M18.5 6.4c.9-1.1 1.6-2.7 1.4-4.3-1.4.1-3.1.9-4.1 2.1-.9 1-1.7 2.6-1.5 4.2 1.6.1 3.2-.8 4.2-2Z" />
    </svg>
  );
}

function WindowsGlyph(props: { className?: string }) {
  // Four-pane window, equal gaps.
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden
    >
      <rect x="4" y="4" width="10" height="10" rx="0.5" />
      <rect x="18" y="4" width="10" height="10" rx="0.5" />
      <rect x="4" y="18" width="10" height="10" rx="0.5" />
      <rect x="18" y="18" width="10" height="10" rx="0.5" />
    </svg>
  );
}

function LinuxGlyph(props: { className?: string }) {
  // Penguin silhouette — head, body, two feet. Reads as "tux" without
  // crossing into the Tux mascot's protected likeness; we approximate
  // the iconography with stroked geometry instead.
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden
    >
      {/* Head */}
      <ellipse cx="16" cy="9" rx="4.5" ry="5" />
      {/* Eyes */}
      <circle cx="14.4" cy="8.6" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="17.6" cy="8.6" r="0.7" fill="currentColor" stroke="none" />
      {/* Body */}
      <path d="M9.5 24c0-5 2.9-9.5 6.5-9.5S22.5 19 22.5 24c0 3-1.5 4.5-3 4.5h-7c-1.5 0-3-1.5-3-4.5Z" />
      {/* Feet */}
      <path d="M11.5 28.5c-.5 1-1.8 1.2-2.6.4M20.5 28.5c.5 1 1.8 1.2 2.6.4" />
    </svg>
  );
}

export function PlatformIcon({ platform, className }: Props) {
  if (platform === "windows") return <WindowsGlyph className={className} />;
  if (platform === "linux") return <LinuxGlyph className={className} />;
  return <MacGlyph className={className} />;
}

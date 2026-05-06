import type { DownloadKey } from "./downloads";

/**
 * Best-effort, SSR-safe OS detection.
 *
 * Returns `null` (not "unknown") on the server so React Query / state
 * hooks can `=== null` to mean "not yet detected" without flickering a
 * highlight on first paint.
 *
 * Apple Silicon vs Intel:
 * Apple Silicon Macs report `MacIntel` for `navigator.platform` (Apple
 * deliberately preserved that string for x86 web compatibility), so the
 * platform string alone can't tell them apart. Modern browsers expose
 * `navigator.userAgentData.architecture` as 'arm' on Apple Silicon —
 * we use that when present. As a fallback we default macOS to
 * Apple Silicon since >80% of Macs sold since 2020 are arm64; Intel
 * users still see the right card by clicking it manually.
 */

type UADataLike = {
  architecture?: string;
  getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>;
};

declare global {
  interface Navigator {
    userAgentData?: UADataLike;
  }
}

export function detectOS(): DownloadKey | null {
  if (typeof navigator === "undefined") return null;

  const ua = navigator.userAgent ?? "";
  const platform = (navigator.platform ?? "").toString();

  if (/Mac/i.test(platform) || /Mac OS X|Macintosh/i.test(ua)) {
    const arch = navigator.userAgentData?.architecture;
    if (arch === "x86" || arch === "x86_64") return "macOS-intel";
    if (arch === "arm" || arch === "arm64" || /\barm/i.test(ua)) return "macOS-arm";
    // Default new-Mac path. See doc-comment for rationale.
    return "macOS-arm";
  }

  if (/Win/i.test(platform) || /Windows/i.test(ua)) return "windows";
  if (/Linux|X11/i.test(platform) || /Linux|X11/i.test(ua)) return "linux";

  return null;
}

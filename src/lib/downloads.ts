/**
 * Mizan desktop installer registry.
 *
 * Choice: Option A (hardcoded). The release pipeline produces filenames
 * that include the version (e.g. Mizan_3.3.0_aarch64.dmg), so updating
 * CURRENT_VERSION below on each release tag is a one-line change.
 *
 * Option B (server-side release-API discovery) was considered and skipped
 * for this chunk — the hardcoded `releases/latest/download/<file>`
 * redirect already self-resolves to whichever release is currently
 * marked "latest", so the only thing the version-bump touches is the
 * filename suffix shown in our copy.
 *
 * The single user-visible mention of the source host is rendered by
 * `<UnsignedNote />` as the "Older versions →" link (see the
 * RELEASE_BASE URL below). Don't add others without bumping the design
 * skill's ban-list exemption.
 */

/** Bump on each desktop release tag. Mirrors apps/tauri/tauri.conf.json. */
export const CURRENT_VERSION = "3.3.4";

const RELEASE_BASE = "https://github.com/samisayyed1/mizan-4/releases";

export type DownloadKey = "macOS-arm" | "macOS-intel" | "windows" | "linux";

export type Download = {
  /** Stable key — also drives auto-detect highlighting. */
  key: DownloadKey;
  /** Heading inside the InstallerCard (Fraunces). */
  label: string;
  /** Geist body line under the heading. */
  detail: string;
  /** Geist Mono. Approximate; verified per-release before tagging. */
  size: string;
  /** Resolves to the source host's `latest` redirect for the current version. */
  url: string;
  /** Architecture used by the OS detector. */
  arch: "arm64" | "x64";
  /** Coarse OS family. */
  os: "darwin" | "win32" | "linux";
};

export const DOWNLOADS: ReadonlyArray<Download> = [
  {
    key: "macOS-arm",
    label: "macOS — Apple Silicon",
    detail: "M1, M2, M3, M4 — macOS 11.0 (Big Sur) or later",
    size: "~120 MB",
    url: `${RELEASE_BASE}/latest/download/Mizan_${CURRENT_VERSION}_aarch64.dmg`,
    arch: "arm64",
    os: "darwin",
  },
  {
    key: "macOS-intel",
    label: "macOS — Intel",
    detail: "macOS 11.0 (Big Sur) or later",
    size: "~120 MB",
    url: `${RELEASE_BASE}/latest/download/Mizan_${CURRENT_VERSION}_x64.dmg`,
    arch: "x64",
    os: "darwin",
  },
  {
    key: "windows",
    label: "Windows",
    detail: "Windows 10 (1809) or later — 64-bit",
    size: "~115 MB",
    url: `${RELEASE_BASE}/latest/download/Mizan_${CURRENT_VERSION}_x64_en-US.msi`,
    arch: "x64",
    os: "win32",
  },
  {
    key: "linux",
    label: "Linux",
    detail: "Most modern distros — AppImage requires libfuse2",
    size: "~196 MB",
    url: `${RELEASE_BASE}/latest/download/mizan_${CURRENT_VERSION}_amd64.AppImage`,
    arch: "x64",
    os: "linux",
  },
] as const;

/** All-releases page (older versions, sole sanctioned link to the source host). */
export const RELEASES_INDEX_URL = RELEASE_BASE;

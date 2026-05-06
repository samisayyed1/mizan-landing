"use client";

import { InstallerCard } from "@/components/download/InstallerCard";
import { detectOS } from "@/lib/detect-os";
import { DOWNLOADS, type DownloadKey } from "@/lib/downloads";
import { useEffect, useState } from "react";

/**
 * The 2x2 installer grid. Auto-detects OS client-side post-hydration so
 * SSR markup is identical for every visitor (no flicker, no mismatch).
 */
export function DownloadGrid() {
  const [detected, setDetected] = useState<DownloadKey | null>(null);

  useEffect(() => {
    setDetected(detectOS());
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {DOWNLOADS.map((d) => (
        <InstallerCard
          key={d.key}
          download={d}
          recommended={detected === d.key}
        />
      ))}
    </div>
  );
}

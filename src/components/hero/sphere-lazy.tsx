"use client";

import dynamic from "next/dynamic";
import { SphereFallback } from "./sphere-fallback";

const PortfolioSphere = dynamic(() => import("./portfolio-sphere"), {
  ssr: false,
  loading: () => <SphereFallback />,
});

export function SphereLazy() {
  return <PortfolioSphere />;
}

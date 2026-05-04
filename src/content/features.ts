import {
  IconAi,
  IconConnect,
  IconCurrency,
  IconGoals,
  IconPerformance,
  IconPortfolio,
} from "@/components/features/feature-icons";
import type { Feature } from "@/types";

export const features: Feature[] = [
  {
    id: "portfolio",
    title: "Universal portfolio",
    body: "Equities, crypto, real estate, private equity, alternatives. One unified view across every account you own.",
    icon: IconPortfolio,
  },
  {
    id: "performance",
    title: "Performance intelligence",
    body: "Time-weighted returns, money-weighted returns, drawdowns, allocation drift. The numbers institutions actually use.",
    icon: IconPerformance,
  },
  {
    id: "ai",
    title: "Resident analyst",
    body: "Ask your portfolio questions in plain language. Local model option keeps queries on-device.",
    icon: IconAi,
  },
  {
    id: "connect",
    title: "Mizan Connect",
    body: "Optional encrypted bridge to 30+ brokers via SnapTrade. Read-only, end-to-end encrypted, opt-in only.",
    icon: IconConnect,
  },
  {
    id: "goals",
    title: "Goals & retirement",
    body: "Withdrawal modeling, FIRE projections, scenario testing. Map a trajectory and measure against it.",
    icon: IconGoals,
  },
  {
    id: "currency",
    title: "Multi-currency",
    body: "Native support for global portfolios. Real-time FX, historical conversion, cost basis preserved.",
    icon: IconCurrency,
  },
];

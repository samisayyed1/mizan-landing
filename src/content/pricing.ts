import type { PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    id: "basic",
    name: "Basic",
    monthly: 3.99,
    yearly: 39,
    highlighted: false,
    blurb: "One brokerage. Daily refresh. For investors with a single account.",
    features: ["1 broker connection", "Daily position sync", "Email support", "Cancel any time"],
  },
  {
    id: "essentials",
    name: "Essentials",
    monthly: 7.99,
    yearly: 79,
    highlighted: true,
    blurb: "Up to five brokerages. Hourly refresh. The default for serious portfolios.",
    features: [
      "5 broker connections",
      "Hourly position sync",
      "Crypto exchange support",
      "Priority support",
      "Founding-member pricing locked",
    ],
  },
  {
    id: "duo",
    name: "Duo",
    monthly: 12.99,
    yearly: 129,
    highlighted: false,
    blurb: "Two members. Ten brokerages. For couples managing wealth together.",
    features: [
      "10 broker connections",
      "2 device licences",
      "Hourly position sync",
      "Shared household reporting",
      "Priority support",
    ],
  },
];

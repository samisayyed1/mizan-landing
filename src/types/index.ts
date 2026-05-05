export type FaqItem = {
  q: string;
  a: string;
};

export type StatMetric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  format: "money" | "int";
};

export type PricingTierId = "founder" | "private" | "family-office";

export type PricingTier = {
  id: PricingTierId;
  name: string;
  blurb: string;
  priceAnnual: string | null;
  priceMonthly: string | null;
  cta: string;
  highlighted: boolean;
  features: readonly string[];
};

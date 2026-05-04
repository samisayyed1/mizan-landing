import type { LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export type IconComponent = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

export type Feature = {
  id: string;
  title: string;
  body: string;
  icon: IconComponent;
};

export type PricingTier = {
  id: "basic" | "essentials" | "duo" | "plus";
  name: string;
  monthly: number;
  yearly: number;
  highlighted: boolean;
  blurb: string;
  features: string[];
};

export type FaqItem = {
  q: string;
  a: string;
};

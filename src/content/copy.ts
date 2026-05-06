/**
 * Mizan copy — single source of truth. Never inline strings in components.
 * Words on the ban list never appear here.
 */

export const brand = {
  name: "Mizan",
  tagline: "Wealth, in balance.",
  domain: "mizan.app",
  contactEmail: "hello@mizan.app",
} as const;

export const heroCopy = {
  eyebrow: "A private portfolio terminal",
  /** Three lines. Middle line italic, gold-cream. */
  headline: ["Wealth,", "in", "balance."] as const,
  subhead:
    "A private portfolio terminal for investors who actually own their capital. Stewardship over speculation. Restraint over noise.",
  primaryCta: "Download Mizan",
  tertiaryCta: "Read the founder letter",
} as const;

export const statsCopy = {
  /**
   * Software facts about Mizan — never user metrics, never fabricated.
   * Each value is something the product literally already does today:
   *   - 6 modules: Performance Intelligence, Portfolio Planning, Asset
   *     Tracking, Goals & Retirement, Multi-currency, Portfolio Assistant.
   *   - 25+ brokerages: SnapTrade aggregator coverage on the integrated tier.
   *   - 30 currencies: native FX support in mizan-market-data.
   *   - 10 asset classes: equities, crypto, FX, property, vehicles,
   *     collectibles, precious metals, private equity, liabilities, other.
   */
  metrics: [
    { label: "Product modules", value: 6, format: "int" as const },
    {
      label: "Brokerages connected",
      value: 25,
      suffix: "+",
      format: "int" as const,
    },
    { label: "Currencies tracked", value: 30, format: "int" as const },
    { label: "Asset classes covered", value: 10, format: "int" as const },
  ],
} as const;

export const showcaseCopy = {
  eyebrow: "The instrument",
  title: "Every position. Every currency. One unified view.",
  subtitle:
    "Mizan tracks every account you own — equities, crypto, real estate, private equity, alternatives — through a single ledger that lives on your device.",
} as const;

export const bentoCopy = {
  eyebrow: "What's inside",
  title: "Precision instruments for serious capital.",
  subtitle:
    "Six modules. One ledger. Every decision routed through the analytics that institutions use, refined for individuals who do their own work.",
  modules: {
    performance: {
      title: "Performance Intelligence",
      body: "Time-weighted returns, money-weighted returns, drawdowns, and allocation drift. The numbers institutions actually use, on a portfolio you actually own.",
    },
    planning: {
      title: "Portfolio Planning",
      body: "Rebalancing scenarios. Target allocation modeling. Drift alerts before they become drift problems.",
    },
    tracking: {
      title: "Asset Tracking",
      body: "Equities, crypto, real estate, private equity, pre-IPO. One ledger across every custodian.",
    },
    goals: {
      title: "Goals & Retirement",
      body: "Withdrawal modeling. FIRE projections. Scenario testing against the only benchmark that matters: yours.",
    },
    currency: {
      title: "Multi-currency",
      body: "Native global support. Real-time FX. Cost basis preserved across conversions.",
    },
    assistant: {
      title: "Portfolio Assistant",
      body: "Ask in plain language. Reasoned answers, cited to the positions and ratios that drive them. Local model option keeps everything on-device.",
    },
  },
} as const;

export const founderCopy = {
  eyebrow: "A letter from the founder",
  /** ~280 words. Patek tone. Quiet, generational, confident. */
  paragraphs: [
    "Most fintech is built on the assumption you'll trade your data for the product. Mizan rejects that bargain. We believe a tool meant to help you understand your wealth should never need to look at it.",
    "I built Mizan because I needed it. Tracking nine custodians across three jurisdictions, watching positions slip out of sight in spreadsheets, paying advisors to tell me what I already knew — none of it worked. Every product I tried demanded I pour my full financial life into someone else's database. The discipline I wanted in my portfolio was undone by the carelessness of the tools.",
    "Mizan keeps every position on the device you own. Connections to brokers are read-only and end-to-end encrypted. We never see your portfolio. We literally cannot.",
    "Wealth, properly managed, is not a feature set. It is a discipline — quiet, patient, generational. Mizan is the instrument.",
  ] as const,
  signature: "— Founder",
} as const;

export const securityCopy = {
  eyebrow: "How we're built",
  title: "Discretion is the product.",
  claims: [
    {
      n: "01",
      title: "Read-only by design",
      body: "Mizan never moves money, never places trades, never alters account settings. Your broker connection is read-only. Period.",
    },
    {
      n: "02",
      title: "Encrypted everywhere",
      body: "AES-256-GCM at rest. TLS 1.3 in transit. Connection secrets are encrypted on your device with keys we don't hold.",
    },
    {
      n: "03",
      title: "SOC 2 in progress",
      body: "Type II audit underway. Auditor and scope published when complete. Trust is earned, not asserted.",
    },
  ] as const,
} as const;

export const pricingCopy = {
  eyebrow: "Pricing",
  title: "Three tiers. No surprises.",
  subtitle: "Founding-member pricing is locked for life. The desktop app stays free.",
  toggle: { annual: "Annual", monthly: "Monthly", saveLabel: "Save 20%" },
  tiers: [
    {
      id: "founder",
      name: "Founder",
      blurb: "Founding member. Locked-in pricing. First 500 only.",
      priceAnnual: "X",
      priceMonthly: "X",
      cta: "Join the waitlist",
      highlighted: false,
      features: [
        "Locked-in pricing for life",
        "Full Mizan suite",
        "Early access to new modules",
        "Direct line to the founder",
      ],
    },
    {
      id: "private",
      name: "Private",
      blurb: "Full Mizan suite for individual investors.",
      priceAnnual: "Y",
      priceMonthly: "Y",
      cta: "Join the waitlist",
      highlighted: true,
      features: [
        "Up to 5 brokerages",
        "Performance Intelligence",
        "Portfolio Planning",
        "Goals & Retirement",
        "Multi-currency",
        "Portfolio Assistant",
      ],
    },
    {
      id: "family-office",
      name: "Family Office",
      blurb: "Bespoke. For households and discretionary advisors.",
      priceAnnual: null,
      priceMonthly: null,
      cta: "Contact us",
      highlighted: false,
      features: [
        "Custom integrations",
        "Multi-member access",
        "Household-level reporting",
        "Priority support",
        "Bespoke onboarding",
      ],
    },
  ],
  footnote: "First 500 founding members. Locked-in pricing for life.",
} as const;

export const faqCopy = {
  eyebrow: "Questions",
  title: "Frequently asked.",
  intro: "Direct answers about how Mizan handles your data, your money, and your privacy.",
  items: [
    {
      q: "Where does my portfolio data live?",
      a: "On the device you own. Mizan keeps a local SQLite file under your user profile. Nothing syncs to our servers by default. If you opt in to broker connections, position data is forwarded to your device end-to-end encrypted — never stored on our infrastructure.",
    },
    {
      q: "Can Mizan move my money?",
      a: "No. Broker connections are read-only. Mizan cannot place trades, transfer funds, or alter account settings. The integration is technically incapable of write operations.",
    },
    {
      q: "How does Mizan stay in business if my data isn't the product?",
      a: "Subscriptions. The optional encrypted broker bridge is paid. The desktop app is free. The economics are honest — you pay for software, not with your data.",
    },
    {
      q: "What if Mizan shuts down tomorrow?",
      a: "Your data remains on your device. Export to CSV or JSON at any time. There is no vendor lock-in by design — the file format is documented and inspectable.",
    },
    {
      q: "Which brokers are supported?",
      a: "Fidelity, Schwab, Vanguard, Interactive Brokers, Robinhood, Coinbase, and 25+ others. The supported list grows monthly. If your broker isn't listed, the founder personally responds to requests at hello@mizan.app.",
    },
    {
      q: "Is my data encrypted?",
      a: "Yes. AES-256-GCM at rest, TLS 1.3 in transit. Connection secrets are encrypted on your device with keys we never hold — including from our own database administrators.",
    },
  ] as const,
} as const;

export const finalCtaCopy = {
  /** Last word "actually own their portfolio" italicised in gold-cream. */
  headlinePre: "For investors who",
  headlineEmphasis: "actually own their portfolio.",
  subhead: "Download free. Subscribe when you're ready.",
  primaryCta: "Download Mizan",
  tertiaryCta: "Read the founder letter",
} as const;

export const footerCopy = {
  tagline: "A private portfolio terminal.",
  status: "All systems operational",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Privacy", href: "/#security" },
        { label: "Download", href: "/download" },
        { label: "Changelog", href: "/changelog" },
      ],
    },
    {
      title: "Pricing",
      links: [
        { label: "Founder", href: "/#pricing" },
        { label: "Private", href: "/#pricing" },
        { label: "Family Office", href: "/contact" },
        { label: "Compare", href: "/#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Founder Letter", href: "/#founder" },
        { label: "Press", href: "/press" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Security", href: "/security" },
      ],
    },
  ],
  copyright: "© 2026 Mizan, Ltd. All rights reserved.",
} as const;

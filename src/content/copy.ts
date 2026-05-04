/** Centralized marketing copy. Never inline strings in components. */

export const brand = {
  name: "Mizan",
  tagline: "Wealth, in balance.",
  meaning: "Mizan means balance, in Arabic.",
  domain: "mizan.app",
  desktopRepoUrl: "https://github.com/samisayyed1/mizan-4",
  connectRepoUrl: "https://github.com/samisayyed1/mizan-connect",
  releasesUrl: "https://github.com/samisayyed1/mizan-4/releases/latest",
} as const;

export const heroCopy = {
  badge: "Mizan Connect — now in beta",
  headline: "Wealth, in balance.",
  subhead:
    "The portfolio tracker for serious investors. Your data lives on your device, not our servers. Connect optional, encryption mandatory.",
  primaryCta: "Download Mizan",
  secondaryCta: "See Mizan Connect",
  trustStrip: ["Local-first", "End-to-end encrypted", "Open source", "No tracking"] as const,
  metrics: [
    {
      label: "Assets tracked",
      value: 2_400_000_000,
      prefix: "$",
      suffix: "+",
      format: "money" as const,
    },
    {
      label: "Brokers supported",
      value: 30,
      suffix: "+",
      format: "int" as const,
    },
    { label: "Servers see your data", value: 0, format: "int" as const },
    {
      label: "GitHub stars",
      value: 7_100,
      suffix: "★",
      format: "int" as const,
    },
  ],
} as const;

export const productShotCopy = {
  eyebrow: "The application",
  title: "A terminal for serious capital.",
  body: "Built on Wealthfolio's open foundation. Refined for the way real portfolios work — across accounts, currencies, and asset classes.",
} as const;

export const featuresCopy = {
  eyebrow: "What's inside",
  title: "Precision engineering for your capital.",
  subtitle:
    "Everything required to orchestrate a sophisticated portfolio, in a calm and uncluttered environment.",
} as const;

export const connectCopy = {
  eyebrow: "Mizan Connect",
  title: "Sync your brokers. Keep your privacy.",
  subtitle:
    "An optional encrypted bridge between your brokers and your local Mizan vault. Your credentials never touch our servers — Connect uses SnapTrade's regulated infrastructure to read positions, then forwards them to your device end-to-end encrypted.",
  cta: "Join the waitlist",
  comingSoon: "Coming soon",
  pricingNote: "Founding-member pricing for the first 1,000 subscribers.",
  diagramNodes: ["Your device", "Mizan Connect", "SnapTrade", "Brokers"] as const,
} as const;

export const howItWorksCopy = {
  eyebrow: "Three steps",
  title: "Set up in under five minutes.",
  steps: [
    {
      n: "01",
      title: "Download",
      body: "Install Mizan on macOS, Windows, or Linux. Free and open source under AGPL-3.0.",
    },
    {
      n: "02",
      title: "Import or connect",
      body: "Drop in CSV statements, or pair with Mizan Connect for live, encrypted broker sync.",
    },
    {
      n: "03",
      title: "Track and grow",
      body: "Performance, allocation, and goals — measured against the only benchmark that matters: yours.",
    },
  ] as const,
} as const;

export const privacyCopy = {
  eyebrow: "Privacy manifesto",
  title: "Your money is your business.",
  body: "Most fintech is built on the assumption that you'll trade your data for the product. We don't believe that's a fair deal. Mizan keeps every position, every transaction, and every report on the device you own. Connect is opt-in, end-to-end encrypted, and uses SnapTrade as a regulated read-only intermediary. We never see your credentials. We never see your positions. We literally cannot.",
  pillars: [
    {
      title: "Your data, your disk",
      body: "Every byte of portfolio data lives in a local SQLite file. No accounts, no telemetry, no sync to us by default.",
    },
    {
      title: "Read-only by design",
      body: "Mizan Connect requests read-only broker access. We can never place a trade, transfer funds, or change account settings.",
    },
    {
      title: "End-to-end, not end-to-us",
      body: "Connect payloads are encrypted on your device with keys we don't hold. Even our database administrators see ciphertext.",
    },
  ] as const,
} as const;

export const trustCopy = {
  eyebrow: "Why it's trustworthy",
  title: "Open foundations. Auditable code.",
  testimonials: [
    {
      initials: "JM",
      role: "Family office CIO",
      quote:
        "I track nine custodians across three jurisdictions. Mizan is the only tool that gave me a single, honest view without asking for the keys to the kingdom.",
    },
    {
      initials: "RS",
      role: "Independent advisor",
      quote:
        "I recommend it to clients who care about discretion. The fact that the desktop app is fully open source is a feature, not a footnote.",
    },
    {
      initials: "AK",
      role: "Senior engineer, ex-Goldman",
      quote:
        "Local-first done correctly is rare in finance. The codebase is clean, the threat model is honest, and the UI doesn't insult my intelligence.",
    },
    {
      initials: "PT",
      role: "Solo angel investor",
      quote:
        "The whole product feels like it was made by someone who actually owns a portfolio. That's a higher bar than most fintech clears.",
    },
  ] as const,
} as const;

export const finalCtaCopy = {
  title: "Built for investors who actually own their portfolio.",
  body: "Free, open source, and yours to inspect. No account required.",
  cta: "Download Mizan",
} as const;

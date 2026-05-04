import type { FaqItem } from "@/types";

export const faqItems: FaqItem[] = [
  {
    q: "Where does my portfolio data live?",
    a: "Locally, on the device you installed Mizan on. Mizan stores everything in a SQLite database under your user profile. There is no Mizan account and no default cloud sync. If you opt in to Mizan Connect, position data is fetched via SnapTrade and forwarded to your device end-to-end encrypted — we never see your credentials or your positions.",
  },
  {
    q: "Is the desktop app actually open source?",
    a: "Yes. The desktop application is licensed under AGPL-3.0 and lives on GitHub at github.com/samisayyed1/mizan-4. Anyone can read it, audit it, fork it, or build it from source. The Mizan Connect backend (the optional broker-sync service) is a separate proprietary project — its client code that runs on your device remains auditable.",
  },
  {
    q: "Why is Mizan Connect a paid product if the app is free?",
    a: "Maintaining a regulated SnapTrade integration, paying per-connection fees, hosting infrastructure with no telemetry, and supporting users costs real money. Charging a fair monthly fee for the optional sync service is what lets the desktop app stay free and ad-free forever. If you don't need broker sync, you don't pay.",
  },
  {
    q: "Can Mizan Connect place trades or move my money?",
    a: "No. Connect requests read-only broker access. The SnapTrade integration is technically incapable of placing trades, transferring funds, or modifying account settings. The threat surface is read-positions-only.",
  },
  {
    q: "What happens to my data if Mizan shuts down tomorrow?",
    a: "Nothing. The desktop app keeps working. Your SQLite database remains on your device. The codebase remains on GitHub under AGPL — anyone can fork it and continue development. Connect is the only piece that depends on our infrastructure, and we publish a documented data-export path so you can leave with your full history.",
  },
  {
    q: "Why is the app inspired by Wealthfolio?",
    a: "Mizan is a fork of Wealthfolio, a well-engineered open source portfolio tracker. We respect their work, contribute upstream where it makes sense, and credit them prominently. The two projects diverge on product direction — Mizan focuses on a more opinionated experience for serious investors and adds Mizan Connect as the missing broker-sync piece.",
  },
];

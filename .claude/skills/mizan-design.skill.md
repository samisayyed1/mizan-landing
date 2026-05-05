---
name: mizan-design
description: Mizan brand contract, ban list, motion rules, and reference set. Auto-loaded for every landing-page edit.
tone: luxury, editorial, quiet wealth — Patek Philippe meets Linear meets Bloomberg Terminal
when_to_use: Any change to apps/landing src/app, src/components, src/content, public/, .claude/, or anything that ships to mizan.app
---

# Mizan Design Skill

Anthropic's `frontend-design` skill is your foundation. This file overrides
its defaults with locked Mizan tokens. When the two conflict, this file wins.

## Brand contract — locked tokens (CSS variables, no overrides)

```
--bg            #0A0B10
--surface       #14161E
--surface-2     rgba(245, 230, 200, 0.04)   /* elevated cards */
--gold-cream    #F5E6C8
--gold-primary  #D4A574
--gold-deep     #8B6F47
--text-primary  #F4F2EC
--text-muted    #9B9892
--text-subtle   #5C5A56
--border        rgba(245, 230, 200, 0.08)
```

## Typography

- **Display headlines only**: Fraunces. Axes used: opsz, SOFT, WONK.
  - H1: `font-variation-settings: 'opsz' 144, 'wght' 400, 'SOFT' 30, 'WONK' 0`
  - H2: `font-variation-settings: 'opsz' 72, 'wght' 500, 'SOFT' 50, 'WONK' 0`
  - Editorial body (founder letter, drop-cap quotes): opsz 9, wght 400
- **Body and UI labels**: Geist (sans).
- **Every number on the page**: Geist Mono with `font-variant-numeric: tabular-nums`.
- Type scale (clamp for fluidity):
  - Hero h1: `clamp(48px, 5vw, 96px)`
  - Section h2: `clamp(32px, 3.5vw, 56px)`
  - Body: 17–18px / line-height 1.5
  - Display line-height: 1.08–1.16
  - Eyebrow: 12px / weight 600 / letter-spacing 0.2em / uppercase / muted

## Accent rule (apply ruthlessly)

`gold-primary` (#D4A574) appears on **exactly one element per viewport** —
the primary CTA for that section. `gold-cream` (#F5E6C8) is for headline
emphasis and number highlights only. `gold-deep` (#8B6F47) is for line-art
and 1px dividers. **Never gradient between two non-adjacent palette colors.**

## Motion rules (Rauno-derived, applied globally)

- Interactions ≤ 200ms.
- Scale animations: 0.92 → 1, never 0 → 1.
- Font weight NEVER changes on hover (causes layout shift).
- Font weights below 400 prohibited.
- `tabular-nums` on every number.
- All animations gated by `useReducedMotion()`.
- Looping animations pause when off-screen via Intersection Observer.
- `backdrop-filter: blur` ≤ 12px.
- `-webkit-font-smoothing: antialiased` everywhere.

## The ban list — these never appear

### Words and phrases
- "open source", "open-source", "GitHub", "AGPL", "community", "auditable code"
- "SnapTrade" — say "your broker connects directly"
- "Wealthfolio", "forked from", any reference to upstream
- "supercharge", "unlock", "10x", "next-gen", "revolutionary", "empower",
  "AI-powered", "harness", "leverage" (as verb), "level up"
- Emoji in headlines, eyebrows, or copy
- Exclamation marks in body copy

### Visual elements
- 3D rotating sphere with lines
- Fake dashboard PNG/SVG screenshots — use real React components
- Inter, Roboto, Arial, Space Grotesk
- Purple gradient on dark background
- Lucide-default icon strokes — use Phosphor Duotone or custom 1.5px-stroke SVG
- Generic centered hero with two stacked CTAs and "no credit card" microcopy
- Stock photography from Unsplash
- Glass-morphism on large surfaces (navbar after scroll only, blur ≤ 12px)
- Gradient text on body copy (one gradient phrase per page maximum)
- Footer links to repo, status badges referencing a public repo
- GitHub icon in nav, header, footer, or final CTA

## The six product modules

Mizan is a private investment portfolio terminal. The page communicates
SIX modules — never positions itself as a "broker tracker":

1. **Performance Intelligence** — TWRR, MWRR, drawdowns, allocation drift.
2. **Portfolio Planning** — Rebalancing scenarios, target allocation, drift alerts.
3. **Asset Tracking** — Equities, crypto, real estate, private equity, alternatives.
4. **Goals & Retirement** — Withdrawal modeling, FIRE projections, scenarios.
5. **Multi-currency** — Native global, real-time FX, historical conversion.
6. **AI Portfolio Assistant** — Natural-language queries, local-model option.

Broker connection ("Connect your broker directly. Read-only.") is mentioned
once, briefly, as supporting infrastructure. Never the headline feature.

## Numbers and claims discipline

- **Never fabricate numbers.** No "$2.4B tracked", no "300K users". If a real
  number isn't available, use `1` placeholder for portfolios and brokers,
  `$X` / `$Y` placeholders for prices. Sami fills in real numbers.
- "First 500 founding members" only ships if the cap will be honored.
- "SOC 2 in progress" only ships if an auditor is engaged with defined scope.
- Replace upstream attribution with `© 2026 Mizan, Ltd. All rights reserved.`

## Quiet luxury copy patterns

- "Stewardship of capital across decades" not "track your portfolio".
- "An assistant that understands your portfolio's structure" not "AI-powered".
- "Always current. Never noisy." not "real-time sync".
- Concrete nouns over abstractions: "Treasury bills, private equity, pre-IPO
  shares" beats "assets".

## Reference set

| Reference | Studied for |
|---|---|
| linear.app | Display/body type split, agent-typing live demos |
| mercury.com | Section sequence, alternating product modules, restraint |
| stripe.com/connect | CSS-rendered devices, WebGL gradient with reduced-motion fallback |
| rauno.me/craft/vercel | Layered hero, grid-as-content-guide, accent discipline |
| interfaces.rauno.me | Codified rules: ≤200ms, scale 0.92→1, weight ≥400, tabular-nums |
| patek.com | Heirloom narrative ("look after for the next generation") |
| lombardodier.com | Independence positioning, single-column long-form |

## Quality gates

- Lighthouse ≥95 perf, 100 a11y, ≥95 best practices, ≥95 SEO
- LCP < 2.0s on mobile 4G
- CLS < 0.05
- INP < 200ms
- Total JS first paint < 130KB gzipped
- All routes pass `next build` with zero warnings
- Final ban-list grep returns zero results in `app/`, `components/`, `lib/`, `public/`

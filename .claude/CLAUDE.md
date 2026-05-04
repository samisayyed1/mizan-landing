# Mizan Landing Page

Operating manual for Claude Code. Auto-loaded every session.

## What this is
The marketing site for Mizan, a private investment portfolio tracker.
Lives at mizan.app. Hosts on Vercel. Drives downloads of the desktop app
(public AGPL repo) and waitlist signups for Mizan Connect (the paid backend).

## Brand pillars (NEVER violate)
1. Quiet luxury, not loud SaaS. Patek Philippe energy, not Hubspot.
2. No emojis anywhere on the site.
3. No hype words: "revolutionize", "game-changing", "unleash", "supercharge".
4. No exclamation marks in marketing copy.
5. Single accent color: Mizan gold #D4A574. No other accent colors compete.
6. Never pure black or pure white.
7. Mizan = "balance/scale" in Arabic. Lean into the meaning subtly, never force it.

## Design tokens (use Tailwind utilities, not hex)
- Backgrounds: `bg-base`, `bg-surface`, `bg-elevated`, `bg-overlay`
- Gold: `gold-cream`, `gold-primary`, `gold-deep`
- Text: `ink-primary`, `ink-secondary`, `ink-muted`
- Or via CSS vars: `var(--bg-base)`, `var(--gold-primary)`, etc.

## Typography rules
- Headlines: `font-serif` (Fraunces, light weight 300, optical sizing)
- Body: `font-sans` (Geist)
- Numbers/data/code: `font-mono` (Geist Mono)
- Never mix more than 2 weights per element

## Motion principles
- Scroll reveals: 16px translate + opacity, 600ms, ease-out cubic [0.33,1,0.68,1]
- Magnetic buttons: 0.4 strength, ~220 stiffness / 18 damping
- Hover states: 200ms ease-out
- 3D sphere: 0.05 rad/s rotation, 4s breathing pulse
- Reduced motion: respected via globals.css media query and Framer Motion defaults

## Performance targets
- LCP < 2.0s on 4G
- CLS < 0.05
- TBT < 200ms
- Lighthouse mobile: 95+ across the board
- 3D sphere lazy-loaded with `next/dynamic` + Suspense fallback

## Architecture invariants
- Server Components by default; "use client" only for: motion, R3F, forms,
  state, hover effects.
- All marketing copy in `src/content/*.ts` — never inline strings in components.
- All external links: `rel="noopener noreferrer" target="_blank"`.
- All interactive elements keyboard accessible. Tab order matches visual order.
- All sections have `id={kebab-case}` for anchor linking.

## Common commands
```bash
pnpm dev              # localhost:3000
pnpm build            # production build
pnpm lint             # biome check
pnpm typecheck        # tsc --noEmit
pnpm preview          # build + start
```

## When in doubt, ASK
- Adding new dependencies
- Changing brand tokens
- Adding new pages (this is single-page for v1)
- Changing copy in `src/content/*`

## Off-limits without approval
- Changing the gold color
- Adding any other accent color
- Adding emojis
- Adding stock photography
- Adding live chat / Intercom / Drift / cookie banners
- Adding marketing analytics beyond Vercel Analytics

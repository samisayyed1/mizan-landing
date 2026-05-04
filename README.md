# Mizan Landing Page

Marketing site for [Mizan](https://github.com/samisayyed1/mizan-4) — the private, local-first portfolio tracker for serious investors.

> Wealth, in balance.

## Stack

- **Framework**: Next.js 15 (App Router, RSC by default)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 + custom design tokens
- **Animation**: Framer Motion v11
- **3D**: React Three Fiber + drei + three.js
- **Forms**: react-hook-form + zod
- **Icons**: Lucide React (thin stroke) + custom SVG
- **Fonts**: Fraunces (serif), Geist (sans), Geist Mono (numeric)
- **Storage**: Vercel KV (waitlist) — gracefully no-ops in dev
- **Linting**: Biome
- **Deploy**: Vercel

## Local development

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local` and fill in if you need real KV storage:

```env
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
NEXT_PUBLIC_SITE_URL=https://mizan.app
```

If KV vars are unset, the waitlist API gracefully no-ops and returns `{ ok: true }` so dev still works without setup.

## Quality gates

```bash
pnpm typecheck   # tsc --noEmit
pnpm lint        # biome check
pnpm build       # production build
```

All three must pass before merging.

## Deploy to Vercel

One-time setup:

```bash
pnpm dlx vercel link
pnpm dlx vercel env add KV_REST_API_URL production
pnpm dlx vercel env add KV_REST_API_TOKEN production
pnpm dlx vercel env add NEXT_PUBLIC_SITE_URL production
```

Subsequent deploys (auto on push to `main`):

```bash
git push origin main
```

Or manually:

```bash
pnpm dlx vercel --prod
```

## Custom domain (mizan.app)

1. In the Vercel project settings → **Domains**, add `mizan.app` and `www.mizan.app`.
2. At your registrar, point DNS:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
3. Vercel auto-provisions a Let's Encrypt cert (~1 minute).
4. Set `NEXT_PUBLIC_SITE_URL=https://mizan.app` in the Vercel project env.

## Updating content

All marketing copy lives in `src/content/`:

- `copy.ts` — brand strings, hero, sections, footer
- `features.ts` — six feature cards
- `pricing.ts` — three Connect pricing tiers
- `faq.ts` — six FAQ items

Never inline strings in components.

## Project structure

```
src/
├── app/                # Next.js App Router (layout, page, api, og, etc.)
├── components/
│   ├── nav/            # Sticky nav + mobile menu
│   ├── hero/           # Hero, sphere (R3F), ticker, trust strip
│   ├── product-shot/   # 3D-tilted dashboard mock
│   ├── features/       # Feature grid + cards + custom icons
│   ├── connect/        # Mizan Connect: data flow, pricing, waitlist
│   ├── how-it-works/   # 3-step flow
│   ├── privacy/        # Privacy manifesto
│   ├── trust/          # Testimonials
│   ├── faq/            # Accordion
│   ├── footer/         # Footer + status indicator
│   ├── ui/             # Primitives: button, magnetic, reveal, count-up, spotlight
│   └── seo/            # JSON-LD
├── content/            # All marketing copy
├── lib/                # fonts, utils, motion, kv
└── types/              # Shared TS types
```

## Performance budget

- JS bundle (first load, excluding R3F): < 200 KB
- LCP: < 2.0s on 4G
- CLS: < 0.05
- Lighthouse mobile: 95+ across all categories

R3F is dynamically imported and lazy-loaded with a static SVG fallback.

## License

Marketing site: proprietary.
The Mizan desktop app it links to is AGPL-3.0 — see [github.com/samisayyed1/mizan-4](https://github.com/samisayyed1/mizan-4).

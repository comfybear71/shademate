# CLAUDE.md — ShadeMate Project Context

> Sacred file — NEVER delete. Read this AND HANDOFF.md before starting any work.
> Safety protocol: https://github.com/comfybear71/Master/blob/master/SAFETY-RULES.md

## What this project is

Single-product e-commerce site for **ShadeMate** — a reflective, non-flammable
air conditioner cover, sold and delivered Australia wide.

- **Tagline:** "Your aircon's best mate."
- **Domain:** shademate.xyz (Vercel)
- **Company:** AIG!itch PTY LTD · ABN 44 697 140 266
- **Currency:** AUD · Single product, quantity-based checkout

## Tech stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Stripe Checkout (sessions created on the fly with `price_data` — no
  dashboard Product/Price needed)
- Stripe webhook at `/api/webhook` listening for `checkout.session.completed`
- Deployed on Vercel, auto-deploys on push

## Key files

| File | Purpose |
|------|---------|
| `src/config/site.ts` | **THE config file** — price, shipping, contact email, social links, Google review link, gallery images, reviews, FAQs. Owner edits this one file. |
| `src/app/api/checkout/route.ts` | Creates Stripe Checkout sessions (AU-only shipping, flat rate) |
| `src/app/api/webhook/route.ts` | Order confirmation webhook — plug fulfilment in here |
| `src/lib/stripe.ts` | Lazy Stripe client (builds without env keys) |
| `src/components/Logo.tsx` | Placeholder SVG logo — owner will replace |
| `public/images/` | Owner drops product photos here (`product-1.jpg`…`product-6.jpg`, `og-image.jpg`) |

## Environment variables (Vercel + .env.local)

`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
`STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_SITE_URL` — see `.env.example`.

## Rules for working on this repo (from SAFETY-RULES.md)

- **NEVER push directly to master** — every session works on a fresh
  `claude/*` branch; merge via PR only after testing the Vercel preview URL
- **NEVER delete CLAUDE.md or HANDOFF.md**
- Update HANDOFF.md at the END of every session
- Small atomic commits; no blanket reverts; no batch deletes
- Owner works web-only from iPhone/iPad — give copy-paste-ready PR
  titles/bodies, tag names (`v<major>.<minor>-YYYY-MM-DD`) and release text
- Tag a stable release weekly or after any major feature

## Copy/compliance notes

- Say the cover "helps your unit run more efficiently by reflecting heat" —
  never promise specific savings or dollar amounts
- Keep Australian Consumer Law guarantee wording on Terms and
  Shipping & Returns pages
- Aussie tone throughout (friendly, no corporate-speak)

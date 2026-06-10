# HANDOFF.md — ShadeMate Session Log & Current State

> Sacred file — NEVER delete. Update at the end of every session.

## Current state (as of 2026-06-10)

**Status:** ✅ Full site built, production build passing, pushed to
`claude/shademate-ecommerce-build-7780kf`. Not yet merged to master,
not yet deployed to Vercel.

The site is feature-complete for launch pending: Stripe keys, product
photos, and the PR merge.

## Session log

### 2026-06-10 — Initial build (branch: `claude/shademate-ecommerce-build-7780kf`)

Built the entire site from scratch:

- Home page: hero, trust banner, 6-slot gallery (styled placeholders until
  photos exist), benefits ×6 with SVG icons, 3-step how-it-works, buy box
  with quantity selector, reviews layout + Google review button slot, FAQ
  accordion (5 Q&As), contact (mailto), footer with ABN/company
- Stripe: `/api/checkout` (price from config, AU shipping addresses,
  flat-rate shipping, qty 1–10) and `/api/webhook` (signature-verified,
  handles `checkout.session.completed`, sessions tagged
  `metadata.product = "ShadeMate"`)
- Pages: `/success`, `/cancelled`, `/privacy`, `/terms`,
  `/shipping-returns`, custom 404
- SEO: full metadata + OG/Twitter cards, JSON-LD (Product, Organization,
  FAQPage), `sitemap.xml`, `robots.txt`
- Central config `src/config/site.ts` — price $49.95, shipping $9.95
- README with env vars, Stripe setup, image instructions
- Verified: `npm run build` clean (13 routes), smoke-tested all pages 200,
  checkout API validates quantity and fails gracefully without keys

**Decisions made:**
- Prices live in `src/config/site.ts` using Stripe `price_data` — no
  dashboard Product needed; edit file + redeploy to change pricing
- Recommended a SEPARATE Stripe account for ShadeMate (branding on
  checkout/receipts/card statements). Webhook secret must be new
  regardless — secrets are per-endpoint.
- Contact email placeholder: `hello@shademate.xyz` (owner to confirm)

### 2026-06-10 (later) — QVC-style promo treatment (same branch)

- New `sale` config block in `src/config/site.ts`: enabled flag, RRP
  ($69.95 → customers pay $49.95 = save $20 / 29%), badge text, banner
  text, optional `endsAt` countdown date. Includes ACCC note: the "was"
  price must be genuine (no fake two-price advertising).
- `Starburst.tsx` — classic red retail price-burst SVG badge, wiggle
  animation; on the hero CTA and the buy box
- `PromoBanner.tsx` — red/orange banner above header with SAVE chip and
  optional live countdown (set `sale.endsAt` to activate)
- BuyBox: strikethrough RRP, red sale price, savings chip, urgency line
- Flip `sale.enabled = false` to turn the whole promo off site-wide
- Verified: build clean, all promo elements render

## Next steps

1. Owner: open + merge the PR (link in session notes), then on GitHub web:
   - Add "Protect Master" ruleset (shademate is NOT yet on the Master
     repo's 8-repo protection checklist — add it there too)
   - Draft release: tag `v1.0-2026-06-10`, target master
2. Owner: create Vercel project, point shademate.xyz, add the 4 env vars
3. Owner: new Stripe account (or reuse AIG!itch account) → keys into
   Vercel → add webhook endpoint `https://shademate.xyz/api/webhook` for
   `checkout.session.completed` → put `whsec_...` into Vercel → redeploy
4. Owner: drop product photos into `public/images/`
   (`product-1.jpg`…`product-6.jpg` + `og-image.jpg` 1200×630)
5. Owner: confirm/replace contact email in `src/config/site.ts`
6. Future session: wire order-notification email into the webhook handler;
   replace placeholder reviews with real Google reviews

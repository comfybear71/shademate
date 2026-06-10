# HANDOFF.md — ShadeMate Session Log & Current State

> Sacred file — NEVER delete. Update at the end of every session.

## Current state (as of 2026-06-10)

**Status:** ✅ v1.0 merged, tagged (`v1.0-2026-06-10`), released and
deployed on Vercel with "Protect Master" ruleset active. PR #2 (promo)
merged. Branch `claude/shademate-ecommerce-build-7780kf` still carries:
real photos/videos/logo + vector logo + favicon — needs one more PR.

Launch pending: final PR merge, Stripe keys in Vercel, webhook endpoint.

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

### 2026-06-10 (evening) — Real media in (same branch)

- Owner uploaded 6 photos + 2 videos via GitHub web; renamed:
  `product-1.jpg`…`product-5.jpg` (1 = branded hero shot), `logo.jpg`,
  `video-1.mp4`, `video-2.mp4`; `og-image.jpg` = copy of product-2
- Logo.tsx now renders the real logo image (public/images/logo.jpg)
  instead of the placeholder SVG
- Gallery: 5 photo slots with real alt text + videos render below the
  photo grid in a 2-up row (`product.videos` in config)
- NOTE: PR #2 (this branch → master) now contains promo + media + logo

### 2026-06-10 (night) — Branding locked in: "ShadeMate / Your aircon's best mate."

- Owner decision: site branding wins — **ShadeMate** with tagline
  **"Your aircon's best mate."** (not the "Aussie Shade Mate / Protect
  Your Cool" wording on the Grok logo art)
- Hand-built vector logo at `public/images/logo.svg` with the chosen
  wording; header/footer now use it (swap back to `logo.jpg` in
  `src/components/Logo.tsx` if owner prefers the Grok art)
- Favicon added at `src/app/icon.svg` (sun-over-Uluru mark)
- Resolved PR merge conflict in HANDOFF.md (squash of PR #2 rewrote
  history; kept branch version)
- NOTE: the physical cover in the product photos still prints "Aussie
  Shade Mate / Protect Your Cool" — owner to decide on print artwork

### 2026-06-10 (late) — Real price set (branch: `claude/price-update-25aud`)

- v1.1 content (media, posters, vector logo) merged via PR #3 and live
- Price corrected to the real selling price: **$25** (was placeholder
  $49.95); shipping unchanged at $9.95 flat
- Sale promo DISABLED: no genuine "was" price exists yet (real price is
  $25, so "was $69.95" would be a fake discount under ACL). Re-enable in
  the `sale` block with a genuine prior price later.
- Owner notes (discussion only, no code yet):
  - Wants a multi-buy deal — roughly "3 for $60" — exact tiers TBD
  - Landed cost ~US$3–5/unit
  - Fulfilment: owner has a separate dropshipping business that can ship
    orders manually from the webhook order emails — no integration needed

## Next steps

1. Owner: merge the final media+logo PR, delete branch, tag
   `v1.1-2026-06-10` (add shademate to the Master repo's protection
   checklist if not done)
2. Owner: Stripe keys into Vercel env vars → add webhook endpoint
   `https://shademate.xyz/api/webhook` for `checkout.session.completed`
   → put `whsec_...` into Vercel → redeploy
3. Owner: confirm/replace contact email in `src/config/site.ts`
4. Owner: set a genuine RRP in the `sale` config block (ACCC) or flip
   `sale.enabled = false` until pricing history is established
5. Future session: wire order-notification email into the webhook handler;
   replace placeholder reviews with real Google reviews; decide print
   artwork branding for the physical cover

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

### 2026-06-10 (later) — Pricing tiers, Neon DB, order storage (branch: `claude/stripe-neon-orders`)

- PR #4 (price $25) confirmed merged; owner deferred tagging until next
  milestone
- New pricing system, single source of truth in `src/lib/pricing.ts`:
  - Launch special: **$15.99/unit for the first 100 orders** (counted
    from the DB), then automatically reverts to normal
  - Normal: $25 (1–2) · **3 for $60** ($20/unit) · **5 for $100 + FREE
    postage**
  - All editable in `product.bundles` / `product.launchSpecial` in config
- Neon Postgres via `@neondatabase/serverless` (`src/lib/db.ts`):
  `orders` table auto-created on first use, webhook inserts each paid
  order (idempotent on session id), `fulfilled` column ready for later
- `/api/pricing` returns live pricing; BuyBox shows launch starburst,
  deal chips, qty summary with free-postage callout
- Checkout computes authoritative price server-side; deal name shown on
  the Stripe Checkout line item; metadata carries qty/price/special
- **No DB = safe fallback to normal pricing** (intro deal never shown if
  orders can't be counted)
- Decision: NO Stripe dashboard products/coupons — everything in code

### 2026-06-10 (Stripe setup) — Shared-account guards (branch: `claude/shared-stripe-account-guards`)

- Owner is using the EXISTING shared Stripe account (also runs Togogo +
  Mathly webhooks) and connected Neon. Keys already in Vercel.
- Webhook now ignores checkout sessions without
  `metadata.product === "ShadeMate"` — prevents other shops' orders
  polluting the orders table / burning the launch-special counter
- Checkout sets `statement_descriptor_suffix: "SHADEMATE"` so card
  statements identify the purchase despite the shared account
- ⚠️ Other shops' webhooks will also receive ShadeMate events — owner to
  confirm Togogo/Mathly handlers ignore foreign sessions

### 2026-06-10 (Stripe live) — Webhook compat + order emails (branches: `claude/webhook-shipping-compat`, `claude/order-email-notifications`)

- Stripe endpoint created by owner (API 2026-05-27.dahlia, snapshot
  payload, checkout.session.completed only) — settings verified ✓
- Compat fix: new API versions moved the shipping address to
  `collected_information.shipping_details`; webhook reads new + legacy
- Order notification emails via Resend (`src/lib/notify.ts`): plain-text
  email with ship-to block ready to forward to the dropship business.
  Needs RESEND_API_KEY + ORDER_NOTIFICATIONS_EMAIL in Vercel; skips
  quietly if unset. Sends from onboarding@resend.dev until the domain is
  verified in Resend (fine — can only send to owner's own email anyway).
- Owner also advised: Stripe mobile app push notifications for instant
  sale alerts

## Next steps

1. Owner: merge `claude/stripe-neon-orders` PR after preview test
2. Owner: connect Neon to the Vercel project (Vercel → Storage → Neon)
   so DATABASE_URL is injected, update Stripe env vars to the new shop's
   keys, add webhook endpoint `https://shademate.xyz/api/webhook` for
   `checkout.session.completed`, put the new `whsec_...` in Vercel,
   redeploy
3. Test the full loop with Stripe TEST keys first: checkout → pay with
   4242 4242 4242 4242 → success page → order row appears in Neon
4. Owner: confirm/replace contact email in `src/config/site.ts`
5. Future session: order-notification email from the webhook (fulfilment
   hand-off to dropship business); simple orders dashboard; real Google
   reviews; print artwork branding decision

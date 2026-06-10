# ShadeMate 🌞

**Your aircon's best mate.** Single-product e-commerce site for the ShadeMate
reflective, non-flammable air conditioner cover — built with Next.js 14
(App Router), TypeScript, Tailwind CSS and Stripe Checkout. Deployed on Vercel
at [shademate.xyz](https://shademate.xyz).

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in your Stripe keys
npm run dev                  # http://localhost:3000
```

## Environment variables

Set these locally in `.env.local` and in **Vercel → Project → Settings →
Environment Variables**:

| Variable | Where to get it |
| --- | --- |
| `STRIPE_SECRET_KEY` | [Stripe Dashboard → Developers → API keys](https://dashboard.stripe.com/apikeys) (`sk_live_...` in production, `sk_test_...` for testing) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same page (`pk_live_...` / `pk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Created when you add the webhook endpoint (see below) |
| `DATABASE_URL` | Injected automatically by the Vercel ↔ Neon integration (Vercel → Storage → connect Neon). Stores orders and drives the launch-special counter. |
| `RESEND_API_KEY` | [resend.com](https://resend.com) → API Keys (free tier). Powers order notification emails. Optional — without it orders are still stored/visible in Stripe. |
| `ORDER_NOTIFICATIONS_EMAIL` | The email address that receives each order, formatted ready to forward to fulfilment. Must match your Resend account email until you verify a domain in Resend. |
| `NEXT_PUBLIC_SITE_URL` | `https://shademate.xyz` in production, `http://localhost:3000` locally |

## Pricing & deals — all in `src/config/site.ts`

- `product.priceAud` — normal price (currently $25)
- `product.bundles` — multi-buy deals (3 for $60 · 5 for $100 + free postage)
- `product.launchSpecial` — intro price ($15.99) that automatically ends
  after `maxOrders` (100) orders exist in the database

No Stripe dashboard products or coupons needed — the checkout API
computes the authoritative price server-side from config + order count.
Without a `DATABASE_URL` the site safely falls back to normal pricing
(the intro deal is never shown if orders can't be counted).

## Orders

Every paid order is stored in the Neon `orders` table by the webhook
(table is auto-created on first use). View them in the Neon console
(SQL: `SELECT * FROM orders ORDER BY created_at DESC`) or in the Stripe
dashboard under Payments. The same table powers the "first 100 orders"
launch-special cutoff.

## Editing prices, copy and links — one file

Everything you'll want to change regularly lives in
**`src/config/site.ts`**:

- `product.priceAud` — the product price (AUD)
- `product.shippingAud` — flat-rate shipping (AUD)
- `product.images` — the gallery image list
- `siteConfig.contactEmail`, `siteConfig.social`, `siteConfig.googleReviewLink`
- Review placeholders (`reviews`) and FAQ content (`faqs`)

Change a value, redeploy, done.

## Stripe setup

You **don't** need to create a Product or Price in the Stripe dashboard —
checkout sessions are created on the fly using `price_data`, with the price
and flat-rate shipping read from `src/config/site.ts`. To change pricing,
edit that file and redeploy.

### Webhook (order confirmations)

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
   and click **Add endpoint**.
2. Endpoint URL: `https://shademate.xyz/api/webhook`
3. Select the event **`checkout.session.completed`**.
4. Copy the signing secret (`whsec_...`) into `STRIPE_WEBHOOK_SECRET` in
   Vercel, then redeploy.

Order details are logged in the webhook handler
(`src/app/api/webhook/route.ts`) — that's the place to plug in email
notifications or fulfilment later. Tip: turn on customer receipt emails in
Stripe under **Settings → Emails**.

### Testing payments locally

```bash
stripe listen --forward-to localhost:3000/api/webhook
# use the printed whsec_... as STRIPE_WEBHOOK_SECRET in .env.local
```

Use test card `4242 4242 4242 4242`, any future expiry, any CVC.

## Adding your product images

1. Drop your photos into `public/images/` named `product-1.jpg` through
   `product-6.jpg` (or edit the list in `src/config/site.ts` to add more —
   the gallery renders whatever is listed there, up to 10 works nicely).
2. Add a social share image at `public/images/og-image.jpg`
   (1200×630px) — it's used for Open Graph / Twitter cards.
3. Any image slot without a real file renders as a styled placeholder, so
   the site looks fine while you're still taking photos.

## Deploying to Vercel

1. Push this repo to GitHub and import it in [Vercel](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected). No special build settings.
3. Add the four environment variables above for the Production environment.
4. Point the `shademate.xyz` domain at the project
   (Vercel → Project → Settings → Domains).
5. After the first deploy, set up the Stripe webhook (above) against the
   live URL.

## Project structure

```
src/
  config/site.ts        ← prices, copy, links — edit me
  lib/stripe.ts         ← Stripe client
  app/
    page.tsx            ← home page (hero, gallery, benefits, buy, FAQ…)
    layout.tsx          ← metadata, fonts, Organization JSON-LD
    api/checkout/       ← creates Stripe Checkout sessions
    api/webhook/        ← Stripe webhook (order confirmation)
    success/ cancelled/ ← post-checkout pages
    privacy/ terms/ shipping-returns/  ← legal pages
    sitemap.ts robots.ts
  components/           ← page sections (Hero, BuyBox, FAQ, …)
public/images/          ← your product photos go here
```

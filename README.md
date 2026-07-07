# ShadeMate

Your aircon's best mate — a single-product e-commerce site for the ShadeMate reflective, non-flammable air conditioner cover. Built with Next.js and Stripe Checkout, deployed at [shademate.xyz](https://shademate.xyz).

## Overview

ShadeMate is a marketing and checkout site for an Australian product that shields outdoor split-system air conditioner units from sun, dust, and debris. The site includes a product gallery, FAQs, legal pages, and a Stripe-powered purchase flow with server-side pricing, bundle deals, and a launch-special order counter backed by Neon Postgres.

**Tech stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Stripe, Neon Postgres, Resend (optional order emails), Vercel.

## Installation

### Prerequisites

- Node.js 18+
- npm
- Stripe account (test keys for local development)
- Optional: Neon database, Resend account for order notifications

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/comfybear71/shademate.git
   cd shademate
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Stripe keys at minimum. See `.env.example` for the full list of supported variables.

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Development

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start the dev server     |
| `npm run build` | Build for production   |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint              |

### Configuration

Most site content, pricing, and product details live in a single file:

```
src/config/site.ts
```

Update prices, bundles, launch specials, gallery images, FAQs, and contact details there, then redeploy. Checkout prices are computed server-side from this config — no Stripe dashboard products are required.

### Payments

- **Checkout:** `/api/checkout` creates Stripe Checkout sessions with quantity-based pricing and flat-rate shipping.
- **Webhooks:** `/api/webhook` handles `checkout.session.completed`, stores orders in Neon, and sends optional notification emails via Resend.
- **Local testing:** Use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhooks:

  ```bash
  stripe listen --forward-to localhost:3000/api/webhook
  ```

  Use test card `4242 4242 4242 4242` with any future expiry and CVC.

### Deployment

Deploy to [Vercel](https://vercel.com) by connecting this repository. Set the environment variables from `.env.example` in the Vercel project settings, connect a Neon database for order storage, and configure a Stripe webhook endpoint pointing to `/api/webhook`.

## Project structure

```
src/
  config/site.ts        Site config, pricing, and content
  lib/                  Stripe, database, and email helpers
  app/                  Pages, API routes, and metadata
  components/           UI sections (Hero, BuyBox, FAQ, etc.)
public/images/          Product photos, videos, and branding assets
```

## License

Private project. All rights reserved.

/**
 * ── ShadeMate site config ─────────────────────────────────────────────
 * Everything you'll want to tweak lives in this one file:
 * prices, contact details, links, review placeholders, gallery images.
 */

export const siteConfig = {
  name: "ShadeMate",
  tagline: "Your aircon's best mate.",
  description:
    "ShadeMate is the reflective, non-flammable air conditioner cover that shields your outdoor unit from the brutal Aussie sun, dust and bird droppings — so it runs cooler and lasts longer. Delivered Australia wide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shademate.xyz",

  company: {
    legalName: "AIG!itch PTY LTD",
    abn: "44 697 140 266",
  },

  contactEmail: "hello@shademate.xyz",

  social: {
    facebook: "", // e.g. "https://facebook.com/shademate"
    instagram: "", // e.g. "https://instagram.com/shademate"
    tiktok: "",
  },

  // Paste your Google Business "write a review" link here when you have it.
  googleReviewLink: "",
} as const;

export const product = {
  name: "ShadeMate Reflective Aircon Cover",
  shortName: "ShadeMate",
  description:
    "Reflective, non-flammable cover for split-system outdoor air conditioner units. Shields the top of your unit from sun, dust, leaves and bird droppings without blocking airflow — helping your unit run more efficiently by reflecting heat. Fits in under a minute, no tools needed.",

  /** Price in whole AUD dollars. Change it here, done. */
  priceAud: 49.95,

  /** Flat-rate shipping in whole AUD dollars (Australia wide). */
  shippingAud: 9.95,

  currency: "AUD",

  /** Shown on the product card and used in structured data. */
  dimensions: "Suits standard split-system outdoor units (approx. 80–100cm wide)",

  maxQuantity: 10,

  /**
   * Gallery images — drop files into /public/images/ and list them here.
   * Slots without a real file yet render as styled placeholders.
   */
  images: [
    { src: "/images/product-1.jpg", alt: "ShadeMate cover fitted on an outdoor aircon unit" },
    { src: "/images/product-2.jpg", alt: "Close-up of ShadeMate reflective material" },
    { src: "/images/product-3.jpg", alt: "ShadeMate securing strap detail" },
    { src: "/images/product-4.jpg", alt: "ShadeMate on a unit in full sun" },
    { src: "/images/product-5.jpg", alt: "Aircon unit airflow staying clear with ShadeMate fitted" },
    { src: "/images/product-6.jpg", alt: "ShadeMate folded for delivery" },
  ],
} as const;

/**
 * ── Limited-offer / sale promo ────────────────────────────────────────
 * Controls the QVC-style promo treatment: starburst badges, was/now
 * pricing and the limited-offer banner. Flip `enabled` to false to turn
 * the whole lot off site-wide.
 *
 * ⚠️ ACCC compliance: only show a was/now saving if the product genuinely
 * sold at `rrpAud` for a reasonable period (or it's a true RRP). Fake
 * "was" prices are misleading two-price advertising under Australian
 * Consumer Law.
 */
export const sale = {
  enabled: true,

  /** The "was" price in AUD. Customers pay product.priceAud. */
  rrpAud: 69.95,

  /** Short shouty label on the starburst, e.g. "LAUNCH SPECIAL". */
  badgeText: "LAUNCH SPECIAL",

  /** Banner across the top of the site. */
  bannerText: "Limited launch offer — grab yours before they're gone!",

  /**
   * Optional offer end date/time (ISO format, AEST is +10:00) — shows a
   * live countdown in the banner when set. Leave as "" for no countdown.
   * Example: "2026-06-30T23:59:59+10:00"
   */
  endsAt: "",
};

/** Dollars saved vs RRP while the sale is on. */
export function saleSavings(): number {
  return Math.max(0, sale.rrpAud - product.priceAud);
}

/** Percentage saved vs RRP, rounded, e.g. 29. */
export function saleSavingsPercent(): number {
  if (sale.rrpAud <= 0) return 0;
  return Math.round((saleSavings() / sale.rrpAud) * 100);
}

/** Placeholder reviews — replace with your real Google reviews. */
export const reviews = [
  {
    name: "Your customer's name",
    location: "Brisbane, QLD",
    rating: 5,
    text: "Paste a real Google review here once they start rolling in.",
  },
  {
    name: "Your customer's name",
    location: "Perth, WA",
    rating: 5,
    text: "Paste a real Google review here once they start rolling in.",
  },
  {
    name: "Your customer's name",
    location: "Darwin, NT",
    rating: 5,
    text: "Paste a real Google review here once they start rolling in.",
  },
] as const;

export const faqs = [
  {
    question: "Does it block the airflow?",
    answer:
      "No — it covers the top of the unit only. All vents and the fan stay completely clear.",
  },
  {
    question: "Can I leave it on while the aircon is running?",
    answer: "Yes, that's the whole point. Designed to stay on year-round.",
  },
  {
    question: "Will it fit my unit?",
    answer:
      "Suits standard split-system outdoor units. Check dimensions in the listing.",
  },
  {
    question: "Is it safe in the heat?",
    answer: "Yes — non-flammable material built for harsh sun.",
  },
  {
    question: "How do I fit it?",
    answer: "Drape it over the top, secure the strap. Under a minute, no tools.",
  },
] as const;

/** Helper: format an AUD amount for display, e.g. "$49.95". */
export function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount);
}

/** Helper: AUD dollars → Stripe cents. */
export function audToCents(amount: number): number {
  return Math.round(amount * 100);
}

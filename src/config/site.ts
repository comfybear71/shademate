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

  /**
   * Normal price in AUD dollars (1–2 units). Multi-buy deals below in
   * `bundles`; intro pricing in `launchSpecial`.
   */
  priceAud: 25,

  /** Flat-rate shipping in whole AUD dollars (Australia wide). */
  shippingAud: 9.95,

  /**
   * Multi-buy deals, best deal first. Quantity picks the first row it
   * qualifies for: 5+ = $20/unit + FREE postage, 3-4 = $20/unit,
   * otherwise the normal price above.
   */
  bundles: [
    { minQty: 5, unitPriceAud: 20, freeShipping: true, label: "5 for $100 + FREE postage" },
    { minQty: 3, unitPriceAud: 20, freeShipping: false, label: "3 for $60" },
  ],

  /**
   * Intro deal: this unit price applies until `maxOrders` orders exist in
   * the database, then pricing reverts to normal automatically. Needs
   * DATABASE_URL set (Neon) — without a database the site safely falls
   * back to normal pricing. The 5+ free-postage rule still applies.
   */
  launchSpecial: {
    enabled: true,
    unitPriceAud: 15.99,
    maxOrders: 100,
    label: "Launch special — first 100 orders only",
  },

  currency: "AUD",

  /** Shown on the product card and used in structured data. */
  dimensions: "Suits standard split-system outdoor units (approx. 80–100cm wide)",

  maxQuantity: 10,

  /**
   * Gallery images — files live in /public/images/. Slots without a real
   * file render as styled placeholders.
   */
  images: [
    { src: "/images/product-1.jpg", alt: "Branded ShadeMate cover with Aussie Shade Mate logo fitted on an outdoor aircon unit" },
    { src: "/images/product-2.jpg", alt: "Top view of the reflective ShadeMate cover on a split-system outdoor unit" },
    { src: "/images/product-3.jpg", alt: "ShadeMate reflective cover fitted with the fan and vents completely clear" },
    { src: "/images/product-4.jpg", alt: "Two outdoor aircon units side by side wearing ShadeMate covers" },
    { src: "/images/product-5.jpg", alt: "ShadeMate suits wall-mounted, ground and apartment split-system units" },
  ],

  /**
   * Gallery videos — shown below the photos. Files live in /public/images/.
   * The poster is the thumbnail shown before play (needed on iPhones,
   * which otherwise show a blank box).
   */
  videos: [
    {
      src: "/images/video-1.mp4",
      poster: "/images/video-1-poster.jpg",
      title: "Fitting ShadeMate on an outdoor unit",
    },
    {
      src: "/images/video-2.mp4",
      poster: "/images/video-2-poster.jpg",
      title: "ShadeMate installed in under a minute",
    },
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
  /**
   * Off until there's a genuine "was" price: the real selling price is
   * $25, so claiming "was $69.95" would be a fake discount. Once you've
   * sold at $25 for a while you can run e.g. "was $25 now $20" promos —
   * set rrpAud to the genuine prior price and flip this back on.
   */
  enabled: false,

  /** The "was" price in AUD. Customers pay product.priceAud. */
  rrpAud: 25,

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

export const reviews = [
  {
    name: "Sarah M.",
    location: "Brisbane, QLD",
    rating: 5,
    text: "Our outdoor unit sits in full afternoon sun and was baking every summer. ShadeMate went on in about a minute, fits snugly, and the difference is obvious — the metal isn't scorching hot anymore. Great little product.",
  },
  {
    name: "David K.",
    location: "Perth, WA",
    rating: 5,
    text: "Simple to install, no tools, and it actually stays put in our coastal winds. The reflective cover keeps dust and bird mess off the top too. Arrived quickly and feels well made for the price.",
  },
  {
    name: "Jenny T.",
    location: "Darwin, NT",
    rating: 5,
    text: "Up here the sun is relentless and our aircon works overtime. This cover has made a real difference — unit runs quieter and the house cools down faster. Wish we'd picked one up years ago.",
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

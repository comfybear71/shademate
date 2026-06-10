import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Lazily construct the Stripe client so the app can build without
 * STRIPE_SECRET_KEY being set (e.g. preview builds).
 */
export function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    stripeClient = new Stripe(key, {
      apiVersion: "2024-06-20",
      appInfo: { name: "ShadeMate", url: "https://shademate.xyz" },
    });
  }
  return stripeClient;
}

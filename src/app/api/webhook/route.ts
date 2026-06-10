import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { insertOrder } from "@/lib/db";

/**
 * Stripe webhook endpoint — point your Stripe webhook at
 * https://shademate.xyz/api/webhook and listen for
 * `checkout.session.completed`. Each paid order is stored in the
 * Neon `orders` table (which also drives the launch-special counter).
 */
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const quantity = Number(session.metadata?.quantity) || 1;
      const amountTotal = session.amount_total ?? 0;
      const shippingCents =
        session.shipping_cost?.amount_total ?? 0;

      try {
        await insertOrder({
          stripeSessionId: session.id,
          email: session.customer_details?.email ?? null,
          name: session.customer_details?.name ?? null,
          phone: session.customer_details?.phone ?? null,
          shippingAddress: session.shipping_details ?? null,
          quantity,
          unitPriceCents: Math.round((amountTotal - shippingCents) / quantity),
          amountTotalCents: amountTotal,
          currency: session.currency ?? "aud",
          launchSpecial: session.metadata?.launch_special === "true",
        });
        console.log("✅ Order stored:", session.id, {
          email: session.customer_details?.email,
          quantity,
          total: amountTotal,
        });
      } catch (err) {
        // Log loudly but still 200 — the payment succeeded; the order is
        // recoverable from the Stripe dashboard if the insert failed.
        console.error("⚠️ Order insert failed for", session.id, err);
      }
      break;
    }
    case "checkout.session.expired":
      // Customer abandoned checkout — nothing to do.
      break;
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

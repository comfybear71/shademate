import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

/**
 * Stripe webhook endpoint — point your Stripe webhook at
 * https://shademate.xyz/api/webhook and listen for
 * `checkout.session.completed`.
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
      // Order confirmed and paid. Stripe emails the customer a receipt if
      // enabled in your dashboard (Settings → Emails). Hook in order
      // fulfilment here — e.g. email yourself, push to a spreadsheet or
      // fulfilment service.
      console.log("✅ Order received:", {
        sessionId: session.id,
        amountTotal: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_details?.email,
        customerName: session.customer_details?.name,
        shipping: session.shipping_details,
        quantity: session.metadata?.quantity,
      });
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

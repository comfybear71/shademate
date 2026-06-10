import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { countOrders } from "@/lib/db";
import { getPricing } from "@/lib/pricing";
import { product, siteConfig, audToCents, formatAud } from "@/config/site";

export async function POST(req: NextRequest) {
  let quantity = 1;
  try {
    const body = await req.json();
    quantity = Number(body?.quantity);
  } catch {
    // fall through to validation below
  }

  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > product.maxQuantity
  ) {
    return NextResponse.json(
      { error: `Quantity must be between 1 and ${product.maxQuantity}.` },
      { status: 400 },
    );
  }

  // Authoritative price — computed server-side from config + order count,
  // never from anything the client sends.
  const ordersSoFar = await countOrders();
  const pricing = getPricing(quantity, ordersSoFar);

  const dealNote = pricing.launchActive
    ? product.launchSpecial.label
    : pricing.dealLabel;

  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    siteConfig.url;

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity,
          price_data: {
            currency: product.currency.toLowerCase(),
            unit_amount: audToCents(pricing.unitPriceAud),
            product_data: {
              name: product.name,
              description: dealNote
                ? `${dealNote} · ${product.dimensions}`
                : product.dimensions,
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["AU"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: pricing.freeShipping
              ? "FREE shipping (5+ deal, Australia wide)"
              : "Flat-rate shipping (Australia wide)",
            fixed_amount: {
              amount: audToCents(pricing.shippingAud),
              currency: product.currency.toLowerCase(),
            },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      // Shared Stripe account: make card statements show ShadeMate
      // after the account's descriptor prefix.
      payment_intent_data: {
        statement_descriptor_suffix: "SHADEMATE",
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancelled`,
      metadata: {
        product: product.shortName,
        quantity: String(quantity),
        unit_price_aud: formatAud(pricing.unitPriceAud),
        launch_special: String(pricing.launchActive),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json(
      { error: "Unable to start checkout right now. Please try again." },
      { status: 500 },
    );
  }
}

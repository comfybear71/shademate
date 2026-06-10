import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { product, siteConfig, audToCents } from "@/config/site";

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
            unit_amount: audToCents(product.priceAud),
            product_data: {
              name: product.name,
              description: product.dimensions,
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
            display_name: "Flat-rate shipping (Australia wide)",
            fixed_amount: {
              amount: audToCents(product.shippingAud),
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
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancelled`,
      metadata: {
        product: product.shortName,
        quantity: String(quantity),
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

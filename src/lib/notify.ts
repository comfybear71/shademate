import { formatAud } from "@/config/site";

/**
 * Emails the owner about each new order via Resend (https://resend.com).
 *
 * Setup (free tier is plenty):
 *   1. Sign up at resend.com with the email you want notified
 *   2. Create an API key → RESEND_API_KEY in Vercel
 *   3. Set ORDER_NOTIFICATIONS_EMAIL to that same email in Vercel
 *
 * Until you verify the shademate.xyz domain in Resend, emails are sent
 * from onboarding@resend.dev and can ONLY go to your own Resend account
 * email — which is exactly what we need here.
 *
 * If the env vars aren't set, this quietly does nothing (orders are
 * still stored in the database and visible in Stripe).
 */

interface OrderEmail {
  sessionId: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  shippingAddress: unknown;
  quantity: number;
  totalCents: number;
  launchSpecial: boolean;
}

function formatAddress(shipping: unknown): string {
  if (!shipping || typeof shipping !== "object") return "—";
  const s = shipping as {
    name?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  };
  const a = s.address ?? {};
  return [s.name, a.line1, a.line2, `${a.city ?? ""} ${a.state ?? ""} ${a.postal_code ?? ""}`.trim(), a.country]
    .filter(Boolean)
    .join("\n");
}

export async function sendOrderNotification(order: OrderEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFICATIONS_EMAIL;
  if (!apiKey || !to) {
    console.log("Order email skipped (RESEND_API_KEY / ORDER_NOTIFICATIONS_EMAIL not set)");
    return;
  }

  const address = formatAddress(order.shippingAddress);
  const total = formatAud(order.totalCents / 100);
  const subject = `🎉 ShadeMate order — ${order.quantity}× cover, ${total}`;

  const text = [
    `New ShadeMate order!`,
    ``,
    `Quantity: ${order.quantity}`,
    `Total paid: ${total}${order.launchSpecial ? " (launch special)" : ""}`,
    ``,
    `--- Ship to (forward this to fulfilment) ---`,
    address,
    ``,
    `Customer name:  ${order.name ?? "—"}`,
    `Customer email: ${order.email ?? "—"}`,
    `Customer phone: ${order.phone ?? "—"}`,
    ``,
    `Stripe session: ${order.sessionId}`,
    `View payment: https://dashboard.stripe.com/payments`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "ShadeMate Orders <onboarding@resend.dev>",
      to: [to],
      subject,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Order email failed:", res.status, await res.text());
  } else {
    console.log("📧 Order email sent for", order.sessionId);
  }
}

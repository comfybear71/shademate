import { NextRequest, NextResponse } from "next/server";
import { countOrders } from "@/lib/db";
import { getPricing } from "@/lib/pricing";
import { product } from "@/config/site";

export const dynamic = "force-dynamic";

/**
 * Live pricing for the buy box. GET /api/pricing?quantity=3
 * Reflects whether the launch special is still running (first N orders).
 */
export async function GET(req: NextRequest) {
  const quantity = Math.min(
    Math.max(Number(req.nextUrl.searchParams.get("quantity")) || 1, 1),
    product.maxQuantity,
  );
  const ordersSoFar = await countOrders();
  const pricing = getPricing(quantity, ordersSoFar);

  return NextResponse.json(
    {
      ...pricing,
      ordersRemaining:
        pricing.launchActive && ordersSoFar !== null
          ? product.launchSpecial.maxOrders - ordersSoFar
          : null,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

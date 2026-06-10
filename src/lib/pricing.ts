import { product } from "@/config/site";

export interface Pricing {
  /** Per-unit price in AUD for this quantity. */
  unitPriceAud: number;
  /** Product subtotal (units only). */
  subtotalAud: number;
  /** Shipping charged for this order. */
  shippingAud: number;
  /** Order total including shipping. */
  totalAud: number;
  freeShipping: boolean;
  /** True when the launch-special intro price was applied. */
  launchActive: boolean;
  /** Label of the bundle deal applied, if any. */
  dealLabel: string | null;
}

/**
 * Single source of truth for what an order costs. Used by the checkout
 * API (authoritative) and the buy box (display). `ordersSoFar` is the
 * number of orders in the database, or null when unknown (no DB) — in
 * that case the launch special is NOT applied, so we can never promise
 * an intro price we can't count.
 */
export function getPricing(quantity: number, ordersSoFar: number | null): Pricing {
  const bundle = product.bundles.find((b) => quantity >= b.minQty) ?? null;

  const launchActive =
    product.launchSpecial.enabled &&
    ordersSoFar !== null &&
    ordersSoFar < product.launchSpecial.maxOrders;

  let unitPriceAud: number = bundle?.unitPriceAud ?? product.priceAud;
  if (launchActive && product.launchSpecial.unitPriceAud < unitPriceAud) {
    unitPriceAud = product.launchSpecial.unitPriceAud;
  }

  const freeShipping = bundle?.freeShipping ?? false;
  const shippingAud = freeShipping ? 0 : product.shippingAud;
  const subtotalAud = Math.round(unitPriceAud * quantity * 100) / 100;

  return {
    unitPriceAud,
    subtotalAud,
    shippingAud,
    totalAud: Math.round((subtotalAud + shippingAud) * 100) / 100,
    freeShipping,
    launchActive,
    dealLabel: bundle?.label ?? null,
  };
}

"use client";

import { useEffect, useState } from "react";
import { product, formatAud } from "@/config/site";
import { getPricing } from "@/lib/pricing";
import Starburst from "./Starburst";

export default function BuyBox() {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // null = unknown (treat as not active so we never over-promise)
  const [ordersRemaining, setOrdersRemaining] = useState<number | null>(null);
  const [launchActive, setLaunchActive] = useState(false);

  useEffect(() => {
    fetch("/api/pricing?quantity=1")
      .then((res) => res.json())
      .then((data) => {
        setLaunchActive(Boolean(data.launchActive));
        setOrdersRemaining(data.ordersRemaining ?? null);
      })
      .catch(() => {
        // Pricing display falls back to normal prices; checkout still
        // computes the real price server-side.
      });
  }, []);

  const pricing = getPricing(quantity, launchActive ? 0 : null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Something went wrong");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Checkout failed — please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <section id="buy" className="bg-gradient-to-b from-white to-ocean-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="relative rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100 sm:p-10">
          {launchActive && (
            <Starburst
              lines={[formatAud(product.launchSpecial.unitPriceAud), "EACH!"]}
              className="absolute -right-4 -top-8 h-28 w-28 animate-wiggle drop-shadow-lg sm:-right-8 sm:-top-10 sm:h-32 sm:w-32"
            />
          )}
          <p className="inline-flex rounded-full bg-sun-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sun-600">
            Delivered Australia wide
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900">
            {product.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {product.description}
          </p>
          <p className="mt-2 text-xs text-slate-500">{product.dimensions}</p>

          {/* Price */}
          <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span
              className={`font-display text-5xl font-extrabold ${launchActive ? "text-red-600" : "text-slate-900"}`}
            >
              {formatAud(pricing.unitPriceAud)}
            </span>
            <span className="pb-1 text-sm text-slate-500">
              each
              {launchActive &&
                ` — normally ${formatAud(product.priceAud)}`}
            </span>
          </div>

          {launchActive && (
            <p className="mt-2 inline-flex items-center gap-2 rounded-lg bg-yellow-100 px-3 py-1.5 text-sm font-extrabold uppercase tracking-wide text-red-700 ring-1 ring-yellow-300">
              🔥 {product.launchSpecial.label}
              {ordersRemaining !== null && ordersRemaining <= 50 && (
                <span>· only {ordersRemaining} left!</span>
              )}
            </p>
          )}

          {/* Multi-buy deals */}
          <div className="mt-5 flex flex-wrap gap-2">
            {product.bundles
              .slice()
              .reverse()
              .map((bundle) => (
                <button
                  key={bundle.minQty}
                  type="button"
                  onClick={() => setQuantity(bundle.minQty)}
                  className={`rounded-full px-4 py-2 text-sm font-bold ring-1 transition ${
                    quantity >= bundle.minQty &&
                    pricing.dealLabel === bundle.label
                      ? "bg-ocean-700 text-white ring-ocean-700"
                      : "bg-white text-ocean-700 ring-ocean-200 hover:bg-ocean-50"
                  }`}
                >
                  {bundle.label}
                </button>
              ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center rounded-full ring-1 ring-slate-200">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="px-4 py-3 text-xl font-bold text-ocean-700 disabled:text-slate-300"
              >
                −
              </button>
              <span
                aria-live="polite"
                className="w-10 text-center font-display text-lg font-bold text-slate-900"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.min(product.maxQuantity, q + 1))
                }
                disabled={quantity >= product.maxQuantity}
                aria-label="Increase quantity"
                className="px-4 py-3 text-xl font-bold text-ocean-700 disabled:text-slate-300"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="flex-1 rounded-full bg-sun-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-sun-500/30 transition hover:bg-sun-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Heading to checkout…"
                : `Checkout — ${formatAud(pricing.totalAud)}`}
            </button>
          </div>

          {/* Order summary line */}
          <p className="mt-3 text-center text-sm text-slate-500" aria-live="polite">
            {quantity} × {formatAud(pricing.unitPriceAud)} ={" "}
            {formatAud(pricing.subtotalAud)} +{" "}
            {pricing.freeShipping ? (
              <span className="font-bold text-green-600">FREE postage 🎉</span>
            ) : (
              `${formatAud(pricing.shippingAud)} postage`
            )}
          </p>

          {error && (
            <p role="alert" className="mt-4 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <p className="mt-6 text-center text-xs text-slate-400">
            🔒 Secure checkout powered by Stripe · Ships Australia wide
          </p>
        </div>
      </div>
    </section>
  );
}

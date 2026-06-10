"use client";

import { useState } from "react";
import { product, formatAud } from "@/config/site";

export default function BuyBox() {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = product.priceAud * quantity;

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
        <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100 sm:p-10">
          <p className="inline-flex rounded-full bg-sun-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sun-600">
            Free of fuss · Flat-rate shipping
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900">
            {product.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {product.description}
          </p>
          <p className="mt-2 text-xs text-slate-500">{product.dimensions}</p>

          <div className="mt-6 flex items-end gap-2">
            <span className="font-display text-4xl font-extrabold text-slate-900">
              {formatAud(product.priceAud)}
            </span>
            <span className="pb-1 text-sm text-slate-500">
              AUD + {formatAud(product.shippingAud)} flat-rate shipping
            </span>
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
                : `Checkout — ${formatAud(subtotal)}`}
            </button>
          </div>

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

import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sun-50 via-white to-white">
      {/* Decorative sun glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-sun-200/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-[-10%] h-80 w-80 rounded-full bg-ocean-100/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <p className="inline-flex items-center gap-2 rounded-full bg-ocean-50 px-4 py-1.5 text-sm font-semibold text-ocean-700 ring-1 ring-ocean-200">
          ☀️ Built for the Aussie sun
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-extrabold tracking-tight text-slate-900 text-balance sm:text-6xl">
          {siteConfig.tagline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          ShadeMate is the reflective, non-flammable cover that shields your
          outdoor unit from the brutal Aussie sun, dust and bird droppings — so
          it runs cooler and lasts longer. Delivered Australia wide.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/#buy"
            className="rounded-full bg-sun-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-sun-500/30 transition hover:bg-sun-600"
          >
            Get Yours Now
          </Link>
          <Link
            href="/#how-it-works"
            className="rounded-full px-8 py-4 text-lg font-semibold text-ocean-700 ring-1 ring-ocean-200 transition hover:bg-ocean-50"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center bg-gradient-to-b from-sun-50 to-white">
        <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ocean-100 text-4xl">
            🎉
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-slate-900">
            Thanks legend! Your ShadeMate is on its way.
          </h1>
          <p className="mt-4 text-slate-600">
            Your order is confirmed and we&apos;ll get it packed and shipped
            quick smart. A receipt from Stripe is headed to your inbox. Any
            questions, email{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-semibold text-ocean-700 underline"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
          <Link
            href="/"
            className="mt-10 inline-block rounded-full bg-sun-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-sun-500/30 transition hover:bg-sun-600"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

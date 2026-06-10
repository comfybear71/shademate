import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  robots: { index: false, follow: false },
};

export default function CancelledPage() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center">
        <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-4xl">
            👋
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-slate-900">
            No worries, nothing was charged.
          </h1>
          <p className="mt-4 text-slate-600">
            Your checkout was cancelled and your card hasn&apos;t been touched.
            Changed your mind back? Your ShadeMate is right where you left it.
            Questions first? Email{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-semibold text-ocean-700 underline"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
          <Link
            href="/#buy"
            className="mt-10 inline-block rounded-full bg-sun-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-sun-500/30 transition hover:bg-sun-600"
          >
            Back to the product
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

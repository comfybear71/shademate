import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center">
        <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-slate-900">
            404 — Lost in the outback
          </h1>
          <p className="mt-4 text-slate-600">
            That page doesn&apos;t exist. Head back home and grab your aircon a
            mate instead.
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

import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" aria-label="ShadeMate home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 sm:flex">
          <Link href="/#benefits" className="hover:text-ocean-700">
            Why ShadeMate
          </Link>
          <Link href="/#how-it-works" className="hover:text-ocean-700">
            How it works
          </Link>
          <Link href="/#faq" className="hover:text-ocean-700">
            FAQ
          </Link>
          <Link href="/guides" className="hover:text-ocean-700">
            Guides
          </Link>
          <Link href="/#contact" className="hover:text-ocean-700">
            Contact
          </Link>
        </nav>
        <Link
          href="/#buy"
          className="rounded-full bg-sun-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-sun-600"
        >
          Get Yours Now
        </Link>
      </div>
    </header>
  );
}

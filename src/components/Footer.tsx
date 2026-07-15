import Link from "next/link";
import Logo from "./Logo";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-ocean-900 text-ocean-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="rounded-xl bg-white/95 px-3 py-2 inline-block">
              <Logo />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ocean-200">
              {siteConfig.tagline} Reflective, non-flammable aircon covers,
              delivered Australia wide.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/guides" className="hover:text-white">
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/why-outdoor-aircon-needs-shade-cover"
                  className="hover:text-white"
                >
                  Aircon shade cover guide
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/snap-it-on-in-60-seconds"
                  className="hover:text-white"
                >
                  60-second install script
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-white">
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-white"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
              {siteConfig.social.facebook && (
                <li>
                  <a
                    href={siteConfig.social.facebook}
                    className="hover:text-white"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {siteConfig.social.instagram && (
                <li>
                  <a
                    href={siteConfig.social.instagram}
                    className="hover:text-white"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-ocean-800 pt-6 text-xs text-ocean-300">
          <p>
            © {year} {siteConfig.company.legalName} · ABN{" "}
            {siteConfig.company.abn} · All rights reserved.
          </p>
          <p className="mt-1">
            🇦🇺 Aussie owned and operated. Delivered Australia wide.
          </p>
        </div>
      </div>
    </footer>
  );
}

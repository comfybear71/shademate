import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

const path = "/guides/snap-it-on-in-60-seconds";

export const metadata: Metadata = {
  title: "Snap It On in 60 Seconds — Video Script",
  description:
    "Short-form Shade Mate video script: backyard install in under a minute — reflective, non-flammable outdoor aircon cover.",
  alternates: { canonical: path },
  openGraph: {
    title: "Snap It On in 60 Seconds | ShadeMate",
    description:
      "60-second install script for Shade Mate — your aircon's best mate.",
    url: `${siteConfig.url}${path}`,
  },
};

export default function SnapItOnScriptPage() {
  return (
    <LegalPage title="Snap It On in 60 Seconds" lastUpdated="July 2026">
      <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600">
        Short-form video script (Content from ComfyMart) — use for Reels,
        Shorts, or TikTok. Not a long SEO article.
      </p>

      <h2>Scene</h2>
      <p>
        Backyard, sunny day. Host walks up to outdoor aircon unit baking in the
        sun.
      </p>

      <h2>Script</h2>
      <p>
        <strong>Host:</strong> &ldquo;Look at this poor thing — full sun, bird
        mess, cooking itself all summer. No wonder aircon units pack it in
        early.&rdquo;
      </p>
      <p>
        <em>[Holds up Shade Mate]</em>
      </p>
      <p>
        <strong>Host:</strong> &ldquo;This is Shade Mate. Reflective,
        non-flammable, and it just… snaps on. Watch.&rdquo;
      </p>
      <p>
        <em>[60-second install, no tools]</em>
      </p>
      <p>
        <strong>Host:</strong> &ldquo;Done. That&apos;s it. Keeps it cooler,
        cleaner, and running longer. Your aircon&apos;s best mate — grab one at{" "}
        <a href={siteConfig.url} className="text-ocean-700 underline">
          shademate.xyz
        </a>
        .&rdquo;
      </p>

      <p>
        <Link href="/guides" className="text-ocean-700 underline">
          ← All guides
        </Link>
        {" · "}
        <Link href="/#buy" className="text-ocean-700 underline">
          Get yours now
        </Link>
      </p>
    </LegalPage>
  );
}

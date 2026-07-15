import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical guides on outdoor aircon care, shade covers, and Aussie summer protection from ShadeMate.",
  alternates: { canonical: "/guides" },
};

const guides = [
  {
    href: "/guides/why-outdoor-aircon-needs-shade-cover",
    title: "Why Your Outdoor Aircon Unit Needs a Shade Cover",
    blurb:
      "Sun, dust, and bird mess vs a reflective top-only cover that keeps airflow clear.",
  },
  {
    href: "/guides/snap-it-on-in-60-seconds",
    title: "Snap It On in 60 Seconds (video script)",
    blurb:
      "Short-form shoot script — backyard install, no tools, point them to shademate.xyz.",
  },
];

export default function GuidesIndexPage() {
  return (
    <LegalPage title="Guides" lastUpdated="July 2026">
      <p>
        Short reads for Aussie homeowners looking after split-system outdoor
        units.
      </p>
      <ul className="!list-none !pl-0 space-y-4">
        {guides.map((g) => (
          <li key={g.href} className="border-b border-slate-100 pb-4">
            <Link
              href={g.href}
              className="font-display text-lg font-bold text-ocean-700 hover:underline"
            >
              {g.title}
            </Link>
            <p className="mt-1 text-sm text-slate-600">{g.blurb}</p>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}

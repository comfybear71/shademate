import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

const path = "/guides/why-outdoor-aircon-needs-shade-cover";

export const metadata: Metadata = {
  title: "Why Your Outdoor Aircon Unit Needs a Shade Cover",
  description:
    "Learn why split-system outdoor units in Aussie sun need a reflective top cover — and how Shade Mate protects against heat, dust, and bird droppings without blocking airflow.",
  alternates: { canonical: path },
  openGraph: {
    title: "Why Your Outdoor Aircon Unit Needs a Shade Cover | ShadeMate",
    description:
      "Aircon cover Australia guide: sun, bird mess, and DIY split system protection that keeps airflow clear.",
    url: `${siteConfig.url}${path}`,
  },
};

export default function OutdoorAirconShadeCoverGuidePage() {
  return (
    <LegalPage
      title="Why Your Outdoor Aircon Unit Needs a Shade Cover"
      lastUpdated="July 2026"
    >
      <p>
        If your split-system outdoor unit sits in full Aussie sun, it is working
        harder than it should. Heat, dust, and bird droppings bake onto the top
        of the cabinet all summer — especially across QLD, NT, and coastal WA. A
        purpose-built outdoor unit shade cover is one of the simplest DIY
        upgrades you can make.
      </p>

      <h2>The problem: outdoor units cook in the sun</h2>
      <p>
        Outdoor condensers are designed to dump heat outdoors. When the metal
        cabinet itself is roasting in direct sunlight, the system has to fight
        that extra load. Homeowners searching for an aircon cover Australia or
        outdoor unit shade cover are usually trying to solve the same pain:
        hotter metal, longer cool-down times, and more wear over a brutal
        summer.
      </p>
      <p>
        Bird mess and leaf litter make it worse. Droppings bake on, grit builds
        up, and the top of the unit becomes a grimy heat sink. That is why
        searches like bird dropping aircon and DIY aircon accessory spike every
        summer.
      </p>

      <h2>What a good split system protection cover does</h2>
      <p>Not every tarp or improvised sheet is safe. The right cover should:</p>
      <ul>
        <li>Sit on the <strong>top only</strong>, so vents and airflow stay clear</li>
        <li>Use a <strong>reflective</strong> surface to bounce radiant heat</li>
        <li>Be <strong>non-flammable</strong> for peace of mind in harsh heat</li>
        <li>Fit without tools in under a minute</li>
      </ul>
      <p>
        That is the job of a reflective aircon cover / aircon sun shield designed
        for split systems — not a full enclosure that can choke airflow.
      </p>

      <h2>Shade Mate: built for Aussie outdoor units</h2>
      <p>
        Shade Mate is a reflective, non-flammable top-only cover for split-system
        outdoor units. It snaps on in under a minute with no tools, keeps airflow
        clear, and helps shield the cabinet from sun, dust, and bird droppings so
        your aircon can run cooler and last longer through summer.
      </p>
      <p>
        If you have been looking for Aussie aircon protection without a tradie
        visit, this is the DIY path: protect the top, leave the sides and fan
        free, and get back to enjoying a cooler home.
      </p>

      <h2>Quick fit checklist</h2>
      <ul>
        <li>Make sure the top of the outdoor unit is clear of loose debris.</li>
        <li>Place the Shade Mate cover over the top only.</li>
        <li>Secure it as directed — no tools needed.</li>
        <li>Confirm vents and the fan remain completely unobstructed.</li>
      </ul>

      <h2>Ready when you are</h2>
      <p>
        Grab yours at{" "}
        <Link href="/#buy" className="text-ocean-700 underline">
          shademate.xyz
        </Link>{" "}
        and give your outdoor unit a fighting chance this summer.
      </p>
    </LegalPage>
  );
}

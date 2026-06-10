import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig, product, formatAud } from "@/config/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: `Shipping and returns policy for ${siteConfig.name}. Flat-rate delivery Australia wide.`,
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <LegalPage title="Shipping & Returns" lastUpdated="June 2026">
      <h2>Shipping</h2>
      <p>
        We deliver Australia wide — metro, regional and remote. Shipping is a
        flat rate of {formatAud(product.shippingAud)} per order, calculated at
        checkout.
      </p>
      <ul>
        <li>Orders are dispatched within 1–2 business days.</li>
        <li>
          Typical delivery is 3–10 business days depending on your location.
        </li>
        <li>
          You&apos;ll receive tracking details by email once your order ships.
        </li>
      </ul>

      <h2>Returns and refunds</h2>
      <p>
        Our goods come with guarantees that cannot be excluded under the
        Australian Consumer Law. You are entitled to a replacement or refund
        for a major failure and compensation for any other reasonably
        foreseeable loss or damage. You are also entitled to have the goods
        repaired or replaced if the goods fail to be of acceptable quality and
        the failure does not amount to a major failure.
      </p>
      <p>
        If your ShadeMate arrives damaged or faulty, email us at{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-ocean-700 underline">
          {siteConfig.contactEmail}
        </a>{" "}
        with your order details and a photo, and we&apos;ll sort out a
        replacement or refund quick smart.
      </p>

      <h2>Change of mind</h2>
      <p>
        Changed your mind? No dramas. Contact us within 30 days of delivery —
        if the cover is unused and in its original condition, we&apos;ll
        refund the purchase price once it&apos;s returned. Return postage for
        change-of-mind returns is at your cost.
      </p>

      <h2>Contact</h2>
      <p>
        Any shipping or returns questions, email{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-ocean-700 underline">
          {siteConfig.contactEmail}
        </a>
        .
      </p>
    </LegalPage>
  );
}

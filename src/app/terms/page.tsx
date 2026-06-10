import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${siteConfig.name} (${siteConfig.company.legalName}).`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="June 2026">
      <p>
        These terms apply to purchases from {siteConfig.name}, operated by{" "}
        {siteConfig.company.legalName} (ABN {siteConfig.company.abn}). By
        placing an order you agree to these terms.
      </p>

      <h2>Orders and payment</h2>
      <p>
        All prices are in Australian dollars (AUD) and include GST where
        applicable. Payment is processed securely by Stripe at checkout. An
        order is accepted when payment is confirmed.
      </p>

      <h2>Delivery</h2>
      <p>
        We deliver Australia wide. Delivery timeframes are estimates only and
        may vary by location and carrier. See our{" "}
        <a href="/shipping-returns" className="text-ocean-700 underline">
          Shipping &amp; Returns
        </a>{" "}
        page for details.
      </p>

      <h2>Product use</h2>
      <p>
        ShadeMate is designed to cover the top of standard split-system
        outdoor air conditioner units without obstructing vents or airflow.
        Fit the cover as directed. Product performance benefits relate to
        reflecting heat and keeping debris off your unit; results will vary
        with conditions and installation.
      </p>

      <h2>Australian Consumer Law</h2>
      <p>
        Our goods come with guarantees that cannot be excluded under the
        Australian Consumer Law. You are entitled to a replacement or refund
        for a major failure and compensation for any other reasonably
        foreseeable loss or damage. You are also entitled to have the goods
        repaired or replaced if the goods fail to be of acceptable quality and
        the failure does not amount to a major failure.
      </p>

      <h2>Liability</h2>
      <p>
        Nothing in these terms excludes, restricts or modifies any consumer
        guarantee, right or remedy under the Australian Consumer Law. To the
        extent permitted by law, our liability is otherwise limited to the
        replacement of the goods or a refund of the purchase price.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-ocean-700 underline">
          {siteConfig.contactEmail}
        </a>
        .
      </p>
    </LegalPage>
  );
}

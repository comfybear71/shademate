import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name} (${siteConfig.company.legalName}).`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="June 2026">
      <p>
        {siteConfig.company.legalName} (ABN {siteConfig.company.abn}), trading
        as {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
        is committed to protecting your privacy in accordance with the Privacy
        Act 1988 (Cth) and the Australian Privacy Principles.
      </p>

      <h2>What we collect</h2>
      <p>
        When you place an order we collect your name, email address, phone
        number and delivery address. Payment details are collected and
        processed directly by Stripe — we never see or store your card number.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To process and deliver your order</li>
        <li>To contact you about your order</li>
        <li>To respond to your enquiries</li>
        <li>To meet our legal and tax obligations</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We share your information only with the service providers needed to
        run the business: Stripe (payment processing), our shipping carriers
        (delivery), and our website host (Vercel). We do not sell your
        personal information to anyone.
      </p>

      <h2>Storage and security</h2>
      <p>
        We take reasonable steps to protect your personal information from
        misuse, loss and unauthorised access. Order information is retained
        only as long as needed for business and legal purposes.
      </p>

      <h2>Access and correction</h2>
      <p>
        You can request access to, or correction of, the personal information
        we hold about you at any time by emailing{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-ocean-700 underline">
          {siteConfig.contactEmail}
        </a>
        .
      </p>

      <h2>Complaints</h2>
      <p>
        If you have a privacy concern, contact us first and we&apos;ll do our
        best to resolve it. You can also contact the Office of the Australian
        Information Commissioner (OAIC) at oaic.gov.au.
      </p>
    </LegalPage>
  );
}

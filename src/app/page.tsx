import Header from "@/components/Header";
import TestBanner from "@/components/TestBanner";
import PromoBanner from "@/components/PromoBanner";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import Gallery from "@/components/Gallery";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import BuyBox from "@/components/BuyBox";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { siteConfig, product, faqs } from "@/config/site";

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.images.map((image) => `${siteConfig.url}${image.src}`),
  brand: {
    "@type": "Brand",
    name: siteConfig.name,
  },
  offers: {
    "@type": "Offer",
    url: siteConfig.url,
    priceCurrency: product.currency,
    price: product.priceAud.toFixed(2),
    availability: "https://schema.org/InStock",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: product.shippingAud.toFixed(2),
        currency: product.currency,
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "AU",
      },
    },
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <TestBanner />
      <PromoBanner />
      <Header />
      <main>
        <Hero />
        <TrustBanner />
        <Gallery />
        <Benefits />
        <HowItWorks />
        <BuyBox />
        <Reviews />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import { siteConfig } from "@/config/site";

export default function Contact() {
  return (
    <section id="contact" className="bg-ocean-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Got a question? Give us a yell
        </h2>
        <p className="mt-4 text-slate-600">
          We&apos;re a small Aussie crew and we read every email. Whether
          it&apos;s about fit, shipping or your order — we&apos;ll get back to
          you quick smart.
        </p>
        <a
          href={`mailto:${siteConfig.contactEmail}?subject=ShadeMate enquiry`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ocean-700 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-ocean-700/20 transition hover:bg-ocean-800"
        >
          ✉️ Email us at {siteConfig.contactEmail}
        </a>
      </div>
    </section>
  );
}

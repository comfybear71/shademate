import { reviews, siteConfig } from "@/config/site";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5 text-sun-500"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-5 w-5 ${i < rating ? "fill-current" : "fill-slate-200"}`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-sun-50/70 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          What the neighbours are saying
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {reviews.map((review, i) => (
            <figure
              key={i}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-4 text-sm leading-relaxed text-slate-600">
                “{review.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-bold text-slate-900">{review.name}</span>
                <span className="text-slate-500"> · {review.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          {siteConfig.googleReviewLink ? (
            <a
              href={siteConfig.googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ocean-700 shadow-sm ring-1 ring-ocean-200 transition hover:bg-ocean-50"
            >
              ⭐ Review us on Google
            </a>
          ) : (
            <p className="text-sm text-slate-400">
              {/* Add your Google review link in src/config/site.ts to show the button here */}
              ⭐ Google review link coming soon
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

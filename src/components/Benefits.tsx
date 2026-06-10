const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    title: "Reflects sun heat",
    text: "Reflective surface bounces harsh sunlight away, helping your unit run more efficiently by reflecting heat.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Blocks bird poo, dust & debris",
    text: "Keeps droppings, dust, leaves and gum nuts off the top of your unit all year round.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
        <path d="M12 2c2 4-3 5-3 9a3 3 0 006 0c0-2-1-3-1-3s4 1 4 6a6 6 0 01-12 0c0-6 6-8 6-12z" />
        <line x1="4" y1="4" x2="20" y2="20" />
      </svg>
    ),
    title: "Non-flammable material",
    text: "Made from non-flammable material built to cop harsh sun safely, season after season.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
        <path d="M3 8h10a3 3 0 100-3M3 12h14a3 3 0 110 3M3 16h7a3 3 0 11.8 3" />
      </svg>
    ),
    title: "Doesn't block airflow",
    text: "Covers the top only — every vent and the fan stay completely clear while it runs.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
    title: "Fits in under a minute",
    text: "Drape it over the top and clip the strap. No tools, no fuss, no tradie required.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
    title: "Australia wide delivery",
    text: "From Cairns to Hobart, we deliver to every corner of the country.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="bg-ocean-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Why your aircon needs a mate
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
          Your outdoor unit works hard. ShadeMate makes its job easier.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <div className="inline-flex rounded-xl bg-sun-100 p-3 text-sun-600">
                {benefit.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "1",
    title: "Drape over top",
    text: "Lay ShadeMate over the top of your outdoor unit.",
  },
  {
    number: "2",
    title: "Secure strap",
    text: "Clip the strap so it stays put in wind and weather.",
  },
  {
    number: "3",
    title: "Done",
    text: "That's it. Under a minute, no tools, year-round protection.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Fitted faster than the kettle boils
      </h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.number} className="relative text-center">
            {i < steps.length - 1 && (
              <div
                aria-hidden="true"
                className="absolute left-[60%] top-8 hidden h-0.5 w-[80%] bg-gradient-to-r from-sun-300 to-ocean-200 sm:block"
              />
            )}
            <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sun-500 font-display text-2xl font-extrabold text-white shadow-lg shadow-sun-500/30">
              {step.number}
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

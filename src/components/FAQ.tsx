"use client";

import { useState } from "react";
import { faqs } from "@/config/site";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Fair questions, straight answers
      </h2>
      <div className="mt-10 divide-y divide-slate-200 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-base font-bold text-slate-900">
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-ocean-600 transition-transform ${isOpen ? "rotate-45" : ""}`}
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                hidden={!isOpen}
                className="px-6 pb-5 text-sm leading-relaxed text-slate-600"
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

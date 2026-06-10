"use client";

import { useEffect, useState } from "react";
import { sale, saleSavings, formatAud } from "@/config/site";

function timeLeft(endsAt: string) {
  const diff = new Date(endsAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function Countdown({ endsAt }: { endsAt: string }) {
  // Render only after mount to avoid a server/client hydration mismatch.
  const [remaining, setRemaining] = useState<ReturnType<typeof timeLeft>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRemaining(timeLeft(endsAt));
    const interval = setInterval(() => setRemaining(timeLeft(endsAt)), 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  if (!mounted || !remaining) return null;

  const parts = [
    { value: remaining.days, label: "DAYS" },
    { value: remaining.hours, label: "HRS" },
    { value: remaining.minutes, label: "MIN" },
    { value: remaining.seconds, label: "SEC" },
  ];

  return (
    <span className="inline-flex items-center gap-1.5" aria-label="Offer ends in">
      <span className="hidden sm:inline">⏰ Ends in</span>
      {parts.map((part) => (
        <span
          key={part.label}
          className="inline-flex flex-col items-center rounded bg-white/20 px-1.5 py-0.5 leading-none"
        >
          <span className="font-display text-sm font-extrabold tabular-nums">
            {String(part.value).padStart(2, "0")}
          </span>
          <span className="text-[8px] font-bold tracking-wider">
            {part.label}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function PromoBanner() {
  if (!sale.enabled) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 px-4 py-2.5 text-center text-white">
      <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-bold sm:text-base">
        <span className="animate-pulse">🔥</span>
        <span className="uppercase tracking-wide">{sale.badgeText}</span>
        <span className="rounded-full bg-yellow-300 px-2.5 py-0.5 font-display text-xs font-extrabold uppercase text-red-700 sm:text-sm">
          Save {formatAud(saleSavings())}
        </span>
        <span className="hidden font-semibold sm:inline">
          {sale.bannerText}
        </span>
        {sale.endsAt && <Countdown endsAt={sale.endsAt} />}
      </p>
    </div>
  );
}

/**
 * Simple text + SVG sun/shade logo. Swap this whole component out
 * (or just the SVG) when you have a designed logo.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Sun rays */}
        <g stroke="#f59e0b" strokeWidth="3" strokeLinecap="round">
          <line x1="24" y1="3" x2="24" y2="9" />
          <line x1="38.8" y1="9.2" x2="34.6" y2="13.4" />
          <line x1="9.2" y1="9.2" x2="13.4" y2="13.4" />
          <line x1="45" y1="24" x2="39" y2="24" />
          <line x1="3" y1="24" x2="9" y2="24" />
        </g>
        {/* Sun */}
        <circle cx="24" cy="24" r="10" fill="#fbbf24" />
        {/* Shade canopy over the sun */}
        <path
          d="M10 30 Q24 22 38 30 L38 34 Q24 27 10 34 Z"
          fill="#0891b2"
        />
        {/* Aircon unit base */}
        <rect x="14" y="36" width="20" height="8" rx="2" fill="#155e75" />
        <circle cx="24" cy="40" r="2.5" fill="#a5f3fc" />
      </svg>
      <span className="font-display text-2xl font-extrabold tracking-tight">
        <span className="text-ocean-700">Shade</span>
        <span className="text-sun-500">Mate</span>
      </span>
    </span>
  );
}

/**
 * Classic retail "starburst" / price-burst badge — the red explosion
 * sticker with SAVE $X in the middle. Pass 1–3 short lines of text.
 */

function burstPoints(
  points: number,
  outerRadius: number,
  innerRadius: number,
): string {
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const x = 100 + radius * Math.cos(angle);
    const y = 100 + radius * Math.sin(angle);
    coords.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return coords.join(" ");
}

const outerBurst = burstPoints(16, 98, 80);
const innerBurst = burstPoints(16, 88, 72);

export default function Starburst({
  lines,
  className = "",
}: {
  lines: readonly string[];
  className?: string;
}) {
  const shown = lines.slice(0, 3);
  // Vertically centre 1–3 lines around y=100
  const startY = 100 - (shown.length - 1) * 14;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={shown.join(" ")}
    >
      <polygon
        points={outerBurst}
        fill="#dc2626"
        stroke="#991b1b"
        strokeWidth="2"
      />
      <polygon points={innerBurst} fill="#ef4444" />
      {shown.map((line, i) => (
        <text
          key={i}
          x="100"
          y={startY + i * 28}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontWeight="900"
          fontSize={line.length > 8 ? 20 : 26}
          fontFamily="var(--font-display), system-ui, sans-serif"
          style={{ letterSpacing: "0.02em" }}
        >
          {line}
        </text>
      ))}
    </svg>
  );
}

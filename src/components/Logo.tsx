import Image from "next/image";

/**
 * ShadeMate vector logo (public/images/logo.svg) — crisp at any size,
 * transparent background. Prefer the uploaded artwork instead? Point
 * src at "/images/logo.jpg".
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/images/logo.svg"
        alt="ShadeMate — Your aircon's best mate"
        width={640}
        height={400}
        priority
        className="h-14 w-auto"
      />
    </span>
  );
}

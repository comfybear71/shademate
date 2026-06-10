import Image from "next/image";

/**
 * Real ShadeMate logo (public/images/logo.jpg). Swap the file to update
 * the logo everywhere — header and footer both use this component.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/images/logo.jpg"
        alt="Aussie ShadeMate — Protect your cool"
        width={1264}
        height={816}
        priority
        className="h-12 w-auto"
      />
    </span>
  );
}

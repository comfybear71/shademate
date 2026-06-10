import Image from "next/image";
import fs from "fs";
import path from "path";
import { product } from "@/config/site";

/**
 * Renders the gallery from product.images in src/config/site.ts.
 * Images that exist in /public render normally; missing files render
 * as styled placeholders so the layout is ready before photos are added.
 */
export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="text-center font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        See it in action
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
        One smart cover. Every angle.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {product.images.map((image, i) => {
          const exists = fs.existsSync(
            path.join(process.cwd(), "public", image.src),
          );
          return exists ? (
            <div
              key={image.src}
              className="relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              key={image.src}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ocean-200 bg-ocean-50/50 p-4 text-center"
            >
              <span aria-hidden="true" className="text-3xl">
                📷
              </span>
              <span className="text-xs font-medium text-ocean-700">
                Image slot {i + 1}
              </span>
              <span className="text-[10px] text-slate-400">
                public{image.src}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { Expand } from "lucide-react";
import { brand } from "@/content/brand";
import { gallery } from "@/content/story";
import { useReveals } from "@/animations/useReveals";
import { cn } from "@/lib/cn";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Photo } from "@/components/ui/Photo";
import { Lightbox } from "@/components/ui/Lightbox";

const mobileSpan = (i: number) => (i % 3 === 0 ? "col-span-2" : "col-span-1");

export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  useReveals(ref);

  return (
    <section id="moments" ref={ref} data-nav="dark" className="gutter relative overflow-hidden bg-ink pb-28 pt-28 text-bone md:pb-44 md:pt-36">
      <ChapterHead num="06" label="Signature Moments" aside="Contact sheet — p. 06" tone="dark" />

      <div className="relative mt-14 md:mt-20">
        <h2 className="display text-[22vw] leading-[0.8] md:text-[15vw]">
          <span data-split className="block">
            Contact
          </span>
          <span data-split className="block md:pl-[18vw]">
            Sheet
          </span>
        </h2>
        <p data-fade className="serif-i mt-4 text-3xl text-crema md:absolute md:right-0 md:top-[3vw] md:mt-0 md:max-w-[20vw] md:text-right md:text-[2.3vw] md:leading-tight">
          Moments, unposed — shot on the floor by our team.
        </p>
      </div>

      <ul className="mt-16 grid grid-cols-2 gap-3 md:mt-28 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
        {gallery.map((g, i) => (
          <li key={g.src} className={cn(mobileSpan(i), g.span)}>
            <div data-parallax={g.speed}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden text-left"
                aria-label={`Open photo: ${g.alt}`}
              >
                <Photo
                  data-reveal-img
                  src={g.src}
                  alt={g.alt}
                  sizes="(min-width: 768px) 45vw, 50vw"
                  className={cn(g.ratio, "w-full")}
                  imgClassName="transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.06]"
                />
                <span className="mono absolute right-3 top-3 flex items-center gap-2 bg-bone px-2 py-1 text-ink opacity-0 transition-all duration-500 ease-expo group-hover:opacity-100 max-md:hidden">
                  View <Expand className="size-3" />
                </span>
              </button>
              <p className="mono mt-2 flex justify-between gap-3 text-bone/55">
                <span>Fig. {String(i + 3).padStart(2, "0")}</span>
                <span className="truncate">{g.caption}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-bone/15 pt-8 md:mt-32 md:flex-row md:items-center">
        <p className="display text-4xl md:text-5xl">
          More on <span className="serif-i text-crema">the gram</span>
        </p>
        <a
          href={brand.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mono inline-flex items-center gap-3 border-b border-bone pb-1"
        >
          Follow {brand.instagram.handle}
          <span className="sr-only">(opens in a new tab)</span>
          <span className="transition-transform duration-500 ease-expo group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </a>
      </div>

      <Lightbox items={gallery} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </section>
  );
}

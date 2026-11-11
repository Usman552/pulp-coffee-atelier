"use client";

import { useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { img } from "@/content/images";
import { useReveals } from "@/animations/useReveals";
import { useWordScrub } from "@/animations/useWordScrub";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { InlinePhoto } from "@/components/ui/InlinePhoto";
import { Photo } from "@/components/ui/Photo";

const stats = [
  { value: "04", label: "Partner farms", note: "Visited every harvest" },
  { value: "2.6×", label: "Above commodity price", note: "Invoices on the wall" },
  { value: "72h", label: "Croissant lamination", note: "Out by 6:30am" },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  useWordScrub(ref);

  return (
    <section id="manifesto" ref={ref} data-nav="light" className="gutter relative bg-bone pb-28 pt-28 text-ink md:pb-40 md:pt-36">
      <ChapterHead num="01" label="Manifesto" aside="What we believe — p. 01" />

      <h2 className="sr-only">Our manifesto</h2>
      <p data-scrub className="display mt-14 text-[11.5vw] leading-[0.92] sm:text-[8.4vw] md:mt-20 md:text-[6.4vw]">
        We think coffee should taste of
        {" "}<InlinePhoto src={img.manifestoCherry} alt="Ripe red coffee cherries on the branch" />{" "}
        a <span className="serif-i">place,</span> a <span className="serif-i">season</span> and the hands that picked it.{" "}
        So we roast light,
        {" "}<InlinePhoto src={img.manifestoCortado} alt="A cortado in a small glass in morning sunlight" />{" "}
        pour slow, and built a room
        {" "}<InlinePhoto src={img.manifestoStir} alt="Someone stirring a coffee at a wooden table" />{" "}
        for{" "}<span className="serif-i text-pulp">lingering.</span>
      </p>

      <div className="mt-20 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-6">
        <figure className="md:col-span-5 md:col-start-1">
          <div className="overflow-hidden">
            <Photo
              data-reveal-img
              src={img.manifestoWindow}
              alt="A hand holding a steaming cup of coffee by a sunlit window"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/5] w-full"
            />
          </div>
          <figcaption className="mono mt-3 flex justify-between text-ink/60">
            <span>Fig. 02</span>
            <span>First cup, north window</span>
          </figcaption>
        </figure>

        <div className="flex flex-col justify-end md:col-span-6 md:col-start-7">
          <p data-split className="serif-i text-4xl leading-[1.05] sm:text-5xl md:text-[3.6vw]">
            A coffee shop should be the best twenty minutes of somebody&rsquo;s day.
          </p>
          <dl data-stagger className="mt-12 border-t border-ink/20">
            {stats.map((s) => (
              <div key={s.label} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-ink/20 py-5 sm:grid-cols-[9rem_1fr_auto]">
                <dt className="display text-5xl text-pulp sm:text-6xl">{s.value}</dt>
                <dd className="body-copy text-lg">{s.label}</dd>
                <dd className="mono col-start-2 text-ink/55 sm:col-start-auto">{s.note}</dd>
              </div>
            ))}
          </dl>
          <a href="#philosophy" data-fade className="group mono mt-8 inline-flex items-center gap-2 self-start border-b border-ink pb-1">
            Read our philosophy
            <ArrowDownRight className="size-4 transition-transform duration-500 ease-expo group-hover:rotate-[-45deg]" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

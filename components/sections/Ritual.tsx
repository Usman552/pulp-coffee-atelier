"use client";

import { useRef } from "react";
import { ritualSteps } from "@/content/story";
import { useReveals } from "@/animations/useReveals";
import { useRitualPin } from "@/animations/useRitualPin";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Photo } from "@/components/ui/Photo";

export function Ritual() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  useRitualPin(ref, ritualSteps.length);

  return (
    <section id="ritual" ref={ref} data-nav="dark" className="relative bg-ink text-bone">
      <div className="gutter pb-16 pt-28 md:pb-20 md:pt-36">
        <ChapterHead num="02" label="The Coffee Experience" aside="The ritual — p. 02" tone="dark" />
        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
          <h2 data-split className="display text-[15vw] md:col-span-8 md:text-[8.2vw]">
            Twenty-eight seconds, <span className="serif-i text-crema">four</span> movements.
          </h2>
          <p data-fade className="body-copy self-end text-bone/75 md:col-span-3 md:col-start-10">
            Every espresso at the bar follows the same choreography. It looks effortless. It is not. Scroll to watch
            one shot, from dose to hand-off.
          </p>
        </div>
      </div>

      {/* Desktop: pinned stage */}
      <div data-ritual-stage className="gutter hidden h-[100svh] items-center gap-6 lg:motion-safe:grid lg:grid-cols-12">
        <ol className="col-span-4 self-center" aria-label="Espresso steps">
          {ritualSteps.map((s) => (
            <li key={s.num} data-ritual-title className="flex items-baseline gap-4 border-b border-bone/15 py-2">
              <span className="mono text-crema">{s.num}</span>
              <span className="display whitespace-nowrap text-[4.3vw] leading-[0.95]">
                {s.title} <span className="serif-i text-[0.42em] text-bone/70">{s.serif}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="relative col-span-5 h-[78svh] overflow-hidden">
          {ritualSteps.map((s, i) => (
            <Photo
              key={s.num}
              data-ritual-img
              src={s.image}
              alt={s.alt}
              sizes="42vw"
              className="!absolute inset-0"
              style={{ zIndex: i }}
            />
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-gradient-to-t from-ink/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-1.5" aria-hidden="true">
            {ritualSteps.map((s) => (
              <span key={s.num} className="h-[2px] flex-1 bg-bone/25">
                <span data-ritual-tick className="block h-full origin-left bg-bone" />
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-3 flex h-[78svh] flex-col justify-between">
          <div>
            <p className="mono text-bone/50">Shot timer</p>
            <p data-ritual-timer className="display mt-2 text-[6.4vw] tabular-nums text-crema" aria-hidden="true">
              00:00
            </p>
          </div>
          <div className="relative min-h-[14rem]">
            {ritualSteps.map((s) => (
              <div key={s.num} className="absolute inset-x-0 bottom-0">
                <p data-ritual-body className="body-copy text-lg leading-snug text-bone/85">
                  {s.body}
                </p>
                <ul data-ritual-spec className="mono mt-6 border-t border-bone/20 text-bone/60">
                  {s.spec.map((x) => (
                    <li key={x} className="border-b border-bone/20 py-2">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / reduced motion: editorial stack */}
      <ol className="gutter grid gap-16 pb-28 sm:grid-cols-2 sm:gap-x-6 lg:motion-safe:hidden">
        {ritualSteps.map((s, i) => (
          <li key={s.num} className={i % 2 ? "sm:mt-24" : ""}>
            <div className="overflow-hidden">
              <Photo data-reveal-img src={s.image} alt={s.alt} sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/5] w-full" />
            </div>
            <div className="mt-5 flex items-baseline gap-4">
              <span className="mono text-crema">{s.num}</span>
              <h3 className="display text-6xl">
                {s.title} <span className="serif-i text-[0.55em] text-bone/70">{s.serif}</span>
              </h3>
            </div>
            <p className="body-copy mt-3 text-bone/80">{s.body}</p>
            <p className="mono mt-4 text-bone/50">{s.spec.join(" · ")}</p>
          </li>
        ))}
      </ol>
      <div className="h-24 max-lg:hidden motion-reduce:hidden" aria-hidden="true" />
    </section>
  );
}

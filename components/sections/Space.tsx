"use client";

import { useRef } from "react";
import { img } from "@/content/images";
import { spaceDetails } from "@/content/story";
import { useReveals } from "@/animations/useReveals";
import { useRoomExpand } from "@/animations/useRoomExpand";
import { cn } from "@/lib/cn";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Photo } from "@/components/ui/Photo";

const roomNotes = [
  ["Floor", "120 m²"],
  ["Seats", "42 inside · 16 courtyard"],
  ["Walls", "Lime plaster, hand-trowelled"],
  ["Bar", "Recycled terrazzo, 7.2 m"],
  ["Sound", "Vinyl only, never loud"],
  ["Built", "1911 — a former print shop"],
];

const layout = [
  "md:col-span-7",
  "md:col-span-4 md:col-start-9 md:mt-40",
  "md:col-span-4 md:col-start-2 md:-mt-10",
  "md:col-span-6 md:col-start-7 md:mt-24",
];
const ratios = ["aspect-[16/10]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[16/11]"];

export function Space() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  useRoomExpand(ref);

  return (
    <section id="space" ref={ref} data-nav="light" className="relative bg-bone text-ink">
      <div className="gutter pb-12 pt-28 md:pt-36">
        <ChapterHead num="05" label="The Space" aside="The room — p. 05" />
        <h2 className="sr-only">The space</h2>
      </div>

      {/* Desktop: pinned expanding window. Mobile: a framed image with the type above. */}
      <div data-room-stage className="relative overflow-hidden lg:motion-safe:h-[100svh]">
        <div className="gutter relative z-10 flex flex-wrap items-baseline justify-between gap-x-6 pb-6 lg:motion-safe:pointer-events-none lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:items-center lg:motion-safe:pb-0">
          <p data-room-left className="display text-[17vw] text-ink lg:text-[11vw]">
            A room
          </p>
          <p data-room-right className="serif-i text-[12vw] leading-none text-pulp lg:text-[8vw]">
            for lingering
          </p>
        </div>

        <div className="gutter lg:motion-safe:px-0">
          <div
            data-room-frame
            data-reveal-img="mobile"
            data-nav="dark"
            className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:motion-safe:absolute lg:motion-safe:inset-0 lg:motion-safe:aspect-auto"
          >
            <Photo
              src={img.room}
              alt="The cafe's main room: long wooden tables, pendant lights and an open bar under an industrial ceiling"
              sizes="100vw"
              quality={80}
              className="size-full"
            />
            <div data-room-shade className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent lg:motion-safe:opacity-0" />
            <div data-room-caption className="absolute inset-x-0 bottom-0 grid gap-4 p-5 text-bone sm:p-8 lg:grid-cols-12 lg:p-[var(--gutter)] lg:pb-12">
              <p className="display text-5xl sm:text-6xl lg:col-span-6 lg:text-[6.5vw]">
                Built for <span className="serif-i text-crema">slow</span> mornings.
              </p>
              <p className="body-copy max-w-sm self-end text-sm text-bone/85 lg:col-span-4 lg:col-start-9 lg:text-base">
                Morning light from the north windows, one long oak table, no music before 9am and nobody asking you to
                leave.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plan-style details */}
      <div className="gutter pb-28 pt-24 md:pb-40 md:pt-36">
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <p data-fade className="mono text-ink/55">Room notes</p>
            <dl data-stagger className="mt-4 border-t border-ink/20">
              {roomNotes.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-ink/20 py-3">
                  <dt className="mono text-ink/55">{k}</dt>
                  <dd className="body-copy text-right text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p data-split className="serif-i text-4xl leading-[1.05] sm:text-5xl md:col-span-7 md:col-start-6 md:text-[3.8vw]">
            Four corners, four moods. Pick the one that matches yours — we&rsquo;ll bring the coffee over.
          </p>
        </div>

        <div className="mt-20 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          {spaceDetails.map((d, i) => (
            <figure key={d.code} className={cn(layout[i])}>
              <div className="overflow-hidden">
                <Photo data-reveal-img src={d.image} alt={d.alt} sizes="(min-width: 768px) 50vw, 100vw" className={cn(ratios[i], "w-full")} />
              </div>
              <figcaption className="mt-4 flex items-start gap-4">
                <span className="mono grid size-8 shrink-0 place-items-center border border-ink">{d.code}</span>
                <span>
                  <span className="display block text-3xl">{d.title}</span>
                  <span className="mono mt-1 block text-ink/55">{d.meta}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

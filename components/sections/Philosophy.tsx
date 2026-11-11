"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { philosophy } from "@/content/story";
import { useReveals } from "@/animations/useReveals";
import { useHorizontalTrack } from "@/animations/useHorizontalTrack";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Photo } from "@/components/ui/Photo";

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  useHorizontalTrack(ref);

  return (
    <section id="philosophy" ref={ref} data-nav="dark" className="relative bg-ink text-bone">
      <div data-h-pin className={`relative overflow-hidden lg:motion-safe:h-[100svh]`}>
        <div className="gutter pt-28 md:pt-36 lg:motion-safe:absolute lg:motion-safe:inset-x-0 lg:motion-safe:top-0 lg:motion-safe:z-10 lg:motion-safe:pt-24">
          <ChapterHead num="04" label="Our Philosophy" aside="Seed to cup — p. 04" tone="dark" />
        </div>

        <div
          data-h-track
          className={`flex flex-col gap-24 pb-28 pt-12 lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:items-stretch lg:motion-safe:gap-0 lg:motion-safe:pb-0 lg:motion-safe:pt-0`}
        >
          {/* Intro panel */}
          <div className={`gutter flex shrink-0 flex-col justify-end lg:motion-safe:w-[58vw] lg:motion-safe:pb-[14svh]`}>
            <h2 className="display text-[19vw] leading-[0.8] lg:text-[10.5vw]">
              <span data-split className="block">
                From <span className="outline-text">seed</span>
              </span>
              <span data-split className="block">
                to <span className="serif-i text-pulp">cup.</span>
              </span>
            </h2>
            <p data-fade className="body-copy mt-8 max-w-md text-bone/75">
              A great cup is decided long before it reaches the bar. These are the four decisions we refuse to
              compromise on — and the reason our coffee tastes the way it does.
            </p>
            <p className="mono mt-10 hidden items-center gap-3 text-bone/50 lg:motion-safe:flex">
              Keep scrolling <span className="h-px w-16 bg-bone/40" />
            </p>
          </div>

          {philosophy.map((p, i) => (
            <article
              key={p.num}
              className={`gutter grid shrink-0 gap-8 md:grid-cols-2 md:items-end lg:motion-safe:w-[72vw] lg:motion-safe:grid-cols-[1fr_27vw] lg:motion-safe:gap-12 lg:motion-safe:pb-[12svh] lg:motion-safe:pt-[20svh] lg:motion-safe:border-l lg:motion-safe:border-bone/10`}
            >
              <div className={i % 2 ? `md:order-2 lg:motion-safe:order-none` : ""}>
                <p data-h-num className="display outline-text text-[34vw] leading-[0.75] text-bone/45 md:text-[22vw] lg:text-[14vw]" aria-hidden="true">
                  {p.num}
                </p>
                <h3 className="display mt-4 text-7xl lg:text-[6vw]">{p.title}</h3>
                <p className="serif-i mt-2 text-3xl text-crema lg:text-[2.4vw]">{p.lede}</p>
                <p className="body-copy mt-6 max-w-md text-bone/75">{p.body}</p>
                <dl className="mt-8 max-w-md border-t border-bone/15">
                  {p.facts.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-b border-bone/15 py-2.5">
                      <dt className="mono text-bone/50">{k}</dt>
                      <dd className="mono text-bone">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className={`relative overflow-hidden lg:motion-safe:h-[68svh]`}>
                <div data-h-parallax className={`relative aspect-[4/5] w-full lg:motion-safe:absolute lg:motion-safe:-inset-x-[10%] lg:motion-safe:inset-y-0 lg:motion-safe:aspect-auto lg:motion-safe:w-auto`}>
                  <Photo src={p.image} alt={p.alt} sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw" className="size-full" />
                </div>
              </div>
            </article>
          ))}

          {/* Closing panel */}
          <div className={`gutter flex shrink-0 flex-col justify-center lg:motion-safe:w-[60vw] lg:motion-safe:border-l lg:motion-safe:border-bone/10`}>
            <blockquote>
              <p data-split className="serif-i text-5xl leading-[1.02] md:text-7xl lg:text-[5vw]">
                &ldquo;Precision is where craft begins — not where it ends.&rdquo;
              </p>
              <footer className="mono mt-6 text-bone/50">Ana Ruiz, head roaster</footer>
            </blockquote>
            <a href="#menu" className="group mono mt-12 inline-flex items-center gap-2 self-start border-b border-bone pb-1">
              Taste the current lot
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:rotate-45" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="gutter absolute inset-x-0 bottom-8 hidden lg:motion-safe:block" aria-hidden="true">
          <div className="h-px w-full bg-bone/15">
            <div data-h-progress className="h-full origin-left scale-x-0 bg-pulp" />
          </div>
        </div>
      </div>
    </section>
  );
}

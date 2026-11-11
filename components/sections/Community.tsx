"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { useSite } from "@/components/providers/SiteProvider";
import { brand } from "@/content/brand";
import { img } from "@/content/images";
import { programme } from "@/content/story";
import { useReveals } from "@/animations/useReveals";
import { useMarquee } from "@/animations/useMarquee";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Photo } from "@/components/ui/Photo";

const people = ["Friends", "Freelancers", "Filmmakers", "First dates", "Coffee nerds", "Neighbours"];
const people2 = ["Night owls", "Writers", "Dog people", "Early risers", "Students", "Architects"];

function MarqueeRow({ words, serifEvery = 2 }: { words: string[]; serifEvery?: number }) {
  return (
    <>
      {[0, 1].map((half) => (
        <span key={half} className="flex shrink-0 items-center" aria-hidden={half === 1 || undefined}>
          {words.map((w, i) => (
            <Fragment key={w}>
              <span className={i % serifEvery === 1 ? "serif-i px-[0.18em] text-pulp" : "px-[0.18em]"}>{w}</span>
              <span className="px-[0.18em] text-[0.4em] text-ink/30">✳</span>
            </Fragment>
          ))}
        </span>
      ))}
    </>
  );
}

const instagram = [
  { src: img.insta1, alt: "Latte, croissant and laptop on a wooden table" },
  { src: img.insta2, alt: "Three of the PULP team on a break in aprons" },
  { src: img.insta3, alt: "A busy afternoon at the bar" },
  { src: img.insta4, alt: "Close-up of freshly roasted beans" },
];

export function Community() {
  const ref = useRef<HTMLElement>(null);
  const { openReserve } = useSite();
  useReveals(ref);
  useMarquee(ref);

  return (
    <section id="community" ref={ref} data-nav="light" className="relative overflow-hidden bg-bone pb-28 pt-28 text-ink md:pb-40 md:pt-36">
      <div className="gutter">
        <ChapterHead num="07" label="Community & Culture" aside="Regulars — p. 07" />
      </div>

      <h2 className="sr-only">Community and culture: who comes to PULP</h2>
      <div className="mt-12 select-none md:mt-16" aria-label={`For ${people.concat(people2).join(", ")}`}>
        <div data-marquee data-duration="38" className="display flex w-max whitespace-nowrap text-[17vw] leading-[0.95] md:text-[11vw]">
          <MarqueeRow words={people} />
        </div>
        <div data-marquee data-direction="-1" data-duration="46" className="display outline-text flex w-max whitespace-nowrap text-[10vw] leading-[1] text-ink/70 md:text-[6vw]">
          <MarqueeRow words={people2} serifEvery={99} />
        </div>
      </div>

      <div className="gutter mt-20 grid gap-16 md:mt-28 lg:grid-cols-12 lg:gap-6">
        {/* Collage */}
        <div className="relative lg:col-span-6">
          <div className="grid grid-cols-6 gap-3 lg:block">
            <div className="col-span-4 overflow-hidden lg:w-[72%]">
              <Photo data-reveal-img src={img.barista} alt="A smiling barista working the espresso machine" sizes="(min-width: 1024px) 34vw, 66vw" className="aspect-[4/5] w-full" />
            </div>
            <div className="col-span-2 self-end overflow-hidden lg:absolute lg:right-0 lg:top-[8%] lg:w-[34%]">
              <Photo data-reveal-img src={img.server} alt="A server smiling with a fresh croissant" sizes="(min-width: 1024px) 16vw, 33vw" className="aspect-[3/4] w-full" />
            </div>
            <div data-parallax="0.15" className="col-span-6 overflow-hidden lg:absolute lg:-bottom-[12%] lg:right-[6%] lg:w-[52%]">
              <Photo data-reveal-img src={img.friends} alt="Three friends laughing over laptops at a cafe table" sizes="(min-width: 1024px) 26vw, 100vw" className="aspect-[4/3] w-full" />
            </div>
          </div>
          <p className="mono mt-4 text-ink/55 lg:hidden">Fig. 11 — Mika on bar; Thursday regulars</p>
        </div>

        {/* Programme */}
        <div className="lg:col-span-5 lg:col-start-8">
          <p data-split className="display text-6xl sm:text-7xl lg:text-[5.4vw]">
            More than a <span className="serif-i text-pulp">coffee</span> stop.
          </p>
          <p data-fade className="body-copy mt-6 max-w-md text-ink/75">
            Half our customers know each other by name. The other half will soon. Every week, the room hosts
            something — and there&rsquo;s always a seat saved for you.
          </p>

          <figure data-fade className="mt-10 border-l-2 border-pulp pl-5">
            <blockquote className="serif-i text-2xl leading-snug sm:text-3xl">
              &ldquo;The only place I can write and actually finish. The baristas know my order and my deadline.&rdquo;
            </blockquote>
            <figcaption className="mono mt-3 text-ink/55">Maya O., novelist — regular since 2021</figcaption>
          </figure>

          <h3 className="mono mt-14 text-ink/55">This week at {brand.name}</h3>
          <ul data-stagger className="mt-3 border-t border-ink/20">
            {programme.map((p) => (
              <li key={p.title} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-b border-ink/20 py-4">
                <span className="mono leading-tight">
                  {p.day}
                  <br />
                  <span className="text-ink/50">{p.time}</span>
                </span>
                <span>
                  <span className="display block text-3xl">{p.title}</span>
                  <span className="body-copy block text-sm text-ink/65">{p.body}</span>
                </span>
                <button
                  type="button"
                  onClick={() => openReserve({ note: `Saving a seat for ${p.occasion}.` })}
                  className="group grid size-11 place-items-center border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                  aria-label={`Save a seat for ${p.title}`}
                >
                  <Plus className="size-4 transition-transform duration-500 ease-expo group-hover:rotate-90" strokeWidth={1.5} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instagram strip */}
      <div className="gutter mt-24 md:mt-36">
        <div className="flex items-end justify-between gap-4 border-b border-ink/20 pb-3">
          <p className="mono text-ink/55">Tag us — {brand.instagram.handle}</p>
          <a href={brand.instagram.href} target="_blank" rel="noopener noreferrer" className="group mono inline-flex items-center gap-2">
            <InstagramIcon className="size-4" strokeWidth={1.5} />
            Instagram<span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
          {instagram.map((p) => (
            <li key={p.src}>
              <a href={brand.instagram.href} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden" aria-label={`${p.alt} — view on Instagram`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 25vw, 50vw" quality={70} className="object-cover transition-transform duration-[1.2s] ease-expo group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-pulp/0 text-bone opacity-0 transition-all duration-500 group-hover:bg-pulp/70 group-hover:opacity-100">
                  <InstagramIcon className="size-7" strokeWidth={1.25} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useSite } from "@/components/providers/SiteProvider";
import { brand } from "@/content/brand";
import { img } from "@/content/images";
import { useHeroIntro } from "@/animations/useHeroIntro";
import { Photo } from "@/components/ui/Photo";
import { Cta } from "@/components/ui/Cta";

const LETTERS = brand.name.split("");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { introDone, openReserve } = useSite();
  useHeroIntro(ref, introDone);

  return (
    <section
      id="top"
      ref={ref}
      data-nav="dark"
      aria-label="PULP Coffee Atelier — cover"
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink text-bone"
    >
      {/* Cinematic background */}
      <div data-hero-bg-wrap className="absolute inset-0">
        <div data-hero-bg className="absolute inset-0 will-change-transform">
          <Photo
            src={img.heroPour}
            alt="Espresso streaming from a machine into two dark ceramic cups"
            sizes="100vw"
            preload
            quality={80}
            className="size-full"
            imgClassName="object-[50%_40%]"
          />
        </div>
      </div>
      <div
        data-hero-shade
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(18,17,16,.82)_0%,rgba(18,17,16,.35)_55%,rgba(18,17,16,.15)_100%),linear-gradient(0deg,rgba(18,17,16,.9)_0%,rgba(18,17,16,0)_45%)] opacity-100"
      />

      {/* Cover meta */}
      <div className="gutter absolute inset-x-0 top-[4.75rem] flex justify-between sm:top-24">
        <p data-hero-fade className="mono text-bone/70">
          Issue Nº {brand.issue.number}
          <span className="hidden sm:inline"> — {brand.issue.title} {brand.issue.year}</span>
        </p>
        <p data-hero-fade className="mono hidden text-right text-bone/70 md:block">
          {brand.coordinates.label}
          <br />
          Est. {brand.established}
        </p>
      </div>

      {/* Off-grid portrait inset */}
      <div
        data-hero-inset-wrap
        className="absolute right-[var(--gutter)] top-[7.5rem] z-20 w-[42vw] max-w-[22rem] sm:top-[8.5rem] md:right-[9vw] md:top-[17vh] md:w-[21vw]"
      >
        <Photo
          data-hero-inset
          src={img.heroInset}
          alt="A barista pouring latte art into a glass cup"
          sizes="(min-width: 768px) 22vw, 45vw"
          preload
          className="aspect-[3/4] w-full"
        />
        <p data-hero-fade className="mono mt-3 hidden justify-between text-bone/70 sm:flex">
          <span>Fig. 01</span>
          <span>The pour, 06:42</span>
        </p>
      </div>

      {/* Headline + actions */}
      <div className="gutter absolute inset-x-0 bottom-[calc(min(44vw,62svh)*0.73+1rem)] z-20 md:bottom-auto md:top-[17vh]">
        <p className="display text-[13vw] leading-[0.86] sm:text-[9vw] md:text-[clamp(3.25rem,min(6.2vw,10svh),7rem)]">
          <span data-hero-line className="block">
            Coffee is
          </span>
          <span data-hero-line className="block">
            a <span className="serif-i text-crema">fruit.</span>
          </span>
        </p>
        <p data-hero-fade className="body-copy mt-5 hidden max-w-[22rem] text-[0.95rem] xs:block text-bone/80 md:max-w-sm">
          Single-farm coffee roasted light, croissants laminated over three days, and a room built for lingering.
          {" "}{brand.address.district}, since {brand.established}.
        </p>
        <div data-hero-fade className="mt-7 flex flex-wrap items-center gap-3">
          <Cta label="Reserve a table" onClick={() => openReserve()} />
          <Cta label="Find us" href="#visit" variant="outline-bone" />
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#manifesto"
        data-hero-fade
        className="group mono absolute right-[var(--gutter)] top-1/2 z-10 hidden -translate-y-1/2 items-center gap-3 text-bone/70 [writing-mode:vertical-rl] lg:flex"
      >
        Scroll — 01 Manifesto
        <ArrowDown className="size-4 transition-transform duration-500 ease-expo group-hover:translate-y-1" strokeWidth={1.5} />
      </a>

      {/* Oversized wordmark filled with crema */}
      <h1 data-hero-word className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] select-none px-[1.5vw]" aria-label={brand.fullName}>
        <span className="display flex justify-between text-[min(44vw,62svh)] leading-[0.73] translate-y-[3%]" aria-hidden="true">
          {LETTERS.map((l, i) => (
            <span key={i} className="block overflow-hidden pt-[0.04em]">
              <span
                data-hero-letter
                className="crema-fill block"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(238,232,221,.05), rgba(18,17,16,.25)), url(${img.cremaTexture})`,
                  backgroundSize: `${LETTERS.length * 100}% 120%`,
                  backgroundPosition: `${(i / (LETTERS.length - 1)) * 100}% 40%`,
                }}
              >
                {l}
              </span>
            </span>
          ))}
        </span>
      </h1>
    </section>
  );
}

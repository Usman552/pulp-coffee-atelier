"use client";

import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { brand, chapters, getOpenStatus } from "@/content/brand";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { cn } from "@/lib/cn";
import { useNow } from "@/lib/useNow";
import { RollText } from "@/components/ui/RollText";

/**
 * Corner-composed navigation. Colour follows whichever chapter sits under it
 * (regions declare data-nav="dark" | "light"); hides on scroll down, returns on scroll up.
 */
export function Nav() {
  const { openReserve, setIndexOpen, indexOpen } = useSite();
  const now = useNow();
  const status = now ? getOpenStatus(now) : null;
  const ref = useRef<HTMLElement>(null);
  const [tone, setTone] = useState<"dark" | "light">("dark");

  useGSAP(() => {
    // Colour follows whatever chapter is physically under the bar (handles pins, clips, nesting).
    let queued = false;
    const detect = () => {
      queued = false;
      const header = ref.current;
      for (const el of document.elementsFromPoint(window.innerWidth / 2, 30)) {
        if (header?.contains(el)) continue;
        const host = (el as HTMLElement).closest<HTMLElement>("[data-nav]");
        if (host) {
          setTone(host.dataset.nav === "light" ? "light" : "dark");
          return;
        }
      }
    };
    const queue = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(detect);
    };

    const show = gsap.quickTo(ref.current, "yPercent", { duration: 0.6, ease: "expo.out" });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onRefresh: queue,
      onUpdate: (self) => {
        queue();
        if (self.scroll() < 200) return show(0);
        show(self.direction === 1 ? -110 : 0);
      },
    });
    queue();
  });

  const light = tone === "light";

  return (
    <header
      ref={ref}
      className={cn(
        "gutter fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4 transition-colors duration-500 sm:py-5",
        light ? "text-ink" : "text-bone",
      )}
    >
      <a href="#top" className="group flex items-baseline gap-3" aria-label={`${brand.fullName} — back to the cover`}>
        <span className="display text-[1.9rem] leading-none">
          {brand.name}
          <sup className="mono ml-0.5 !text-[0.55rem] align-super">®</sup>
        </span>
        <span className="mono hidden opacity-70 md:inline">Coffee Atelier</span>
      </a>

      <div className="mono hidden items-center gap-8 lg:flex">
        <span className="opacity-70">
          Issue Nº {brand.issue.number} — {brand.issue.title}
        </span>
        <a href="#visit" className="group flex items-center gap-2" aria-live="polite">
          <span
            className={cn(
              "relative size-2 rounded-full",
              status?.isOpen ? "bg-crema" : "bg-concrete",
              status?.isOpen && "after:absolute after:inset-0 after:animate-ping after:rounded-full after:bg-crema",
            )}
            aria-hidden="true"
          />
          <RollText>{status?.label ?? "Hours & location"}</RollText>
        </a>
      </div>

      <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-6">
        <ul className="mono hidden items-center gap-6 xl:flex">
          {chapters.slice(3, 4).concat(chapters.slice(8, 9)).map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} className="group">
                <RollText>{c.label === "The List" ? "Menu" : c.label}</RollText>
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => openReserve()}
          className={cn(
            "group mono hidden h-10 items-center border px-4 transition-colors sm:flex",
            light ? "border-ink/30 hover:bg-ink hover:text-bone" : "border-bone/30 hover:bg-bone hover:text-ink",
          )}
        >
          <RollText>Reserve</RollText>
        </button>
        <button
          type="button"
          onClick={() => setIndexOpen(true)}
          aria-expanded={indexOpen}
          aria-controls="index-menu"
          className="group mono flex h-10 items-center gap-3 pl-2"
        >
          <RollText>Index</RollText>
          <span className="opacity-60">({String(chapters.length).padStart(2, "0")})</span>
          <span className="flex w-6 flex-col gap-[5px]" aria-hidden="true">
            <span className="h-px w-full bg-current transition-transform duration-500 ease-expo group-hover:scale-x-50 origin-right" />
            <span className="h-px w-full bg-current transition-transform duration-500 ease-expo group-hover:scale-x-75 origin-right" />
          </span>
        </button>
      </nav>
    </header>
  );
}

"use client";

import { useRef, useState } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { brand } from "@/content/brand";
import { gsap, prefersReducedMotion, useGSAP } from "@/animations/gsap";
import { cn } from "@/lib/cn";

/** Opening curtain: a counter runs while fonts settle, then the cover splits open. */
export function Preloader() {
  const { completeIntro } = useSite();
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        completeIntro();
        setGone(true);
        return;
      }
      const counter = { v: 0 };
      const num = root.current!.querySelector<HTMLElement>("[data-count]")!;
      const fontsReady = document.fonts?.ready ?? Promise.resolve();

      const tl = gsap.timeline({ paused: true });
      tl.from("[data-pl-line]", { yPercent: 110, duration: 0.9, stagger: 0.08 })
        .to(
          counter,
          {
            v: 100,
            duration: 1.5,
            ease: "power3.inOut",
            onUpdate: () => {
              num.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.1,
        )
        .to("[data-pl-bar]", { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 0.1)
        .to("[data-pl-content]", { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" })
        .add(() => completeIntro(), "-=0.05")
        .to("[data-pl-top]", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "<")
        .to("[data-pl-bottom]", { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<")
        .add(() => setGone(true));

      // never hold the visitor longer than ~3s, even on slow font loads
      Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(() => tl.play());
    },
    { scope: root },
  );

  // stays mounted (hidden) so its GSAP context never reverts against a missing node
  return (
    <div ref={root} data-preloader className={cn("fixed inset-0 z-[95] text-bone", gone && "hidden")} aria-hidden="true">
      <div data-pl-top className="absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div data-pl-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-ink" />
      <div data-pl-content className="gutter absolute inset-0 flex flex-col justify-between py-6 sm:py-8">
        <div className="flex justify-between">
          <span className="block overflow-hidden">
            <span data-pl-line className="mono block text-bone/70">
              {brand.fullName}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-pl-line className="mono block text-bone/70">
              Issue Nº {brand.issue.number}
            </span>
          </span>
        </div>
        <div>
          <span className="block overflow-hidden">
            <span data-pl-line className="serif-i block text-3xl text-bone/80 sm:text-5xl">
              {brand.issue.title}, {brand.issue.year}
            </span>
          </span>
          <div className="mt-4 flex items-end justify-between gap-6">
            <span className="block overflow-hidden">
              <span data-pl-line data-count className="display block text-[28vw] leading-[0.8] text-pulp sm:text-[18vw]">
                000
              </span>
            </span>
            <span className="mono mb-3 hidden text-bone/60 sm:block">Brewing the cover</span>
          </div>
          <div data-pl-bar className="mt-4 h-px origin-left scale-x-0 bg-bone/50" />
        </div>
      </div>
    </div>
  );
}

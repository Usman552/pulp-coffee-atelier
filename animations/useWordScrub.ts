"use client";

import type { RefObject } from "react";
import { gsap, MOTION, scheduleRefresh, SplitText, useGSAP } from "./gsap";
import { useFontsReady } from "./useFontsReady";

/** Words ink themselves in as the statement scrolls through the viewport; inline photos unfold. */
export function useWordScrub(scope: RefObject<HTMLElement | null>) {
  const fontsReady = useFontsReady();
  useGSAP(
    () => {
      if (!fontsReady) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const target = scope.current?.querySelector<HTMLElement>("[data-scrub]");
        if (!target) return;
        const st = { trigger: target, start: "top 82%", end: "bottom 45%", scrub: 0.6 };

        // words don't depend on line width, so no re-split is needed on resize
        const split = SplitText.create(target, { type: "words" });
        gsap.fromTo(split.words, { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: st });

        gsap.utils.toArray<HTMLElement>("[data-inline-img]", target).forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 50% 0% 50%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", end: "top 55%", scrub: 0.6 },
            },
          );
        });
        scheduleRefresh();
      });
    },
    { scope, dependencies: [fontsReady] },
  );
}

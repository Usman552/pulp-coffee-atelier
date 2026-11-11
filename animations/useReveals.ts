"use client";

import type { RefObject } from "react";
import { gsap, MOTION, scheduleRefresh, SplitText, useGSAP } from "./gsap";
import { useFontsReady } from "./useFontsReady";

/**
 * Declarative reveal system. Content components only add data attributes;
 * this hook owns all of the motion.
 *
 *  data-split            → headline lines rise from a mask
 *  data-fade             → soft rise + fade
 *  data-stagger          → direct children rise in sequence
 *  data-reveal-img       → clip-path wipe with the inner media settling from scale
 *                          (="mobile": only below 1024px, where no pinned scene takes over)
 *  data-parallax="0.12"  → scrubbed vertical drift (positive = slower than scroll)
 */
export function useReveals(scope: RefObject<HTMLElement | null>) {
  const fontsReady = useFontsReady();
  useGSAP(
    () => {
      if (!fontsReady) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        // Ignore anything not rendered at this breakpoint (display:none parents). Their
        // zero-size boxes would make `once` triggers fire and self-destruct mid-refresh.
        const visible = (el: HTMLElement) => el.getClientRects().length > 0;
        const sel = gsap.utils.selector(scope);
        const q = (s: string) => (sel(s) as HTMLElement[]).filter(visible);

        q("[data-split]").forEach((el: HTMLElement) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          gsap.from(split.lines, {
            yPercent: 112,
            duration: 1.25,
            stagger: 0.09,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            // restore natural text afterwards so line breaks stay correct on resize
            onComplete: () => split.revert(),
          });
        });

        q("[data-fade]").forEach((el: HTMLElement) => {
          gsap.from(el, {
            y: 28,
            autoAlpha: 0,
            duration: 1.2,
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        q("[data-stagger]").forEach((el: HTMLElement) => {
          gsap.from(el.children, {
            y: 32,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.07,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        q("[data-reveal-img]").forEach((el: HTMLElement) => {
          // "mobile" reveals hand over to a dedicated desktop choreography
          if (el.dataset.revealImg === "mobile" && desktop) return;
          const media = el.querySelector("img");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
          tl.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
          );
          if (media) tl.from(media, { scale: 1.3, duration: 1.8, ease: "expo.out" }, 0.15);
        });

        q("[data-parallax]").forEach((el: HTMLElement) => {
          const speed = Number(el.dataset.parallax || 0.1);
          gsap.fromTo(
            el,
            { yPercent: -speed * 100 },
            {
              yPercent: speed * 100,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
        scheduleRefresh();
      });
    },
    { scope, dependencies: [fontsReady] },
  );
}

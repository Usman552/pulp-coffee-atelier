"use client";

import type { RefObject } from "react";
import { DESKTOP_MOTION, gsap, useGSAP } from "./gsap";

/** Pins a viewport and converts vertical scroll into a horizontal journey along its track. */
export function useHorizontalTrack(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const q = gsap.utils.selector(scope);
        const pinEl = q("[data-h-pin]")[0];
        const track = q("[data-h-track]")[0];
        const bar = q("[data-h-progress]")[0];
        if (!pinEl || !track) return;

        const distance = () => track.scrollWidth - window.innerWidth;

        const move = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.9,
            invalidateOnRefresh: true,
            onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
          },
        });

        q("[data-h-parallax]").forEach((el: HTMLElement) => {
          gsap.fromTo(
            el,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                containerAnimation: move,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        q("[data-h-num]").forEach((el: HTMLElement) => {
          gsap.from(el, {
            yPercent: 40,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              containerAnimation: move,
              start: "left 90%",
              end: "left 40%",
              scrub: true,
            },
          });
        });
      });
    },
    { scope },
  );
}

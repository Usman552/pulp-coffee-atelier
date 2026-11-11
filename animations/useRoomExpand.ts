"use client";

import type { RefObject } from "react";
import { DESKTOP_MOTION, gsap, useGSAP } from "./gsap";

/** A framed window onto the room that opens to full-bleed as the visitor scrolls in. */
export function useRoomExpand(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const q = gsap.utils.selector(scope);
        const stage = q("[data-room-stage]")[0];
        if (!stage) return;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo("[data-room-frame]", { clipPath: "inset(22% 35% 22% 35%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0)
          .fromTo("[data-room-frame] img", { scale: 1.35 }, { scale: 1, duration: 1 }, 0)
          .to("[data-room-left]", { xPercent: -60, autoAlpha: 0, duration: 0.7 }, 0)
          .to("[data-room-right]", { xPercent: 60, autoAlpha: 0, duration: 0.7 }, 0)
          .fromTo("[data-room-shade]", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6)
          .from("[data-room-caption] > *", { y: 30, autoAlpha: 0, stagger: 0.08, duration: 0.35 }, 0.7)
          .to({}, { duration: 0.25 });
      });
    },
    { scope },
  );
}

"use client";

import type { RefObject } from "react";
import { gsap, MOTION, ScrollTrigger, useGSAP } from "./gsap";

/**
 * Infinite type marquees ([data-marquee] with two identical halves). They drift on
 * their own and surge with scroll velocity; data-direction="-1" runs in reverse.
 */
export function useMarquee(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-marquee]", scope.current);
        const tweens = rows.map((row) => {
          const dir = Number(row.dataset.direction ?? 1);
          return gsap.fromTo(
            row,
            { xPercent: dir > 0 ? 0 : -50 },
            { xPercent: dir > 0 ? -50 : 0, duration: Number(row.dataset.duration ?? 40), ease: "none", repeat: -1 },
          );
        });

        ScrollTrigger.create({
          trigger: scope.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => tweens.forEach((t) => (self.isActive ? t.play() : t.pause())),
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 4);
            tweens.forEach((t) => {
              gsap.killTweensOf(t, "timeScale");
              t.timeScale(boost);
              gsap.to(t, { timeScale: 1, duration: 1.2, ease: "power2.out" });
            });
          },
        });
      });
    },
    { scope },
  );
}

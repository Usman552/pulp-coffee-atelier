"use client";

import type { RefObject } from "react";
import { DESKTOP_MOTION, gsap, useGSAP } from "./gsap";

/**
 * Pins the ritual stage and scrubs through its steps: each new photograph
 * wipes up over the last, titles hand over, and the shot timer runs 00 → 28s.
 */
export function useRitualPin(scope: RefObject<HTMLElement | null>, steps: number, seconds = 28) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const q = gsap.utils.selector(scope);
        const stage = q("[data-ritual-stage]")[0];
        const timer = q("[data-ritual-timer]")[0];
        if (!stage) return;

        const images = q("[data-ritual-img]");
        const titles = q("[data-ritual-title]");
        const bodies = q("[data-ritual-body]");
        const specs = q("[data-ritual-spec]");
        const ticks = q("[data-ritual-tick]");

        gsap.set(images.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set([...bodies.slice(1), ...specs.slice(1)], { autoAlpha: 0, y: 24 });
        gsap.set(titles.slice(1), { opacity: 0.18 });
        gsap.set(ticks.slice(1), { scaleX: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: 1 },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * (steps - 0.4)}`,
            pin: true,
            scrub: 0.8,
            snap: { snapTo: "labelsDirectional", duration: { min: 0.3, max: 0.8 }, delay: 0.05, ease: "power2.inOut" },
            invalidateOnRefresh: true,
          },
        });

        tl.addLabel("s0");
        for (let i = 1; i < steps; i++) {
          const at = i - 1 + 0.15;
          tl.to(images[i], { clipPath: "inset(0% 0% 0% 0%)" }, at)
            .fromTo(images[i].querySelector("img"), { scale: 1.25 }, { scale: 1 }, at)
            .to(titles[i - 1], { opacity: 0.18 }, at)
            .to(titles[i], { opacity: 1 }, at)
            .to([bodies[i - 1], specs[i - 1]], { autoAlpha: 0, y: -24, duration: 0.5 }, at)
            .to([bodies[i], specs[i]], { autoAlpha: 1, y: 0, duration: 0.6 }, at + 0.4)
            .to(ticks[i], { scaleX: 1 }, at)
            .addLabel(`s${i}`, i);
        }

        const clock = { s: 0 };
        tl.to(
          clock,
          {
            s: seconds,
            ease: "none",
            duration: steps - 1,
            onUpdate: () => {
              if (timer) timer.textContent = `00:${String(Math.round(clock.s)).padStart(2, "0")}`;
            },
          },
          0,
        );
      });
    },
    { scope },
  );
}

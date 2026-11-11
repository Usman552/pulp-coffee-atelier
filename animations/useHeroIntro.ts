"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap, MOTION, SplitText, useGSAP } from "./gsap";

/**
 * Cover choreography: built (and hidden) on mount, played the moment the
 * preloader curtain opens. Adds a slow cinematic drift and a scroll-away.
 */
export function useHeroIntro(scope: RefObject<HTMLElement | null>, play: boolean) {
  const tl = useRef<gsap.core.Timeline | null>(null);
  const shouldPlay = useRef(play);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const split = SplitText.create("[data-hero-line]", { type: "lines", mask: "lines" });

        const t = gsap.timeline({ paused: true });
        t.fromTo("[data-hero-bg]", { scale: 1.35 }, { scale: 1.06, duration: 2.6, ease: "expo.out" }, 0)
          .from("[data-hero-letter]", { yPercent: 108, duration: 1.7, stagger: 0.09, ease: "expo.out" }, 0.15)
          .fromTo(
            "[data-hero-inset]",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
            0.35,
          )
          .from("[data-hero-inset] img", { scale: 1.45, duration: 2.2, ease: "expo.out" }, 0.6)
          .from(split.lines, { yPercent: 110, duration: 1.3, stagger: 0.1, onComplete: () => split.revert() }, 0.55)
          .from("[data-hero-fade]", { y: 18, autoAlpha: 0, duration: 1.1, stagger: 0.06 }, 0.9)
          // slow, breathing drift once settled
          .to("[data-hero-bg]", { scale: 1, duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1 }, 2.6);
        tl.current = t;
        if (shouldPlay.current) t.play();

        // scroll-away parallax
        const st = { trigger: scope.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-bg-wrap]", { yPercent: 22, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-inset-wrap]", { yPercent: -28, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-word]", { yPercent: 18, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-shade]", { opacity: 0.85, ease: "none", scrollTrigger: st });

        return () => {
          tl.current = null;
        };
      });
    },
    { scope },
  );

  useEffect(() => {
    shouldPlay.current = play;
    if (play) tl.current?.play();
  }, [play]);
}

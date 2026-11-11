"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "./gsap";

/**
 * Floating preview that trails the pointer across an area (fine pointers only).
 * Returns nothing — visibility is driven by the `active` flag.
 */
export function useCursorFollow(
  area: RefObject<HTMLElement | null>,
  follower: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    const zone = area.current;
    const el = follower.current;
    if (!zone || !el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const xTo = gsap.quickTo(el, "x", { duration: reduced ? 0 : 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: reduced ? 0 : 0.7, ease: "power3.out" });
    const rTo = gsap.quickTo(el, "rotation", { duration: 0.9, ease: "power3.out" });
    let lastX = 0;
    let settle: ReturnType<typeof setTimeout> | undefined;

    const move = (e: PointerEvent) => {
      xTo(e.clientX - el.offsetWidth / 2);
      yTo(e.clientY - el.offsetHeight / 2);
      if (!reduced) rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
      lastX = e.clientX;
      clearTimeout(settle);
      settle = setTimeout(() => rTo(0), 120);
    };
    zone.addEventListener("pointermove", move);
    return () => {
      clearTimeout(settle);
      zone.removeEventListener("pointermove", move);
    };
  }, [area, follower]);

  useEffect(() => {
    const el = follower.current;
    if (!el) return;
    gsap.to(el, {
      autoAlpha: active ? 1 : 0,
      scale: active ? 1 : 0.85,
      duration: 0.45,
      ease: active ? "expo.out" : "power2.out",
      overwrite: "auto",
    });
  }, [active, follower]);
}

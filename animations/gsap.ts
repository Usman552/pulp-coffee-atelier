"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/** Any motion at all. */
export const MOTION = "(prefers-reduced-motion: no-preference)";
/** Heavy, pinned scroll storytelling — desktop pointer devices only. */
export const DESKTOP_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
export const REDUCED = "(prefers-reduced-motion: reduce)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED).matches;

/**
 * Triggers created asynchronously (after fonts load) are registered out of page
 * order; re-sort by position and re-measure once things settle.
 */
let settleId: ReturnType<typeof setTimeout> | undefined;
export function scheduleRefresh() {
  clearTimeout(settleId);
  settleId = setTimeout(() => {
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  }, 120);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

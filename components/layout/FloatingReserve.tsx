"use client";

import { useRef } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { useMagnetic } from "@/animations/useMagnetic";

/** Rotating seal CTA. Appears after the cover, steps aside for the Visit chapter and footer. */
export function FloatingReserve() {
  const { openReserve } = useSite();
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  useMagnetic(btn, 0.35);

  useGSAP(() => {
    const el = wrap.current!;
    gsap.set(el, { autoAlpha: 0, scale: 0.6 });
    let visible = false;
    const show = (v: boolean) => {
      if (v === visible) return;
      visible = v;
      gsap.to(el, { autoAlpha: v ? 1 : 0, scale: v ? 1 : 0.6, duration: 0.6, ease: v ? "back.out(1.7)" : "power2.in", overwrite: true });
    };

    const update = () => {
      const y = window.scrollY;
      const visit = document.getElementById("visit");
      const visitTop = visit ? visit.getBoundingClientRect().top + y : Infinity;
      show(y > window.innerHeight * 0.8 && y + window.innerHeight * 0.6 < visitTop);
    };
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: update, onRefresh: update, refreshPriority: -1 });
  });

  return (
    <div ref={wrap} className="invisible fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <button
        ref={btn}
        type="button"
        onClick={() => openReserve()}
        className="group relative grid size-[5.5rem] place-items-center rounded-full bg-pulp text-bone shadow-[0_10px_40px_-10px_rgba(194,48,28,0.7)] transition-colors hover:bg-ink sm:size-28"
        aria-label="Reserve a table"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_14s_linear_infinite]" aria-hidden="true">
          <defs>
            <path id="seal-path" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
          </defs>
          <text className="fill-current" style={{ fontFamily: "var(--font-mono)", fontSize: 9.2, letterSpacing: 2.6 }}>
            <textPath href="#seal-path">RESERVE A TABLE · RESERVE A TABLE · </textPath>
          </text>
        </svg>
        <span className="display text-2xl transition-transform duration-500 ease-expo group-hover:scale-125 sm:text-3xl" aria-hidden="true">
          P
        </span>
      </button>
    </div>
  );
}

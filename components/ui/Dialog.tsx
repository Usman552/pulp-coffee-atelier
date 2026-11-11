"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { cn } from "@/lib/cn";

type Variant = "drawer" | "center" | "full";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  variant?: Variant;
  className?: string;
  backdropClassName?: string;
  children: ReactNode;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const lockers = new Set<object>();
function lockScroll(owner: object, lock: boolean) {
  if (lock) lockers.add(owner);
  else lockers.delete(owner);
  const root = document.documentElement;
  if (lockers.size > 0) {
    const sb = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    root.style.paddingRight = sb ? `${sb}px` : "";
  } else {
    root.style.overflow = "";
    root.style.paddingRight = "";
  }
}

const panelFrom: Record<Variant, gsap.TweenVars> = {
  drawer: { xPercent: 100 },
  center: { y: 40, autoAlpha: 0 },
  full: { clipPath: "inset(0% 0% 100% 0%)" },
};
const panelTo: Record<Variant, gsap.TweenVars> = {
  drawer: { xPercent: 0 },
  center: { y: 0, autoAlpha: 1 },
  full: { clipPath: "inset(0% 0% 0% 0%)" },
};

/** Accessible modal shell: focus trap, Escape to close, scroll lock, choreographed in/out. */
export function Dialog({
  open,
  onClose,
  labelledBy,
  variant = "center",
  className,
  backdropClassName,
  children,
}: DialogProps) {
  const [rendered, setRendered] = useState(open);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // mount immediately when opening (state sync from prop)
  if (open && !rendered) setRendered(true);

  // animate in / out
  useLayoutEffect(() => {
    if (!rendered) return;
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    if (!panel || !backdrop) return;
    const reduced = prefersReducedMotion();

    if (open) {
      returnFocus.current = document.activeElement as HTMLElement;
      lockScroll(panelRef, true);
      const tl = gsap.timeline();
      if (reduced) {
        gsap.set(panel, { ...panelTo[variant], autoAlpha: 1 });
        gsap.set(backdrop, { autoAlpha: 1 });
      } else {
        tl.fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: "power2.out" })
          .fromTo(panel, panelFrom[variant], { ...panelTo[variant], duration: 0.9, ease: "expo.out" }, 0);
      }
      const first = panel.querySelector<HTMLElement>("[data-autofocus]") ?? panel.querySelector<HTMLElement>(FOCUSABLE);
      requestAnimationFrame(() => first?.focus({ preventScroll: true }));
      return () => {
        tl.kill();
      };
    }

    // closing
    const done = () => {
      lockScroll(panelRef, false);
      setRendered(false);
      returnFocus.current?.focus({ preventScroll: true });
    };
    if (reduced) {
      done();
      return;
    }
    const tl = gsap
      .timeline({ onComplete: done })
      .to(panel, { ...panelFrom[variant], duration: 0.55, ease: "expo.in" })
      .to(backdrop, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, "-=0.25");
    return () => {
      tl.kill();
    };
  }, [open, rendered, variant]);

  // keyboard: Escape + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCloseRef.current();
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => lockScroll(panelRef, false), []);

  if (!rendered) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <div
        ref={backdropRef}
        className={cn("absolute inset-0 bg-ink/70 backdrop-blur-[2px]", backdropClassName)}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={cn(
          "absolute",
          variant === "drawer" && "inset-y-0 right-0 w-full max-w-[34rem]",
          variant === "center" &&
            "inset-x-0 bottom-0 max-h-[92svh] md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[90svh] md:w-[min(92vw,56rem)] md:-translate-x-1/2 md:-translate-y-1/2",
          variant === "full" && "inset-0",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

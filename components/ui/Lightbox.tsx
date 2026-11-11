"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Dialog } from "./Dialog";

type Item = { src: string; alt: string; caption: string };

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: Item[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  // remember the last photo so the exit animation doesn't flash back to the first one
  const [last, setLast] = useState(0);
  if (index !== null && index !== last) setLast(index);
  const i = index ?? last;
  const item = items[i];
  const startX = useRef<number | null>(null);
  const go = (dir: 1 | -1) => onIndex((i + dir + items.length) % items.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndex((i + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, i, items.length, onIndex]);

  return (
    <Dialog open={open} onClose={onClose} labelledBy="lightbox-caption" variant="full" backdropClassName="bg-ink/95">
      <div
        className="flex h-full flex-col bg-ink text-bone"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
          startX.current = null;
        }}
      >
        <div className="gutter flex items-center justify-between py-4">
          <p className="mono text-bone/60">
            {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center border border-bone/30 transition-colors hover:bg-bone hover:text-ink"
            aria-label="Close gallery"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="relative mx-[var(--gutter)] flex-1">
          {item && (
            <Image key={item.src} src={item.src} alt={item.alt} fill sizes="100vw" quality={80} className="object-contain" />
          )}
        </div>
        <div className="gutter flex items-center justify-between gap-4 py-5">
          <p id="lightbox-caption" className="mono text-bone/80">
            Fig. {String(i + 3).padStart(2, "0")} — {item?.caption}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} className="grid size-12 place-items-center border border-bone/30 transition-colors hover:bg-bone hover:text-ink" aria-label="Previous photo">
              <ArrowLeft className="size-4" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => go(1)} className="grid size-12 place-items-center border border-bone/30 transition-colors hover:bg-bone hover:text-ink" aria-label="Next photo">
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

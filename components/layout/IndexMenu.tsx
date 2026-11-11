"use client";

import { useState, type MouseEvent } from "react";
import { X } from "lucide-react";
import { useSite } from "@/components/providers/SiteProvider";
import { brand, chapters, getOpenStatus, hours } from "@/content/brand";
import { img } from "@/content/images";
import { prefersReducedMotion } from "@/animations/gsap";
import { cn } from "@/lib/cn";
import { useNow } from "@/lib/useNow";
import { Dialog } from "@/components/ui/Dialog";
import { Photo } from "@/components/ui/Photo";
import { Cta } from "@/components/ui/Cta";

const previews: Record<string, string> = {
  top: img.heroPour,
  manifesto: img.manifestoWindow,
  ritual: img.ritualExtract,
  menu: img.flatWhite,
  philosophy: img.roast,
  space: img.room,
  moments: img.g2,
  community: img.barista,
  visit: img.visit,
};

/** Full-screen chapter index — the magazine's contents page. */
export function IndexMenu() {
  const { indexOpen, setIndexOpen, openReserve } = useSite();
  const [active, setActive] = useState<string>("top");
  const now = useNow();
  const today = now ? hours[now.getDay()] : null;
  const status = now ? getOpenStatus(now) : null;

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIndexOpen(false);
    const reduced = prefersReducedMotion();
    setTimeout(
      () => {
        document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        history.replaceState(null, "", `#${id}`);
      },
      reduced ? 30 : 650,
    );
  };

  return (
    <Dialog open={indexOpen} onClose={() => setIndexOpen(false)} labelledBy="index-title" variant="full">
      <div id="index-menu" className="gutter flex h-full flex-col overflow-y-auto bg-ink py-5 text-bone">
        <div className="flex items-center justify-between">
          <p id="index-title" className="mono text-bone/70">
            Contents — Issue Nº {brand.issue.number}
          </p>
          <button
            type="button"
            onClick={() => setIndexOpen(false)}
            className="group mono flex h-10 items-center gap-3"
            aria-label="Close index"
          >
            Close
            <span className="grid size-10 place-items-center border border-bone/30 transition-colors group-hover:bg-bone group-hover:text-ink">
              <X className="size-4" strokeWidth={1.5} />
            </span>
          </button>
        </div>

        <div className="mt-6 grid flex-1 gap-10 lg:grid-cols-[1.25fr_1fr]">
          <nav aria-label="Chapters">
            <ol className="border-t border-bone/15">
              {chapters.map((c) => (
                <li key={c.id} className="border-b border-bone/15">
                  <a
                    href={`#${c.id}`}
                    onClick={(e) => go(e, c.id)}
                    onPointerEnter={() => setActive(c.id)}
                    onFocus={() => setActive(c.id)}
                    className="group flex items-baseline gap-4 py-1.5 sm:gap-8"
                  >
                    <span className="mono w-8 text-bone/50">{c.num}</span>
                    <span
                      className={cn(
                        "display text-[11vw] leading-[0.95] transition-all duration-500 ease-expo sm:text-[8vw] lg:text-[4.6vw]",
                        "group-hover:translate-x-3 group-hover:text-pulp",
                      )}
                    >
                      {c.label}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="relative hidden lg:block">
            {Object.entries(previews).map(([id, src]) => (
              <Photo
                key={id}
                src={src}
                alt=""
                sizes="40vw"
                className={cn(
                  "!absolute inset-0 transition-[opacity,clip-path] duration-700 ease-expo",
                  active === id ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(8%_8%_8%_8%)]",
                )}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-bone/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mono text-bone/50">Find us</p>
            <p className="body-copy mt-2 text-sm">
              {brand.address.street}
              <br />
              {brand.address.city}
            </p>
          </div>
          <div>
            <p className="mono text-bone/50">Today</p>
            <p className="body-copy mt-2 text-sm">
              {today ? `${today.day} ${today.open}–${today.close}` : "See opening hours"}
              <br />
              <span className="text-bone/60">{status?.label}</span>
            </p>
          </div>
          <div>
            <p className="mono text-bone/50">Say hello</p>
            <p className="body-copy mt-2 flex flex-col text-sm">
              <a href={brand.email.href} className="hover:text-pulp">{brand.email.display}</a>
              <a href={brand.instagram.href} target="_blank" rel="noopener noreferrer" className="hover:text-pulp">
                Instagram {brand.instagram.handle}
              </a>
            </p>
          </div>
          <div className="flex items-end sm:justify-end lg:justify-start xl:justify-end">
            <Cta label="Reserve a table" onClick={() => openReserve()} />
          </div>
        </div>
      </div>
    </Dialog>
  );
}

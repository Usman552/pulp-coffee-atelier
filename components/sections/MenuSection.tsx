"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "@/components/providers/SiteProvider";
import { categories, formatPrice, menu, type MenuCategory, type MenuItem } from "@/content/menu";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/animations/gsap";
import { useReveals } from "@/animations/useReveals";
import { useCursorFollow } from "@/animations/useCursorFollow";
import { cn } from "@/lib/cn";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Photo } from "@/components/ui/Photo";
import { MenuDetail } from "@/components/menu/MenuDetail";

type Filter = MenuCategory | "all";

export function MenuSection() {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const { openReserve } = useSite();
  const [filter, setFilter] = useState<Filter>("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const firstRender = useRef(true);

  useReveals(ref);
  useCursorFollow(listRef, followerRef, hovered !== null);

  const items = useMemo(() => (filter === "all" ? menu : menu.filter((m) => m.category === filter)), [filter]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: menu.length };
    menu.forEach((m) => (c[m.category] = (c[m.category] ?? 0) + 1));
    return c;
  }, []);
  const featured = menu.find((m) => m.id === "cascara")!;

  // choreograph the list on filter change + re-measure scroll triggers below
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const rows = listRef.current?.querySelectorAll("[data-row]");
    if (rows?.length && !prefersReducedMotion()) {
      gsap.fromTo(rows, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.045, ease: "expo.out" });
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filter]);

  const hover = (id: string | null) => {
    setHovered(id);
    if (id && !seen.includes(id)) setSeen((s) => [...s, id]);
  };

  const open = (item: MenuItem) => {
    setSelected(item.id);
    setDetailOpen(true);
  };

  const current = menu.find((m) => m.id === selected) ?? null;
  const idx = current ? items.findIndex((m) => m.id === current.id) : -1;
  const step = (dir: 1 | -1) => {
    const list = idx === -1 ? menu : items;
    const i = list.findIndex((m) => m.id === selected);
    setSelected(list[(i + dir + list.length) % list.length].id);
  };

  return (
    <section id="menu" ref={ref} data-nav="light" className="gutter relative bg-bone pb-28 pt-28 text-ink md:pb-40 md:pt-36">
      <ChapterHead num="03" label="Signature Menu" aside="The List — Autumn edition" />

      <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <h2 className="display text-[30vw] leading-[0.78] lg:text-[19vw]">
            <span data-split className="block">
              The List
            </span>
          </h2>
          <p data-fade className="serif-i -mt-[3vw] ml-[22vw] text-3xl text-pulp sm:text-5xl lg:ml-[14vw] lg:text-[3.6vw]">
            eighteen ways to stay a while
          </p>
        </div>

        <button
          type="button"
          onClick={() => open(featured)}
          className="group relative self-end text-left lg:col-span-4"
          data-fade
          aria-label={`Feature: ${featured.name}, ${formatPrice(featured.price)} — view details`}
        >
          <div className="relative overflow-hidden">
            <Photo
              src={featured.image}
              alt=""
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="aspect-[4/3] w-full lg:aspect-[4/4.2]"
              imgClassName="transition-transform duration-[1.4s] ease-expo group-hover:scale-105"
            />
            <span className="mono absolute left-3 top-3 bg-pulp px-2 py-1 text-bone">The namesake</span>
          </div>
          <span className="mt-3 flex items-baseline justify-between gap-4">
            <span className="display text-3xl">{featured.name}</span>
            <span className="mono">{formatPrice(featured.price)}</span>
          </span>
          <span className="body-copy mt-1 block text-sm text-ink/65">Cold-steeped coffee-cherry fruit, sour cherry, tonic.</span>
        </button>
      </div>

      {/* Filters */}
      <div className="mt-16 flex flex-col gap-4 border-b border-ink/20 pb-4 md:mt-24 md:flex-row md:items-end md:justify-between">
        <div role="group" aria-label="Filter menu by category" className="no-scrollbar -mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0">
          {categories.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c.id)}
                className={cn(
                  "group relative shrink-0 px-4 py-2.5 transition-colors duration-300",
                  active ? "bg-ink text-bone" : "hover:bg-ink/5",
                )}
              >
                <span className="display text-2xl sm:text-3xl">{c.label}</span>
                <sup className="mono ml-1 !text-[0.6rem] opacity-60">{String(counts[c.id]).padStart(2, "0")}</sup>
              </button>
            );
          })}
        </div>
        <p className="mono text-ink/55">Oat, almond & whole milk at no charge · Prices incl. tax</p>
      </div>

      {/* Rows */}
      <ul ref={listRef} className="relative" onPointerLeave={() => hover(null)} aria-live="polite">
        {items.map((item, i) => (
          <li key={item.id} data-row className="border-b border-ink/20">
            <button
              type="button"
              onClick={() => open(item)}
              onPointerEnter={(e) => e.pointerType === "mouse" && hover(item.id)}
              onFocus={() => hover(null)}
              className="group relative grid w-full grid-cols-[4.5rem_1fr_auto] items-center gap-4 overflow-hidden py-4 text-left sm:grid-cols-[5.5rem_1fr_auto] lg:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)_6rem_2.5rem] lg:gap-6 lg:py-6"
              aria-label={`${item.name}, ${formatPrice(item.price)} — view details`}
            >
              <span
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-expo group-hover:scale-y-100 max-lg:hidden"
                aria-hidden="true"
              />
              {/* thumbnail for touch / small screens */}
              <span className="relative aspect-square w-full overflow-hidden lg:hidden">
                <Image src={item.image} alt="" fill sizes="96px" quality={70} className="object-cover" />
              </span>
              <span className="mono relative hidden text-ink/50 transition-colors group-hover:text-bone/60 lg:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative min-w-0 transition-[color,translate] duration-500 ease-expo lg:group-hover:translate-x-4 lg:group-hover:text-bone">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="display text-[2.15rem] leading-[0.9] sm:text-5xl lg:text-[clamp(2.5rem,3.9vw,4.4rem)]">{item.name}</span>
                  {item.tag && <span className="mono border border-pulp px-1.5 py-0.5 !text-[0.6rem] text-pulp lg:group-hover:border-crema lg:group-hover:text-crema">{item.tag}</span>}
                </span>
                <span className="serif-i mt-1 block text-lg text-ink/60 lg:hidden">{item.subtitle}</span>
              </span>
              <span className="relative hidden transition-colors group-hover:text-bone lg:block">
                <span className="serif-i block text-2xl">{item.subtitle}</span>
                <span className="mono mt-1 block text-ink/50 transition-colors group-hover:text-bone/60">{item.notes.join(" · ")}</span>
              </span>
              <span className="mono relative self-start pt-1 !text-sm text-ink transition-colors group-hover:text-crema lg:self-center lg:text-right">
                {formatPrice(item.price)}
              </span>
              <span className="relative hidden size-10 place-items-center border border-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-bone/40 group-hover:text-bone lg:grid">
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <p className="body-copy max-w-md text-ink/70">
          Beans from the current issue are available to take home — 250g bags from $19, ground to order for your brewer.
        </p>
        <button
          type="button"
          onClick={() => openReserve({ note: "We'd like to do a tasting flight of the current single origins." })}
          className="group mono inline-flex items-center gap-2 self-start border-b border-ink pb-1 sm:self-auto"
        >
          Book a tasting flight — $16
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:rotate-45" strokeWidth={1.5} />
        </button>
      </div>

      {/* Cursor-follow preview (desktop, fine pointer) */}
      <div
        ref={followerRef}
        className="pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[4/5] w-[17rem] overflow-hidden opacity-0 lg:block"
        aria-hidden="true"
      >
        {seen.map((id) => {
          const m = menu.find((x) => x.id === id)!;
          return (
            <Image
              key={id}
              src={m.image}
              alt=""
              fill
              sizes="272px"
              quality={70}
              className={cn("object-cover transition-opacity duration-300", hovered === id ? "opacity-100" : "opacity-0")}
            />
          );
        })}
      </div>

      <MenuDetail
        item={current}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onStep={step}
        position={current ? `${String((idx === -1 ? menu.findIndex((m) => m.id === current.id) : idx) + 1).padStart(2, "0")} / ${String(idx === -1 ? menu.length : items.length).padStart(2, "0")}` : ""}
        onReserve={(item) => {
          setDetailOpen(false);
          setTimeout(() => openReserve({ note: `We'd love to try the ${item.name}.` }), 450);
        }}
      />
    </section>
  );
}

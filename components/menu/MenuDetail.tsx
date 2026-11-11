"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { categories, formatPrice, type MenuItem } from "@/content/menu";
import { Dialog } from "@/components/ui/Dialog";
import { Photo } from "@/components/ui/Photo";
import { Cta } from "@/components/ui/Cta";

type Props = {
  item: MenuItem | null;
  open: boolean;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  onReserve: (item: MenuItem) => void;
  position: string;
};

export function MenuDetail({ item, open, onClose, onStep, onReserve, position }: Props) {
  return (
    <Dialog open={open} onClose={onClose} labelledBy="menu-detail-title" variant="drawer">
      {item && (
        <article className="no-scrollbar flex h-full flex-col overflow-y-auto bg-bone text-ink">
          <div className="relative">
            <Photo key={item.id} src={item.image} alt={item.name} sizes="(min-width: 640px) 34rem, 100vw" className="aspect-[4/3.4] w-full" quality={80} />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
              <span className="mono bg-bone px-2 py-1">{position}</span>
              <button
                type="button"
                onClick={onClose}
                data-autofocus
                className="grid size-11 place-items-center bg-bone transition-colors hover:bg-ink hover:text-bone"
                aria-label="Close details"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            {item.tag && <span className="mono absolute bottom-4 left-4 bg-pulp px-2 py-1 text-bone">{item.tag}</span>}
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-8">
            <p className="mono text-ink/55">{categories.find((c) => c.id === item.category)?.label}</p>
            <div className="mt-2 flex items-start justify-between gap-6">
              <h3 id="menu-detail-title" className="display text-5xl sm:text-6xl">
                {item.name}
              </h3>
              <p className="display shrink-0 text-4xl text-pulp sm:text-5xl">{formatPrice(item.price)}</p>
            </div>
            <p className="serif-i mt-2 text-2xl text-ink/70">{item.subtitle}</p>
            <p className="body-copy mt-6 text-ink/85">{item.description}</p>

            <div className="mt-8">
              <p className="mono text-ink/55">Tasting notes</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.notes.map((n) => (
                  <li key={n} className="mono border border-ink/25 px-3 py-1.5 text-ink">
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="mt-8 border-t border-ink/15">
              {item.details.map((d) => (
                <div key={d.label} className="flex justify-between gap-6 border-b border-ink/15 py-3">
                  <dt className="mono text-ink/55">{d.label}</dt>
                  <dd className="body-copy text-right text-sm">{d.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-10">
              <Cta label="Reserve to taste" onClick={() => onReserve(item)} magnetic={false} />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onStep(-1)}
                  className="grid size-12 place-items-center border border-ink/25 transition-colors hover:bg-ink hover:text-bone"
                  aria-label="Previous item"
                >
                  <ArrowLeft className="size-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => onStep(1)}
                  className="grid size-12 place-items-center border border-ink/25 transition-colors hover:bg-ink hover:text-bone"
                  aria-label="Next item"
                >
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </article>
      )}
    </Dialog>
  );
}

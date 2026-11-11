"use client";

import { useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "@/animations/useMagnetic";
import { cn } from "@/lib/cn";
import { RollText } from "./RollText";

type Variant = "pulp" | "ink" | "bone" | "outline-bone" | "outline-ink";

const variants: Record<Variant, string> = {
  pulp: "bg-pulp text-bone hover:bg-pulp-deep",
  ink: "bg-ink text-bone hover:bg-ink-2",
  bone: "bg-bone text-ink hover:bg-white",
  "outline-bone": "border border-bone/40 text-bone hover:border-bone hover:bg-bone hover:text-ink",
  "outline-ink": "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-bone",
};

type Common = {
  label: string;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  magnetic?: boolean;
};

type AsLink = Common & { href: string; external?: boolean; onClick?: never; type?: never };
type AsButton = Common & {
  onClick?: () => void;
  type?: "button" | "submit";
  href?: never;
  external?: never;
  disabled?: boolean;
};

export function Cta(props: AsLink | AsButton) {
  const { label, variant = "pulp", icon, className, magnetic = true } = props;
  const ref = useRef<HTMLElement>(null);
  useMagnetic(ref, magnetic ? 0.25 : 0);

  const classes = cn(
    "group relative inline-flex h-12 items-center gap-3 whitespace-nowrap px-6 mono !text-[0.72rem] transition-colors duration-300 select-none",
    variants[variant],
    className,
  );
  const inner = (
    <>
      <RollText>{label}</RollText>
      <span className="relative inline-flex size-4 overflow-hidden" aria-hidden="true">
        <span className="flex transition-transform duration-500 ease-expo group-hover:translate-x-full group-hover:-translate-y-full">
          {icon ?? <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.5} />}
        </span>
        <span className="absolute -left-full top-full flex transition-transform duration-500 ease-expo group-hover:translate-x-full group-hover:-translate-y-full">
          {icon ?? <ArrowUpRight className="size-4 shrink-0" strokeWidth={1.5} />}
        </span>
      </span>
    </>
  );

  if ("href" in props && props.href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={props.href}
        className={classes}
        {...(props.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
        {props.external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }
  const b = props as AsButton;
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={b.type ?? "button"}
      onClick={b.onClick}
      disabled={b.disabled}
      className={cn(classes, "disabled:opacity-50 disabled:cursor-wait")}
    >
      {inner}
    </button>
  );
}

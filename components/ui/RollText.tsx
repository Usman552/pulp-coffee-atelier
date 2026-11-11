import { cn } from "@/lib/cn";

/** Text that rolls up to a duplicate of itself when its `group` parent is hovered. */
export function RollText({ children, className }: { children: string; className?: string }) {
  const move = "transition-transform duration-500 ease-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full";
  return (
    <span className={cn("relative inline-block overflow-hidden align-bottom leading-[1.2]", className)}>
      <span className={cn("block", move)}>{children}</span>
      <span className={cn("absolute left-0 top-full block whitespace-nowrap", move)} aria-hidden="true">
        {children}
      </span>
    </span>
  );
}

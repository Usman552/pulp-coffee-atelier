import Image from "next/image";
import { cn } from "@/lib/cn";

/** A photograph set inline with display type — sized in `em` so it scales with the line. */
export function InlinePhoto({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <span
      data-inline-img
      className={cn(
        "relative mx-[0.08em] inline-block h-[0.74em] w-[1.5em] overflow-hidden align-[-0.04em]",
        className,
      )}
    >
      <Image src={src} alt={alt} fill sizes="(min-width: 768px) 14vw, 25vw" quality={70} className="object-cover" />
    </span>
  );
}

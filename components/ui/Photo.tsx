import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type PhotoProps = HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt: string;
  sizes: string;
  imgClassName?: string;
  preload?: boolean;
  quality?: 70 | 80;
  [key: `data-${string}`]: string | number | boolean | undefined;
};

/** Responsive, optimised photograph that fills its (positioned) frame. */
export function Photo({
  src,
  alt,
  sizes,
  className,
  imgClassName,
  preload,
  quality = 70,
  ...rest
}: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden bg-ink-2", className)} {...rest}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        preload={preload}
        loading={preload ? "eager" : "lazy"}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}

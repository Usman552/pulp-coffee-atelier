import { cn } from "@/lib/cn";

/** Magazine running header: chapter number, section name, folio note. */
export function ChapterHead({
  num,
  label,
  aside,
  tone = "light",
  className,
}: {
  num: string;
  label: string;
  aside?: string;
  tone?: "light" | "dark" | "red";
  className?: string;
}) {
  return (
    <div
      data-fade
      className={cn(
        "mono flex items-center justify-between gap-6 border-b pb-3",
        tone === "light" && "border-ink/20 text-ink/70",
        tone === "dark" && "border-bone/20 text-bone/70",
        tone === "red" && "border-bone/30 text-bone/85",
        className,
      )}
    >
      <span className="flex items-center gap-3">
        <span className={tone === "light" ? "text-pulp" : tone === "dark" ? "text-crema" : "text-ink"}>{num}</span>
        <span aria-hidden="true">—</span>
        <span>{label}</span>
      </span>
      {aside && <span className="hidden text-right sm:block">{aside}</span>}
    </div>
  );
}

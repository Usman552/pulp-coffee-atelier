import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Tone = "ink" | "bone";

const inputBase =
  "w-full bg-transparent border-b py-3 body-copy text-base outline-none transition-colors duration-300 placeholder:opacity-40 rounded-none";
const tones: Record<Tone, string> = {
  ink: "border-ink/25 text-ink focus:border-ink",
  bone: "border-bone/35 text-bone focus:border-bone",
};

export function FieldShell({
  id,
  label,
  error,
  tone = "ink",
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  tone?: Tone;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className={cn("mono", tone === "ink" ? "text-ink/60" : "text-bone/70")}>
        {label}
        {hint && <span className="ml-2 normal-case tracking-normal opacity-70">{hint}</span>}
      </label>
      {children}
      <p id={`${id}-error`} className={cn("mono mt-1 min-h-[1.1rem] !normal-case !tracking-normal text-[0.7rem]", tone === "ink" ? "text-pulp" : "text-ink")} role="alert">
        {error ?? ""}
      </p>
    </div>
  );
}

export function TextInput({
  tone = "ink",
  invalid,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { tone?: Tone; invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      aria-describedby={props.id ? `${props.id}-error` : undefined}
      className={cn(inputBase, tones[tone], invalid && (tone === "ink" ? "!border-pulp" : "!border-ink"), className)}
    />
  );
}

export function TextArea({
  tone = "ink",
  invalid,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { tone?: Tone; invalid?: boolean }) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      aria-describedby={props.id ? `${props.id}-error` : undefined}
      className={cn(inputBase, tones[tone], "resize-none", invalid && (tone === "ink" ? "!border-pulp" : "!border-ink"), className)}
    />
  );
}

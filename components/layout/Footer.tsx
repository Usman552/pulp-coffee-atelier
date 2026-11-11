"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import { brand, chapters, hours } from "@/content/brand";
import { gsap, MOTION, prefersReducedMotion, useGSAP } from "@/animations/gsap";
import { RollText } from "@/components/ui/RollText";
import { Cta } from "@/components/ui/Cta";
import { submitSubscribe } from "@/lib/submit";

/** The back cover: next-issue teaser, newsletter, index and a wordmark cropped by the page edge. */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.from("[data-footer-letter]", {
          yPercent: 100,
          duration: 1.6,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-footer-word]", start: "top 95%", once: true },
        });
      });
    },
    { scope: ref },
  );

  async function subscribe(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState("error");
      setMessage("Enter a valid email.");
      return;
    }
    setState("sending");
    try {
      const json = await submitSubscribe(email);
      if (!json.ok) throw new Error(json.error);
      setState("done");
      setMessage(`You're on the list. Issue Nº 08 lands in ${brand.nextIssue.date.split(" ")[0]}.`);
      setEmail("");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error && err.message ? err.message : "Couldn't subscribe — try again.");
    }
  }

  const weekday = `${hours[1].open}–${hours[1].close}`;

  return (
    <footer ref={ref} data-nav="dark" className="relative overflow-hidden bg-ink text-bone">
      <div className="gutter grid gap-16 pb-16 pt-24 md:pt-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <p className="mono text-bone/55">Next issue — {brand.nextIssue.date}</p>
          <p className="display mt-4 text-6xl sm:text-7xl lg:text-[6vw]">
            {brand.nextIssue.title.split(" ")[0]} <span className="serif-i text-crema">{brand.nextIssue.title.split(" ").slice(1).join(" ")}</span>
          </p>
          <p className="body-copy mt-4 max-w-md text-bone/70">
            New beans, new pastries, new events — one email per issue, nothing else.
          </p>
          <form onSubmit={subscribe} noValidate className="mt-8 flex max-w-lg flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="newsletter" className="mono text-bone/55">
                Email
              </label>
              <input
                id="newsletter"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                placeholder="you@example.com"
                aria-describedby="newsletter-status"
                aria-invalid={state === "error" || undefined}
                className="body-copy w-full rounded-none border-b border-bone/35 bg-transparent py-3 outline-none transition-colors placeholder:text-bone/30 focus:border-bone"
              />
            </div>
            <Cta type="submit" label={state === "sending" ? "Subscribing…" : "Subscribe"} disabled={state === "sending"} magnetic={false} />
          </form>
          <p id="newsletter-status" role="status" className={`mono mt-3 min-h-[1rem] !normal-case !tracking-normal ${state === "error" ? "text-pulp" : "text-crema"}`}>
            {message && state !== "idle" && state !== "sending" ? message : ""}
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5 lg:col-start-8">
          <div>
            <p className="mono text-bone/45">Index</p>
            <ul className="mt-4 space-y-2">
              {chapters.slice(1).map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="group body-copy text-sm text-bone/85 hover:text-bone">
                    <RollText>{c.label}</RollText>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono text-bone/45">Visit</p>
            <p className="body-copy mt-4 text-sm text-bone/85">
              {brand.address.street}
              <br />
              {brand.address.city}
            </p>
            <p className="body-copy mt-4 text-sm text-bone/85">
              Mon–Fri {weekday}
              <br />
              Sat {hours[6].open}–{hours[6].close} · Sun {hours[0].open}–{hours[0].close}
            </p>
          </div>
          <div>
            <p className="mono text-bone/45">Elsewhere</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={brand.instagram.href} target="_blank" rel="noopener noreferrer" className="group body-copy text-bone/85 hover:text-bone">
                  <RollText>Instagram</RollText>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={brand.email.href} className="group body-copy text-bone/85 hover:text-bone">
                  <RollText>Email</RollText>
                </a>
              </li>
              <li>
                <a href={brand.phone.href} className="group body-copy text-bone/85 hover:text-bone">
                  <RollText>Call the bar</RollText>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="gutter mono flex flex-col gap-4 border-t border-bone/15 py-5 text-bone/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {brand.issue.year} {brand.fullName}. Photography via Unsplash & Pexels.
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
          className="group inline-flex items-center gap-2 self-start text-bone sm:self-auto"
        >
          <RollText>Back to the cover</RollText>
          <ArrowUp className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-1" strokeWidth={1.5} />
        </button>
      </div>

      <div data-footer-word className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="display flex justify-between px-[1.5vw] text-[44vw] leading-[0.73] text-pulp">
          {brand.name.split("").map((l, i) => (
            <span key={i} className="block overflow-hidden">
              <span data-footer-letter className="block translate-y-[18%]">
                {l}
              </span>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}

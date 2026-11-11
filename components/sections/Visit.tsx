"use client";

import { useRef, useState, type FormEvent } from "react";
import { AtSign, Navigation, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { useSite } from "@/components/providers/SiteProvider";
import { brand, getOpenStatus, hours, mapsDirectionsUrl, mapsEmbedUrl } from "@/content/brand";
import { useReveals } from "@/animations/useReveals";
import { cn } from "@/lib/cn";
import { contactTopics, validateContact, type ContactInput, type FieldErrors } from "@/lib/forms";
import { useNow } from "@/lib/useNow";
import { ChapterHead } from "@/components/ui/ChapterHead";
import { Cta } from "@/components/ui/Cta";
import { FieldShell, TextArea, TextInput } from "@/components/ui/Field";

// Mon → Sun display order
const week = [1, 2, 3, 4, 5, 6, 0];

export function Visit() {
  const ref = useRef<HTMLElement>(null);
  const { openReserve } = useSite();
  const now = useNow();
  const status = now ? getOpenStatus(now) : null;
  useReveals(ref);

  return (
    <section id="visit" ref={ref} data-nav="dark" className="gutter relative bg-pulp pb-24 pt-28 text-bone md:pb-32 md:pt-36">
      <ChapterHead num="08" label="Visit Us" aside={`${brand.address.street} — p. 08`} tone="red" />

      <h2 className="display mt-12 text-[30vw] leading-[0.78] md:mt-16 md:text-[19vw]">
        <span data-split className="block">
          Come <span className="serif-i text-ink">by.</span>
        </span>
      </h2>

      <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-6">
        {/* Address + actions */}
        <div className="lg:col-span-5">
          <address className="display not-italic text-5xl leading-[0.95] sm:text-6xl">
            {brand.address.street}
            <br />
            <span className="text-bone/70">{brand.address.district}</span>
            <br />
            {brand.address.city}
          </address>
          <div data-fade className="mt-8 flex flex-wrap gap-3">
            <Cta label="Get directions" href={mapsDirectionsUrl} external variant="bone" icon={<Navigation className="size-4" strokeWidth={1.5} />} />
            <Cta label="Reserve a table" onClick={() => openReserve()} variant="ink" />
          </div>

          <ul data-stagger className="mt-12 border-t border-bone/30">
            {brand.transit.map((t) => (
              <li key={t} className="body-copy border-b border-bone/30 py-3 text-bone/90">
                {t}
              </li>
            ))}
          </ul>

          <ul className="mt-10 grid gap-3">
            <li>
              <a href={brand.phone.href} className="group mono inline-flex items-center gap-3 !text-sm">
                <Phone className="size-4" strokeWidth={1.5} />
                <span className="border-b border-transparent transition-colors group-hover:border-bone">{brand.phone.display}</span>
              </a>
            </li>
            <li>
              <a href={brand.email.href} className="group mono inline-flex items-center gap-3 !text-sm">
                <AtSign className="size-4" strokeWidth={1.5} />
                <span className="border-b border-transparent transition-colors group-hover:border-bone">{brand.email.display}</span>
              </a>
            </li>
            <li>
              <a href={brand.instagram.href} target="_blank" rel="noopener noreferrer" className="group mono inline-flex items-center gap-3 !text-sm">
                <InstagramIcon className="size-4" strokeWidth={1.5} />
                <span className="border-b border-transparent transition-colors group-hover:border-bone">{brand.instagram.handle}</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Map + hours */}
        <div className="grid gap-6 lg:col-span-7 lg:grid-cols-7">
          <div data-fade className="relative overflow-hidden bg-pulp lg:col-span-4">
            <div className="aspect-[4/5] w-full mix-blend-multiply sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[30rem]">
              <iframe
                title={`Map showing ${brand.fullName}, ${brand.address.street}`}
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full border-0 [filter:grayscale(1)_contrast(1.15)_brightness(1.05)]"
              />
            </div>
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mono absolute bottom-3 left-3 bg-ink px-3 py-2 text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              Open in Google Maps ↗<span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center gap-2">
              <span className={cn("size-2 rounded-full", status?.isOpen ? "bg-bone" : "bg-ink")} aria-hidden="true" />
              <p className="mono" aria-live="polite">
                {status?.label ?? "Opening hours"}
              </p>
            </div>
            <table className="mt-4 w-full border-t border-bone/30">
              <caption className="sr-only">Opening hours</caption>
              <tbody>
                {week.map((d) => {
                  const h = hours[d];
                  const isToday = now?.getDay() === d;
                  return (
                    <tr key={h.day} className={cn("border-b border-bone/30", isToday && "bg-ink text-bone")}>
                      <th scope="row" className="mono py-3 pl-2 text-left font-normal">
                        {h.short}
                        {isToday && <span className="ml-2 text-crema">Today</span>}
                      </th>
                      <td className="mono py-3 pr-2 text-right tabular-nums">
                        {h.open}–{h.close}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="body-copy mt-4 text-sm text-bone/85">
              Kitchen closes 30 minutes before the bar. Thursday late opening for public cupping.
            </p>
          </div>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState<ContactInput>({ name: "", email: "", topic: "general", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [reference, setReference] = useState("");

  const set = <K extends keyof ContactInput>(k: K, v: ContactInput[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    const check = validateContact(form);
    if (!check.valid) return setErrors(check.errors);
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check.data),
      });
      const json = await res.json();
      if (!json.ok) {
        setErrors(json.errors ?? {});
        return setState("idle");
      }
      setReference(json.reference);
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <div id="contact" className="mt-24 grid gap-10 border-t border-bone/30 pt-12 md:mt-32 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-5">
        <p className="mono text-bone/75">Write to us</p>
        <h3 data-split className="display mt-3 text-5xl sm:text-6xl lg:text-[4.6vw]">
          Private events, wholesale, or just <span className="serif-i text-ink">hello.</span>
        </h3>
        <p className="body-copy mt-5 max-w-sm text-bone/85">
          We reply within one working day. For same-day questions, call the bar.
        </p>
      </div>

      {state === "sent" ? (
        <div className="lg:col-span-6 lg:col-start-7" role="status">
          <p className="display text-6xl">Message received.</p>
          <p className="body-copy mt-4 text-bone/85">
            Thanks, {form.name.split(" ")[0]}. Your reference is <strong className="font-semibold">{reference}</strong> —
            we&rsquo;ll be in touch at {form.email}.
          </p>
          <button type="button" onClick={() => { setForm({ name: "", email: "", topic: "general", message: "" }); setState("idle"); }} className="mono mt-6 border-b border-bone pb-1">
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="grid gap-x-6 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          <FieldShell id="c-name" label="Name" tone="bone" error={errors.name}>
            <TextInput id="c-name" tone="bone" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} invalid={!!errors.name} />
          </FieldShell>
          <FieldShell id="c-email" label="Email" tone="bone" error={errors.email}>
            <TextInput id="c-email" type="email" tone="bone" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} invalid={!!errors.email} />
          </FieldShell>
          <fieldset className="sm:col-span-2">
            <legend className="mono text-bone/75">Topic</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {contactTopics.map((t) => (
                <label
                  key={t.id}
                  className={cn(
                    "mono cursor-pointer border px-3 py-2.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-bone",
                    form.topic === t.id ? "border-ink bg-ink text-bone" : "border-bone/40 hover:border-bone",
                  )}
                >
                  <input type="radio" name="topic" value={t.id} checked={form.topic === t.id} onChange={() => set("topic", t.id)} className="sr-only" />
                  {t.label}
                </label>
              ))}
            </div>
          </fieldset>
          <FieldShell id="c-message" label="Message" tone="bone" error={errors.message} className="mt-6 sm:col-span-2">
            <TextArea id="c-message" tone="bone" rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} invalid={!!errors.message} />
          </FieldShell>
          {state === "error" && (
            <p className="body-copy text-sm sm:col-span-2" role="alert">
              That didn&rsquo;t send. Please try again or email {brand.email.display}.
            </p>
          )}
          <div className="mt-2 sm:col-span-2">
            <Cta type="submit" label={state === "sending" ? "Sending…" : "Send message"} variant="ink" disabled={state === "sending"} />
          </div>
        </form>
      )}
    </div>
  );
}

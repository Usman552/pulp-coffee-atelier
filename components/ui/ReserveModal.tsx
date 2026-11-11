"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNow } from "@/lib/useNow";
import { submitReservation } from "@/lib/submit";
import { CalendarPlus, Check, Minus, Navigation, Plus, X } from "lucide-react";
import { useSite } from "@/components/providers/SiteProvider";
import { brand, hours, mapsDirectionsUrl, toMinutes } from "@/content/brand";
import { img } from "@/content/images";
import { cn } from "@/lib/cn";
import {
  parseLocalDate,
  seatingOptions,
  slotsFor,
  toDateValue,
  validateReservation,
  type FieldErrors,
  type ReservationInput,
} from "@/lib/forms";
import { Cta } from "./Cta";
import { Dialog } from "./Dialog";
import { FieldShell, TextArea, TextInput } from "./Field";
import { Photo } from "./Photo";

type Status = "idle" | "sending" | "done" | "error";

const prettyDate = (v: string) =>
  v
    ? parseLocalDate(v).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : "—";

function upcomingDays(count = 14) {
  const out: string[] = [];
  const d = new Date();
  // skip today if it's already within an hour of closing
  const today = hours[d.getDay()];
  if (d.getHours() * 60 + d.getMinutes() > toMinutes(today.close) - 60) d.setDate(d.getDate() + 1);
  for (let i = 0; i < count; i++) {
    out.push(toDateValue(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function buildIcs(r: ReservationInput, reference: string) {
  const [y, m, d] = r.date.split("-");
  const [hh, mm] = r.time.split(":");
  const start = `${y}${m}${d}T${hh}${mm}00`;
  const endMin = Number(hh) * 60 + Number(mm) + 90;
  const end = `${y}${m}${d}T${String(Math.floor(endMin / 60)).padStart(2, "0")}${String(endMin % 60).padStart(2, "0")}00`;
  const loc = `${brand.address.street}, ${brand.address.city}`.replace(/,/g, "\\,");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PULP Coffee Atelier//Reservations//EN",
    "BEGIN:VEVENT",
    `UID:${reference}@pulp.coffee`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:Table for ${r.guests} at ${brand.fullName}`,
    `LOCATION:${loc}`,
    `DESCRIPTION:Reference ${reference}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function ReserveModal() {
  const { reserveOpen, closeReserve, reservePrefill } = useSite();
  const [days, setDays] = useState<string[]>([]);
  const [form, setForm] = useState<ReservationInput>({
    date: "",
    time: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    seating: "any",
    note: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");

  // fresh state each time the modal opens
  useEffect(() => {
    if (!reserveOpen) return;
    const t = setTimeout(() => {
      const next = upcomingDays();
      setDays(next);
      setStatus("idle");
      setErrors({});
      setForm((f) => ({ ...f, date: f.date && next.includes(f.date) ? f.date : next[0], time: "", note: reservePrefill.note ?? "" }));
    }, 0);
    return () => clearTimeout(t);
  }, [reserveOpen, reservePrefill]);

  const now = useNow();
  const slots = useMemo(() => {
    if (!form.date || !now) return [];
    const all = slotsFor(form.date);
    if (form.date !== toDateValue(now)) return all;
    const mins = now.getHours() * 60 + now.getMinutes() + 30;
    return all.filter((s) => toMinutes(s) >= mins);
  }, [form.date, now]);

  const set = <K extends keyof ReservationInput>(k: K, v: ReservationInput[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    const check = validateReservation(form);
    if (!check.valid) {
      setErrors(check.errors);
      return;
    }
    setStatus("sending");
    try {
      const json = await submitReservation(check.data);
      if (!json.ok) {
        setErrors(json.errors);
        setStatus("idle");
        return;
      }
      setReference(json.reference);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  function downloadIcs() {
    const blob = new Blob([buildIcs(form, reference)], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pulp-reservation-${reference}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <Dialog open={reserveOpen} onClose={closeReserve} labelledBy="reserve-title" variant="center">
      <div className="grid max-h-[92svh] overflow-hidden bg-bone text-ink md:max-h-[90svh] md:grid-cols-[0.8fr_1.2fr]">
        {/* Ticket / summary column */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-ink p-8 text-bone md:flex">
          <Photo
            src={img.visit}
            alt=""
            sizes="400px"
            className="!absolute inset-0 opacity-40"
            imgClassName="grayscale-[30%]"
          />
          <div className="relative">
            <p className="mono text-bone/70">Reservation · Issue Nº {brand.issue.number}</p>
            <p className="display mt-6 text-[4.5rem]">
              Table
              <br />
              for {form.guests}
            </p>
          </div>
          <dl className="relative space-y-3 border-t border-bone/25 pt-5">
            {[
              ["Date", prettyDate(form.date)],
              ["Time", form.time || "—"],
              ["Seat", seatingOptions.find((s) => s.id === form.seating)?.label ?? "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <dt className="mono text-bone/60">{k}</dt>
                <dd className="body-copy text-right text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="no-scrollbar relative max-h-[92svh] overflow-y-auto p-6 sm:p-8 md:max-h-[90svh]">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="mono text-ink/60">{brand.address.street}</p>
              <h2 id="reserve-title" className="display mt-2 text-5xl sm:text-6xl">
                {status === "done" ? (
                  <>
                    See you <span className="serif-i text-pulp">there.</span>
                  </>
                ) : (
                  <>
                    Reserve a <span className="serif-i text-pulp">table</span>
                  </>
                )}
              </h2>
            </div>
            <button
              type="button"
              onClick={closeReserve}
              className="grid size-11 shrink-0 place-items-center border border-ink/20 transition-colors hover:bg-ink hover:text-bone"
              aria-label="Close reservation"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          {status === "done" ? (
            <div className="mt-8">
              <div className="flex items-center gap-3 border-y border-ink/15 py-5">
                <span className="grid size-10 place-items-center bg-pulp text-bone">
                  <Check className="size-5" />
                </span>
                <div>
                  <p className="mono text-ink/60">Booking reference</p>
                  <p className="display text-3xl tracking-wide">{reference}</p>
                </div>
              </div>
              <p className="body-copy mt-6 max-w-md text-ink/80">
                {form.name.split(" ")[0]}, your table for {form.guests} is held on{" "}
                <strong className="font-semibold">{prettyDate(form.date)}</strong> at{" "}
                <strong className="font-semibold">{form.time}</strong>. A confirmation is on its way to {form.email}. We
                hold tables for 15 minutes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Cta label="Add to calendar" variant="ink" onClick={downloadIcs} icon={<CalendarPlus className="size-4" strokeWidth={1.5} />} magnetic={false} />
                <Cta label="Directions" variant="outline-ink" href={mapsDirectionsUrl} external icon={<Navigation className="size-4" strokeWidth={1.5} />} magnetic={false} />
                <Cta label="Done" variant="outline-ink" onClick={closeReserve} magnetic={false} />
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-6 space-y-6">
              {/* Date */}
              <fieldset>
                <legend className="mono text-ink/60">Day</legend>
                <div className="no-scrollbar -mx-6 mt-3 flex gap-2 overflow-x-auto px-6 sm:-mx-8 sm:px-8">
                  {days.map((d) => {
                    const date = parseLocalDate(d);
                    const active = form.date === d;
                    return (
                      <label
                        key={d}
                        className={cn(
                          "flex w-16 shrink-0 cursor-pointer flex-col items-center border py-2.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-pulp",
                          active ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink",
                        )}
                      >
                        <input
                          type="radio"
                          name="date"
                          value={d}
                          checked={active}
                          onChange={() => {
                            set("date", d);
                            set("time", "");
                          }}
                          className="sr-only"
                        />
                        <span className="mono !text-[0.6rem] opacity-70">
                          {date.toLocaleDateString("en-US", { weekday: "short" })}
                        </span>
                        <span className="display text-3xl">{date.getDate()}</span>
                        <span className="mono !text-[0.6rem] opacity-70">
                          {date.toLocaleDateString("en-US", { month: "short" })}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <label htmlFor="r-date" className="mono text-ink/60">
                    Or pick a date
                  </label>
                  <input
                    id="r-date"
                    type="date"
                    value={form.date}
                    min={days[0]}
                    onChange={(e) => {
                      set("date", e.target.value);
                      set("time", "");
                    }}
                    className="body-copy border-b border-ink/25 bg-transparent py-1 text-sm outline-none focus:border-ink"
                  />
                </div>
                {errors.date && <p className="mono mt-1 !normal-case text-pulp">{errors.date}</p>}
              </fieldset>

              {/* Time */}
              <fieldset>
                <legend className="mono text-ink/60">
                  Time <span className="normal-case tracking-normal opacity-70">· {prettyDate(form.date)}</span>
                </legend>
                {slots.length ? (
                  <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                    {slots.map((s) => (
                      <label
                        key={s}
                        className={cn(
                          "mono cursor-pointer border py-2 text-center !text-xs transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-pulp",
                          form.time === s ? "border-pulp bg-pulp text-bone" : "border-ink/20 hover:border-ink",
                        )}
                      >
                        <input type="radio" name="time" value={s} checked={form.time === s} onChange={() => set("time", s)} className="sr-only" />
                        {s}
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="body-copy mt-3 text-sm text-ink/70">No more tables today — choose another day.</p>
                )}
                {errors.time && <p className="mono mt-1 !normal-case text-pulp">{errors.time}</p>}
              </fieldset>

              {/* Guests + seating */}
              <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
                <fieldset>
                  <legend className="mono text-ink/60">Guests</legend>
                  <div className="mt-3 flex items-center border border-ink/20">
                    <button
                      type="button"
                      onClick={() => set("guests", Math.max(1, form.guests - 1))}
                      className="grid size-11 place-items-center transition-colors hover:bg-ink hover:text-bone disabled:opacity-30"
                      disabled={form.guests <= 1}
                      aria-label="Fewer guests"
                    >
                      <Minus className="size-4" />
                    </button>
                    <output className="display w-12 text-center text-3xl" aria-live="polite">
                      {form.guests}
                    </output>
                    <button
                      type="button"
                      onClick={() => set("guests", Math.min(8, form.guests + 1))}
                      className="grid size-11 place-items-center transition-colors hover:bg-ink hover:text-bone disabled:opacity-30"
                      disabled={form.guests >= 8}
                      aria-label="More guests"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  {errors.guests && <p className="mono mt-1 !normal-case text-pulp">{errors.guests}</p>}
                </fieldset>
                <fieldset>
                  <legend className="mono text-ink/60">Seating</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {seatingOptions.map((s) => (
                      <label
                        key={s.id}
                        className={cn(
                          "mono cursor-pointer border px-3 py-3 !text-[0.65rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-pulp",
                          form.seating === s.id ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink",
                        )}
                      >
                        <input type="radio" name="seating" value={s.id} checked={form.seating === s.id} onChange={() => set("seating", s.id)} className="sr-only" />
                        {s.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="grid gap-x-6 sm:grid-cols-2">
                <FieldShell id="r-name" label="Name" error={errors.name}>
                  <TextInput id="r-name" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} invalid={!!errors.name} />
                </FieldShell>
                <FieldShell id="r-email" label="Email" error={errors.email}>
                  <TextInput id="r-email" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} invalid={!!errors.email} />
                </FieldShell>
                <FieldShell id="r-phone" label="Phone" hint="optional" error={errors.phone}>
                  <TextInput id="r-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} invalid={!!errors.phone} />
                </FieldShell>
                <FieldShell id="r-note" label="Anything we should know?" hint="optional">
                  <TextArea id="r-note" rows={2} value={form.note} onChange={(e) => set("note", e.target.value)} placeholder="Birthday, dog, oat milk…" />
                </FieldShell>
              </div>

              {status === "error" && (
                <p className="body-copy text-sm text-pulp" role="alert">
                  Something went wrong sending that. Please try again, or call us on {brand.phone.display}.
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
                <p className="mono max-w-[16rem] text-ink/60">Walk-ins always welcome. Tables held for 15 minutes.</p>
                <Cta type="submit" label={status === "sending" ? "Holding your table…" : "Confirm reservation"} variant="pulp" disabled={status === "sending"} magnetic={false} />
              </div>
            </form>
          )}
        </div>
      </div>
    </Dialog>
  );
}

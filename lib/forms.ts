import { hours, toMinutes } from "@/content/brand";

export type FieldErrors = Record<string, string>;

export type ReservationInput = {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone?: string;
  seating: "any" | "window" | "communal" | "greenhouse";
  note?: string;
};

export type ContactInput = {
  name: string;
  email: string;
  topic: "general" | "events" | "wholesale" | "press";
  message: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^\d{2}:\d{2}$/;

export const seatingOptions = [
  { id: "any", label: "No preference" },
  { id: "window", label: "Window bar" },
  { id: "communal", label: "Communal oak" },
  { id: "greenhouse", label: "Greenhouse" },
] as const;

export const contactTopics = [
  { id: "general", label: "General hello" },
  { id: "events", label: "Private events" },
  { id: "wholesale", label: "Wholesale" },
  { id: "press", label: "Press" },
] as const;

/** Parse "YYYY-MM-DD" as a local calendar date (no timezone drift). */
export function parseLocalDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function toDateValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Bookable 30-minute slots for a given date: from opening until an hour before close. */
export function slotsFor(dateValue: string) {
  if (!DATE.test(dateValue)) return [];
  const day = hours[parseLocalDate(dateValue).getDay()];
  const out: string[] = [];
  for (let m = toMinutes(day.open); m <= toMinutes(day.close) - 60; m += 30) {
    out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return out;
}

export function validateReservation(raw: Partial<Record<keyof ReservationInput, unknown>>) {
  const errors: FieldErrors = {};
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: ReservationInput = {
    date: str(raw.date),
    time: str(raw.time),
    guests: Number(raw.guests),
    name: str(raw.name).slice(0, 80),
    email: str(raw.email).slice(0, 120),
    phone: str(raw.phone).slice(0, 30),
    seating: (["any", "window", "communal", "greenhouse"].includes(str(raw.seating))
      ? str(raw.seating)
      : "any") as ReservationInput["seating"],
    note: str(raw.note).slice(0, 400),
  };

  if (!DATE.test(data.date)) errors.date = "Choose a date.";
  else {
    const chosen = parseLocalDate(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const limit = new Date(today);
    limit.setDate(limit.getDate() + 60);
    // allow "yesterday" to absorb timezone differences between visitor and server
    const floor = new Date(today);
    floor.setDate(floor.getDate() - 1);
    if (chosen < floor) errors.date = "That date has passed.";
    else if (chosen > limit) errors.date = "We take bookings up to 60 days ahead.";
  }
  if (!TIME.test(data.time)) errors.time = "Choose a time.";
  else if (DATE.test(data.date) && !slotsFor(data.date).includes(data.time))
    errors.time = "We're not seating at that time.";
  if (!Number.isInteger(data.guests) || data.guests < 1 || data.guests > 8)
    errors.guests = "Tables are for 1–8 guests. Larger groups: email us.";
  if (data.name.length < 2) errors.name = "Tell us your name.";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email.";
  if (data.phone && !/^[+()\d\s.-]{7,}$/.test(data.phone)) errors.phone = "Check this number.";

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function validateContact(raw: Partial<Record<keyof ContactInput, unknown>>) {
  const errors: FieldErrors = {};
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const topic = str(raw.topic);
  const data: ContactInput = {
    name: str(raw.name).slice(0, 80),
    email: str(raw.email).slice(0, 120),
    topic: (["general", "events", "wholesale", "press"].includes(topic) ? topic : "general") as ContactInput["topic"],
    message: str(raw.message).slice(0, 2000),
  };
  if (data.name.length < 2) errors.name = "Tell us your name.";
  if (!EMAIL.test(data.email)) errors.email = "Enter a valid email.";
  if (data.message.length < 10) errors.message = "A few more words, please.";
  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function validateEmail(raw: unknown) {
  const email = typeof raw === "string" ? raw.trim() : "";
  return EMAIL.test(email) ? { email, valid: true as const } : { email, valid: false as const };
}

export function makeReference(prefix: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${s}`;
}

/**
 * Single source of truth for the business. Replace these placeholders with
 * the real shop's details — every section reads from here.
 */
export const brand = {
  name: "PULP",
  fullName: "PULP Coffee Atelier",
  tagline: "Coffee is a fruit. We treat it like one.",
  issue: { number: "07", title: "Autumn Harvest", year: "2026" },
  nextIssue: { title: "Winter Reserve", date: "December 2026" },
  established: "2019",

  address: {
    street: "214 Calder Street",
    district: "Riverside District",
    city: "Brooklyn, NY 11249",
  },
  coordinates: { lat: 40.7211, lng: -73.9573, label: "40.7211° N — 73.9573° W" },

  phone: { display: "+1 (718) 555-0142", href: "tel:+17185550142" },
  email: { display: "hello@pulp.coffee", href: "mailto:hello@pulp.coffee" },
  instagram: { handle: "@pulp.atelier", href: "https://www.instagram.com/pulp.atelier/" },

  transit: [
    "L train to Bedford Av — 4 min walk",
    "Citi Bike dock on the corner of N 6th",
    "Step-free entrance & accessible restroom",
  ],
} as const;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${brand.coordinates.lat},${brand.coordinates.lng}`;
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${brand.coordinates.lat},${brand.coordinates.lng}&z=16&output=embed`;

/** 0 = Sunday … 6 = Saturday. Times are 24h "HH:MM". */
export type DayHours = { day: string; short: string; open: string; close: string };
export const hours: DayHours[] = [
  { day: "Sunday", short: "Sun", open: "08:00", close: "17:00" },
  { day: "Monday", short: "Mon", open: "07:00", close: "18:00" },
  { day: "Tuesday", short: "Tue", open: "07:00", close: "18:00" },
  { day: "Wednesday", short: "Wed", open: "07:00", close: "18:00" },
  { day: "Thursday", short: "Thu", open: "07:00", close: "21:00" },
  { day: "Friday", short: "Fri", open: "07:00", close: "18:00" },
  { day: "Saturday", short: "Sat", open: "08:00", close: "19:00" },
];

export const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function getOpenStatus(now: Date) {
  const today = hours[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = toMinutes(today.open);
  const close = toMinutes(today.close);
  if (mins >= open && mins < close) {
    return { isOpen: true, label: `Open now — until ${today.close}` };
  }
  if (mins < open) return { isOpen: false, label: `Closed — opens ${today.open}` };
  const tomorrow = hours[(now.getDay() + 1) % 7];
  return { isOpen: false, label: `Closed — opens ${tomorrow.short} ${tomorrow.open}` };
}

export const chapters = [
  { id: "top", num: "00", label: "Cover" },
  { id: "manifesto", num: "01", label: "Manifesto" },
  { id: "ritual", num: "02", label: "The Ritual" },
  { id: "menu", num: "03", label: "The List" },
  { id: "philosophy", num: "04", label: "Seed to Cup" },
  { id: "space", num: "05", label: "The Room" },
  { id: "moments", num: "06", label: "Contact Sheet" },
  { id: "community", num: "07", label: "Regulars" },
  { id: "visit", num: "08", label: "Visit" },
] as const;

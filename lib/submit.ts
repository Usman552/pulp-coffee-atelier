import { makeReference, validateContact, validateEmail, validateReservation } from "./forms";

/**
 * Demo submission layer. The site is hosted statically (GitHub Pages), so there is
 * no server: forms validate in the browser and return a confirmation reference.
 *
 * To go live, replace the body of `deliver()` with a call to your booking/email
 * provider (Resend, Formspree, OpenTable, a serverless function, …).
 */
type Result<T> = { ok: true; reference: string } | { ok: false; errors: T };

async function deliver(kind: string, payload: unknown) {
  await new Promise((r) => setTimeout(r, 700)); // simulate network
  if (process.env.NODE_ENV !== "production") console.info(`[${kind}]`, payload);
}

export async function submitReservation(raw: Parameters<typeof validateReservation>[0]): Promise<Result<Record<string, string>>> {
  const { data, errors, valid } = validateReservation(raw);
  if (!valid) return { ok: false, errors };
  const reference = makeReference("PULP");
  await deliver("reservation", { reference, ...data });
  return { ok: true, reference };
}

export async function submitContact(raw: Parameters<typeof validateContact>[0]): Promise<Result<Record<string, string>>> {
  const { data, errors, valid } = validateContact(raw);
  if (!valid) return { ok: false, errors };
  const reference = makeReference("MSG");
  await deliver("contact", { reference, ...data });
  return { ok: true, reference };
}

export async function submitSubscribe(email: unknown): Promise<{ ok: true } | { ok: false; error: string }> {
  const check = validateEmail(email);
  if (!check.valid) return { ok: false, error: "Enter a valid email." };
  await deliver("subscribe", check.email);
  return { ok: true };
}

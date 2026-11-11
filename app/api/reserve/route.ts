import { makeReference, validateReservation } from "@/lib/forms";

/**
 * Table reservation endpoint. Validates server-side and returns a booking
 * reference. Connect `deliver()` to your booking system or email provider.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  const { data, errors, valid } = validateReservation(body);
  if (!valid) return Response.json({ ok: false, errors }, { status: 422 });

  const reference = makeReference("PULP");
  await deliver({ reference, ...data });
  return Response.json({ ok: true, reference });
}

async function deliver(booking: Record<string, unknown>) {
  // Integration point: Resend / Postmark / OpenTable / Google Sheets, etc.
  console.info("[reservation]", JSON.stringify(booking));
}

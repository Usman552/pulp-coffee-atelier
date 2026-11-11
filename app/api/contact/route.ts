import { makeReference, validateContact } from "@/lib/forms";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  const { data, errors, valid } = validateContact(body);
  if (!valid) return Response.json({ ok: false, errors }, { status: 422 });

  const reference = makeReference("MSG");
  // Integration point: forward to the shop inbox via your email provider.
  console.info("[contact]", JSON.stringify({ reference, ...data }));
  return Response.json({ ok: true, reference });
}

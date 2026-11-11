import { validateEmail } from "@/lib/forms";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const { email, valid } = validateEmail(body.email);
  if (!valid) return Response.json({ ok: false, error: "Enter a valid email." }, { status: 422 });

  // Integration point: add to Mailchimp / Buttondown / ConvertKit list.
  console.info("[subscribe]", email);
  return Response.json({ ok: true });
}

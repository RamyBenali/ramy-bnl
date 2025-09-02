export async function onRequest(context) {
  const { request, env } = context;

  // CORS
  const corsHeaders = {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  const { name, email, subject, message, turnstileToken } = data;

  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ message: "Missing fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  // Vérif Turnstile
  const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET,
      response: turnstileToken,
      remoteip: request.headers.get("CF-Connecting-IP") || ""
    })
  });
  const verifyJson = await verifyRes.json();
  if (!verifyJson.success) {
    return new Response(JSON.stringify({ message: "Captcha failed" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  // Envoi email via MailChannels
  const mailPayload = {
    personalizations: [{ to: [{ email: env.TO_EMAIL }] }],
    from: { email: env.FROM_EMAIL, name: "Portfolio Contact" },
    reply_to: { email, name },
    subject: `[Portfolio] ${subject}`,
    content: [{
      type: "text/plain",
      value: `Nom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`
    }]
  };

  const r = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(mailPayload)
  });

  if (!r.ok) {
    const txt = await r.text();
    return new Response(JSON.stringify({ message: "Mail send failed", detail: txt }), {
      status: 502,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...corsHeaders }
  });
}

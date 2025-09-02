// /functions/contact.js
export async function onRequestPost({ request, env }) {
  try {
    // ---------- 0) Lecture & validation des champs ----------
    const { name, email, subject, message, token } = await request.json().catch(() => ({}));

    if (!name || !email || !subject || !message || !token) {
      return json({ ok: false, error: "missing_fields" }, 400);
    }
    // Petites limites anti-abus
    if (name.length > 120 || email.length > 200 || subject.length > 200 || message.length > 5000) {
      return json({ ok: false, error: "payload_too_large" }, 413);
    }

    // ---------- 1) Vérification Turnstile ----------
    if (!env.TURNSTILE_SECRET) {
      return json({ ok: false, error: "missing_turnstile_secret" }, 500);
    }
    const formData = new URLSearchParams();
    formData.append("secret", env.TURNSTILE_SECRET);
    formData.append("response", token);
    const ip = request.headers.get("CF-Connecting-IP");
    if (ip) formData.append("remoteip", ip);

    const verifyResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });
    const verifyJson = await verifyResp.json().catch(() => ({}));
    if (!verifyJson?.success) {
      return json({ ok: false, error: "turnstile_failed", details: verifyJson }, 400);
    }

    // ---------- 2) Envoi via Resend ----------
    if (!env.RESEND_API_KEY) {
      return json({ ok: false, error: "missing_resend_api_key" }, 500);
    }
    if (!env.CONTACT_TO) {
      return json({ ok: false, error: "missing_contact_to" }, 500);
    }

    const clean = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      subject: escapeHtml(subject),
      message: escapeHtml(message),
    };

    const textBody =
`New message from portfolio:

Name: ${clean.name}
Email: ${clean.email}
Subject: ${clean.subject}

Message:
${clean.message}`;

    const htmlBody =
`<h3>New message from portfolio</h3>
<p><strong>Name:</strong> ${clean.name}<br/>
<strong>Email:</strong> ${clean.email}<br/>
<strong>Subject:</strong> ${clean.subject}</p>
<pre style="white-space:pre-wrap;font-family:inherit">${clean.message}</pre>`;

    const resendPayload = {
      from: "Portfolio <onboarding@resend.dev>",
      to: [env.CONTACT_TO],
      subject: `[Portfolio] ${clean.subject} — ${clean.name}`,
      reply_to: clean.email,
      text: textBody,
      html: htmlBody,
    };

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    const rJson = await r.json().catch(() => ({}));
    if (!r.ok) {
      // rJson contient souvent { name, message } utile pour débug dans le dashboard
      return json({ ok: false, error: "resend_failed", details: rJson }, 502);
    }

    return json({ ok: true, id: rJson.id || null });
  } catch (err) {
    return json({ ok: false, error: "server_error", details: String(err) }, 500);
  }
}

// ---------- Helpers ----------
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function escapeHtml(s = "") {
  return s.replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]
  ));
}

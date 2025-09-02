// /functions/contact.js
export async function onRequestPost({ request, env }) {
  try {
    const { name, email, subject, message, token } = await request.json().catch(() => ({}));

    // Validation minimale
    if (!name || !email || !subject || !message || !token) {
      return json({ ok: false, error: "missing_fields" }, 400);
    }

    // 1) Vérif Turnstile
    const formData = new URLSearchParams();
    formData.append("secret", env.TURNSTILE_SECRET);
    formData.append("response", token);
    const ip = request.headers.get("CF-Connecting-IP");
    if (ip) formData.append("remoteip", ip);

    const verifyResp = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: formData }
    );
    const verifyJson = await verifyResp.json();
    if (!verifyJson.success) {
      return json({ ok: false, error: "turnstile_failed" }, 400);
    }

    // 2) Envoi email via MailChannels
    const mail = {
      personalizations: [{ to: [{ email: env.MAIL_TO }] }],
      from: { email: env.MAIL_FROM, name: "Portfolio Contact" },
      subject: `[Portfolio] ${subject} — ${name}`,
      content: [
        {
          type: "text/plain",
          value:
`Nom: ${name}
Email: ${email}
Sujet: ${subject}

Message:
${message}`
        },
        {
          type: "text/html",
          value:
`<h3>Nouveau message depuis le portfolio</h3>
<p><strong>Nom:</strong> ${escapeHtml(name)}<br/>
<strong>Email:</strong> ${escapeHtml(email)}<br/>
<strong>Sujet:</strong> ${escapeHtml(subject)}</p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`
        }
      ]
    };

    const mc = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(mail)
    });

    if (!mc.ok) {
      const txt = await mc.text();
      return json({ ok: false, error: "mail_send_failed", details: txt }, 500);
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: "server_error", details: String(err) }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json" }
  });
}

function escapeHtml(s = "") {
  return s.replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]
  ));
}

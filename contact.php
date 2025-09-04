<?php
// ============================================================================
// contact.php — handler simple pour le formulaire de contact (Resend + JSON)
// - Pas de Composer nécessaire (utilise cURL vers l'API Resend)
// - Répond toujours en JSON { ok: true/false, ... }
// - Compatible avec ton fetch('/contact.php')
// ============================================================================

// ----------- CONFIG ----------
const RESEND_API_KEY = 're_iaUkVPMN_DFrsxnMFasTvANPnDE8uLDaj'; // << remplace si besoin
const CONTACT_TO     = 'benali.ramy.2@gmail.com';              // destinataire final
// Facultatif : vérif Cloudflare Turnstile côté serveur (mets ta clé secrète ici)
const CF_SECRET_KEY  = '0x4AAAAAABxow386ItI7s5HfFW5mYeVvWMU'; // ex: '0x0000000000000000000000000000000AA'; laisse vide pour désactiver
// -----------------------------

header('Content-Type: application/json; charset=utf-8');
// Si tu sers le HTML depuis un autre domaine/port en dev, active CORS (optionnel) :
// header('Access-Control-Allow-Origin: http://localhost:5173');
// header('Access-Control-Allow-Headers: Content-Type');

try {
  // 1) Méthode + payload
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Méthode non autorisée']); exit;
  }

  $raw = file_get_contents('php://input');
  $data = json_decode($raw, true);
  if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'JSON invalide']); exit;
  }

  // 2) Honeypot anti-bot (si jamais envoyé)
  if (!empty($data['company'])) {
    echo json_encode(['ok' => true, 'ignored' => true]); exit;
  }

  // 3) Validation minimale
  $name    = trim($data['name'] ?? '');
  $email   = trim($data['email'] ?? '');
  $subject = trim($data['subject'] ?? '');
  $message = trim($data['message'] ?? '');
  $token   = trim($data['token'] ?? '');

  if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Champs manquants']); exit;
  }
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Email invalide']); exit;
  }

  // 4) Vérif (optionnelle) Cloudflare Turnstile côté serveur
  if (CF_SECRET_KEY !== '') {
    $verifyRes = verify_turnstile(CF_SECRET_KEY, $token);
    if (!$verifyRes['success']) {
      http_response_code(403);
      echo json_encode(['ok' => false, 'error' => 'Échec anti-bot', 'details' => $verifyRes]); exit;
    }
  }

  // 5) Prépare le mail (via Resend REST)
  $html = build_html_email($name, $email, $subject, nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')));

  $payload = [
    'from'    => 'onboarding@resend.dev',      // fonctionne pour tests; mets ton domaine vérifié en prod
    'to'      => CONTACT_TO,
    'reply_to'=> $email,                        // pour pouvoir répondre directement à l’expéditeur
    'subject' => "Portfolio – $subject",
    'html'    => $html
  ];

  $res = send_via_resend(RESEND_API_KEY, $payload);

  if ($res['http_code'] >= 200 && $res['http_code'] < 300) {
    echo json_encode(['ok' => true, 'id' => $res['json']['id'] ?? null]); exit;
  } else {
    http_response_code(502);
    echo json_encode([
      'ok'    => false,
      'error' => 'Erreur Resend',
      'code'  => $res['http_code'],
      'body'  => $res['body']
    ]); exit;
  }

} catch (Throwable $e) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Exception', 'details' => $e->getMessage()]);
  exit;
}


// ============================================================================
// Helpers
// ============================================================================

function build_html_email(string $name, string $email, string $subject, string $messageHtml): string {
  $now = date('Y-m-d H:i');
  $safeName  = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
  $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
  $safeSubj  = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');

  return <<<HTML
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.5;">
    <h2 style="margin:0 0 12px;">Nouveau message depuis le portfolio</h2>
    <p style="margin:0 0 4px;"><strong>Nom :</strong> {$safeName}</p>
    <p style="margin:0 0 4px;"><strong>Email :</strong> {$safeEmail}</p>
    <p style="margin:0 0 12px;"><strong>Sujet :</strong> {$safeSubj}</p>
    <div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px;">{$messageHtml}</div>
    <p style="color:#6b7280;margin-top:12px;font-size:12px;">Envoyé le {$now}</p>
  </div>
  HTML;
}

function send_via_resend(string $apiKey, array $payload): array {
  $ch = curl_init('https://api.resend.com/emails');

  $json = json_encode($payload);
  curl_setopt_array($ch, [
    CURLOPT_POST            => true,
    CURLOPT_HTTPHEADER      => [
      'Authorization: Bearer ' . $apiKey,
      'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS      => $json,
    CURLOPT_RETURNTRANSFER  => true,
    CURLOPT_TIMEOUT         => 10,      // évite de bloquer trop longtemps
    CURLOPT_CONNECTTIMEOUT  => 5
  ]);

  $body = curl_exec($ch);
  $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  $err  = curl_error($ch);
  curl_close($ch);

  $parsed = json_decode($body ?? '', true);
  return [
    'http_code' => $http ?: 0,
    'body'      => $err ? $err : $body,
    'json'      => is_array($parsed) ? $parsed : null
  ];
}

function verify_turnstile(string $secret, string $token): array {
  if ($token === '') return ['success' => false, 'reason' => 'missing-token'];

  $post = http_build_query([
    'secret'   => $secret,
    'response' => $token,
    'remoteip' => $_SERVER['REMOTE_ADDR'] ?? null
  ]);

  $opts = [
    'http' => [
      'method'  => 'POST',
      'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
      'content' => $post,
      'timeout' => 6
    ]
  ];
  $ctx  = stream_context_create($opts);
  $resp = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $ctx);
  if ($resp === false) return ['success' => false, 'reason' => 'cf-request-failed'];

  $json = json_decode($resp, true);
  return is_array($json) ? $json : ['success' => false, 'reason' => 'cf-bad-json'];
}

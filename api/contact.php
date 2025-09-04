<?php
// contact.php — endpoint JSON pour le formulaire (POST JSON)
// Utilise le SDK Resend si présent (comme ton snippet), sinon fallback cURL.
// Vérifie Turnstile et répond toujours en JSON rapidement.

////////////////////////////////////////////////////////////
// CONFIG
////////////////////////////////////////////////////////////
$RESEND_API_KEY   = getenv('RESEND_API_KEY')   ?: 're_iaUkVPMN_DFrsxnMFasTvANPnDE8uLDaj';
$CONTACT_TO       = getenv('CONTACT_TO')       ?: 'benali.ramy.2@gmail.com';
$TURNSTILE_SECRET = getenv('TURNSTILE_SECRET') ?: '0x4AAAAAABxow386ItI7s5HfFW5mYeVvWMU';

$FROM_EMAIL = 'onboarding@resend.dev';
$FROM_NAME  = 'Portfolio Contact';

////////////////////////////////////////////////////////////
// UTILS
////////////////////////////////////////////////////////////
function json_response($data, int $status = 200){
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('X-Content-Type-Options: nosniff');
  echo json_encode($data);
  exit;
}
function escape_html($s){ return htmlspecialchars((string)$s, ENT_QUOTES|ENT_SUBSTITUTE, 'UTF-8'); }

////////////////////////////////////////////////////////////
// METHOD
////////////////////////////////////////////////////////////
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
  json_response(['ok'=>false,'error'=>'method_not_allowed'],405);
}

////////////////////////////////////////////////////////////
// INPUT (JSON ou x-www-form-urlencoded)
////////////////////////////////////////////////////////////
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!is_array($body)) { $body = $_POST; }

$name    = trim($body['name']    ?? '');
$email   = trim($body['email']   ?? '');
$subject = trim($body['subject'] ?? '');
$message = trim($body['message'] ?? '');
$token   = trim($body['token']   ?? '');

if ($name==='' || $email==='' || $subject==='' || $message==='' || $token==='') {
  json_response(['ok'=>false,'error'=>'missing_fields'],400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(['ok'=>false,'error'=>'invalid_email'],400);
}
if (mb_strlen($name)>120 || mb_strlen($email)>200 || mb_strlen($subject)>200 || mb_strlen($message)>5000) {
  json_response(['ok'=>false,'error'=>'payload_too_large'],413);
}

////////////////////////////////////////////////////////////
// TURNSTILE (timeouts courts)
////////////////////////////////////////////////////////////
if (!$TURNSTILE_SECRET) json_response(['ok'=>false,'error'=>'missing_turnstile_secret'],500);

$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? null;
$tsFields = ['secret'=>$TURNSTILE_SECRET, 'response'=>$token];
if ($ip) $tsFields['remoteip'] = $ip;

$ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
curl_setopt_array($ch, [
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => http_build_query($tsFields),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT        => 6,
  CURLOPT_CONNECTTIMEOUT => 4,
]);
$tsResp = curl_exec($ch);
$tsErr  = curl_error($ch);
curl_close($ch);

if ($tsResp === false) {
  json_response(['ok'=>false,'error'=>'turnstile_request_failed','details'=>$tsErr],502);
}
$tsJson = json_decode($tsResp, true);
if (!$tsJson || empty($tsJson['success'])) {
  json_response(['ok'=>false,'error'=>'turnstile_failed','details'=>$tsJson],400);
}

////////////////////////////////////////////////////////////
// CONTENU MAIL
////////////////////////////////////////////////////////////
$clean = [
  'name'    => escape_html($name),
  'email'   => escape_html($email),
  'subject' => escape_html($subject),
  'message' => escape_html($message),
];

$textBody = "New message from portfolio:\n\n"
          . "Name: {$clean['name']}\n"
          . "Email: {$clean['email']}\n"
          . "Subject: {$clean['subject']}\n\n"
          . "Message:\n{$clean['message']}";

$htmlBody = '<p>New message from portfolio</p>'
          . '<p><strong>Name:</strong> '.$clean['name'].'<br>'
          . '<strong>Email:</strong> '.$clean['email'].'<br>'
          . '<strong>Subject:</strong> '.$clean['subject'].'</p>'
          . '<p style="white-space:pre-wrap;font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial">'
          . $clean['message']
          . '</p>';

if (!$RESEND_API_KEY || strpos($RESEND_API_KEY, 're_') !== 0) {
  json_response(['ok'=>false,'error'=>'missing_or_invalid_resend_api_key'],500);
}
if (!$CONTACT_TO) json_response(['ok'=>false,'error'=>'missing_contact_to'],500);

////////////////////////////////////////////////////////////
// ENVOI — 1) SDK Resend (ton snippet), 2) fallback cURL
////////////////////////////////////////////////////////////
$sent = false;
$respId = null;

// Tente le SDK Resend si installé
try {
  $autoload = __DIR__ . '/vendor/autoload.php';
  if (file_exists($autoload)) {
    require_once $autoload;
    if (class_exists('\Resend\Resend')) {
      $resend = \Resend\Resend::client($RESEND_API_KEY);

      // ====== EXACTEMENT l’esprit de ton snippet ======
      $res = $resend->emails->send([
        'from'     => $FROM_EMAIL, // ou "{$FROM_NAME} <{$FROM_EMAIL}>"
        'to'       => $CONTACT_TO,
        'subject'  => "[Portfolio] {$clean['subject']} — {$clean['name']}",
        'html'     => $htmlBody,   // tu peux ajouter 'text' si tu veux
        'reply_to' => $clean['email'],
      ]);
      // ================================================

      if ($res) {
        // selon versions : objet ou array
        $respId = is_array($res) ? ($res['id'] ?? null) : ($res->id ?? null);
        $sent = true;
      }
    }
  }
} catch (\Throwable $e) {
  // continue vers fallback
}

// Fallback cURL si SDK indisponible
if (!$sent) {
  $payload = [
    'from'     => "{$FROM_NAME} <{$FROM_EMAIL}>",
    'to'       => [$CONTACT_TO],
    'subject'  => "[Portfolio] {$clean['subject']} — {$clean['name']}",
    'reply_to' => $clean['email'],
    'html'     => $htmlBody,
    'text'     => $textBody,
  ];

  $ch = curl_init('https://api.resend.com/emails');
  curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_HTTPHEADER     => [
      'Authorization: Bearer '.$RESEND_API_KEY,
      'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 8,
    CURLOPT_CONNECTTIMEOUT => 5,
  ]);
  $rResp = curl_exec($ch);
  $rErr  = curl_error($ch);
  $rCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  if ($rResp === false) {
    json_response(['ok'=>false,'error'=>'resend_request_failed','details'=>$rErr],502);
  }
  $respJson = json_decode($rResp, true);
  if ($rCode < 200 || $rCode >= 300) {
    json_response(['ok'=>false,'error'=>'resend_failed','status'=>$rCode,'body'=>$respJson ?: $rResp],502);
  }
  $respId = $respJson['id'] ?? null;
}

json_response(['ok'=>true,'id'=>$respId]);

<?php
// contact.php — endpoint JSON pour le formulaire de contact
// PHP 7.4+ / 8.x, extension cURL activée

// ============ CONFIG ============
$RESEND_API_KEY   = getenv('RESEND_API_KEY') ?: 're_iaUkVPMN_DFrsxnMFasTvANPnDE8uLDaj';
$CONTACT_TO       = getenv('CONTACT_TO')      ?: 'benali.ramy.2@gmail.com';
$TURNSTILE_SECRET = getenv('TURNSTILE_SECRET')?: '0x4AAAAAABxow386ItI7s5HfFW5mYeVvWMU';

$FROM_EMAIL = 'onboarding@resend.dev';   // OK sans domaine vérifié
$FROM_NAME  = 'Portfolio Contact';

// ============ UTILS ============
function json_response($data, int $status = 200) {
  http_response_code($status);
  header('Content-Type: application/json; charset=utf-8');
  header('X-Content-Type-Options: nosniff');
  echo json_encode($data);
  exit;
}
function escape_html($s){ return htmlspecialchars((string)$s, ENT_QUOTES|ENT_SUBSTITUTE, 'UTF-8'); }

// Autoriser uniquement POST
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
  json_response(['ok'=>false,'error'=>'method_not_allowed'],405);
}

// Récup body JSON ou form-encoded
$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!is_array($body)) { $body = $_POST; }

// Champs
$name    = trim($body['name']    ?? '');
$email   = trim($body['email']   ?? '');
$subject = trim($body['subject'] ?? '');
$message = trim($body['message'] ?? '');
$token   = trim($body['token']   ?? ''); // Turnstile

// Validation
if ($name==='' || $email==='' || $subject==='' || $message==='' || $token==='') {
  json_response(['ok'=>false,'error'=>'missing_fields'],400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(['ok'=>false,'error'=>'invalid_email'],400);
}
if (mb_strlen($name)>120 || mb_strlen($email)>200 || mb_strlen($subject)>200 || mb_strlen($message)>5000) {
  json_response(['ok'=>false,'error'=>'payload_too_large'],413);
}

// ============ 1) Vérifier Turnstile ============
if (!$TURNSTILE_SECRET) {
  json_response(['ok'=>false,'error'=>'missing_turnstile_secret'],500);
}
$ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? null;

$tsFields = ['secret'=>$TURNSTILE_SECRET, 'response'=>$token];
if ($ip) $tsFields['remoteip'] = $ip;

$ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
curl_setopt_array($ch, [
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => http_build_query($tsFields),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT        => 10,
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

// ============ 2) Envoyer via Resend ============
if (!$RESEND_API_KEY || strpos($RESEND_API_KEY, 're_') !== 0) {
  json_response(['ok'=>false,'error'=>'missing_or_invalid_resend_api_key'],500);
}
if (!$CONTACT_TO) {
  json_response(['ok'=>false,'error'=>'missing_contact_to'],500);
}

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

$htmlBody = '<h3>New message from portfolio</h3>'
          . '<p><strong>Name:</strong> '.$clean['name'].'<br>'
          . '<strong>Email:</strong> '.$clean['email'].'<br>'
          . '<strong>Subject:</strong> '.$clean['subject'].'</p>'
          . '<pre style="white-space:pre-wrap;font-family:inherit;">'.$clean['message'].'</pre>';

$payload = [
  'from'     => "{$FROM_NAME} <{$FROM_EMAIL}>",
  'to'       => [ $CONTACT_TO ],
  'subject'  => "[Portfolio] {$clean['subject']} — {$clean['name']}",
  'reply_to' => $clean['email'], // tu pourras répondre direct
  'text'     => $textBody,
  'html'     => $htmlBody,
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
  CURLOPT_TIMEOUT        => 15,
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
  // Resend renvoie l’erreur utile ici
  json_response(['ok'=>false,'error'=>'resend_failed','status'=>$rCode,'body'=>$respJson ?: $rResp],502);
}

json_response(['ok'=>true,'id'=>$respJson['id'] ?? null]);

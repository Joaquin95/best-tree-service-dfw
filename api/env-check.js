export default function handler(req, res) {
  const hasSendGridKey =
    typeof process.env.SENDGRID_API_KEY === 'string' &&
    process.env.SENDGRID_API_KEY.startsWith('SG.');
  
  let hasValidServiceJson = false;
  try {
    JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '');
    hasValidServiceJson = true;
  } catch {}

  res.status(200).json({
    hasSendGridKey,
    hasServiceJson: hasValidServiceJson
  });
}

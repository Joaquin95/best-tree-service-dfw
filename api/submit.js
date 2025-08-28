import { GoogleSpreadsheet } from 'google-spreadsheet';
import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, message } = req.body;

  // append to Google Sheet
  const doc = new GoogleSpreadsheet(process.env.VITE_GOOGLE_SHEETS_ID);
  await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON));
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  await sheet.addRow({ name, email, message, date: new Date().toISOString() });

  // send confirmation email
  sgMail.setApiKey(process.env.VITE_SENDGRID_API_KEY);
  await sgMail.send({
    to: email,
    from: 'you@yourdomain.com',
    subject: 'Thanks for contacting Best Tree Service DFW',
    text: `Hi ${name}, we received your message: "${message}"`,
  });

  res.status(200).json({ success: true });
}
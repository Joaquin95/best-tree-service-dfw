import { GoogleSpreadsheet } from 'google-spreadsheet';
import sgMail from '@sendgrid/mail';


export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, phone, address, message } = req.body;
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);


  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // append to Google Sheet
 try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
    await doc.useServiceAccountAuth(
      JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    );
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      Name: name,
      Email: email,
      Phone: phone,
      Address: address,
      Message: message,
      SubmittedAt: new Date().toISOString(),
    });


  // send confirmation email
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
await sgMail.send({
  to: process.env.SENDGRID_OWNER_EMAIL,       // your inbox
  from: process.env.SENDGRID_FROM_EMAIL,      // a verified sender
  subject: `Best Tree Service DFW - New Estimate Request J.M. ${name}`, 
  text: `
Contact customer New Estimate Request J.M.

Name:    ${name}
Email:   ${email}
Phone:   ${phone}
Address: ${address}

Message:
${message}

Submitted at: ${new Date().toISOString()}
  `,
  html: `
    <h2>New Estimate Request</h2>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>Address:</strong> ${address}</li>
    </ul>
    <p><strong>Message:</strong></p>
    <blockquote>${message}</blockquote>
    <p>Submitted at: ${new Date().toISOString()}</p>
  `,
});


    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

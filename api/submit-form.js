import { GoogleSpreadsheet } from "google-spreadsheet";
import sgMail from "@sendgrid/mail";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  const { name, email, phone, address, message } = req.body;
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Parse service account credentials from env
    const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    // Authenticate & load the spreadsheet (v5 way)
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID, {
      auth: {
        client_email: creds.client_email,
        private_key: creds.private_key.replace(/\\n/g, "\n"),
      },
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Append a row
    await sheet.addRow({
      Name: name,
      Email: email,
      Phone: phone,
      Address: address,
      Message: message,
      SubmittedAt: new Date().toISOString(),
    });

    // Send notification email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const textBody = `
New estimate request received:

Name:    ${name}
Email:   ${email}
Phone:   ${phone}
Address: ${address}

Message:
${message}

Submitted at: ${new Date().toISOString()}
    `.trim();

    const htmlBody = `
      <h1>New Estimate Request</h1>
      <table cellpadding="5" border="1" style="border-collapse:collapse;">
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Address</strong></td><td>${address}</td></tr>
      </table>
      <h2>Message</h2>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <p><em>Submitted at: ${new Date().toISOString()}</em></p>
    `;

    await sgMail.send({
      to: process.env.SENDGRID_OWNER_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Best Tree Service DFW – Estimate Request from ${name}`,
      text: textBody,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

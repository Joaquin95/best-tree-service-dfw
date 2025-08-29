import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { GoogleSpreadsheet } = require("google-spreadsheet");
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
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID, {
      auth: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
    });

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      Name: name,
      Email: email,
      Phone: phone,
      Address: address,
      Message: message || "",
      SubmittedAt: new Date().toISOString(),
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const textBody = `
      New estimate request:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Address: ${address}
      Message: ${message || "N/A"}
    `;

    const htmlBody = `
      <h2>New Estimate Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
      <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
    `;

    await sgMail.send({
      to: process.env.SENDGRID_OWNER_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Estimate request from ${name}`,
      text: textBody,
      html: htmlBody,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

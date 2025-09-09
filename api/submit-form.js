import { google } from "googleapis";
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
    const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    const jwtClient = new google.auth.JWT({
      email: creds.client_email,
      key: creds.private_key.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    await jwtClient.authorize();

    const now = new Date();
    const formattedTime = now.toLocaleString("en-US", {
      timeZone: "America/Chicago",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const sheets = google.sheets({ version: "v4", auth: jwtClient });
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Sheet1!A:F",
      valueInputOption: "RAW",
      requestBody: {
        values: [[name, email, phone, address, message || "", formattedTime]],
      },
    });

    // send your notification email
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    await sgMail.send({
      to: process.env.SENDGRID_OWNER_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `Best Tree Service DFW - New Estimate request 📩 - J.M`,
      text: `New request from ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nMessage: ${
        message || "N/A"
      }`,
      html: `<h2>New Estimate Request</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Message:</strong> ${message || "N/A"}</p>
                <p><em>Submitted at: ${new Date().toISOString()}</em></p>`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Submission error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

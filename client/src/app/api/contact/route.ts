import "server-only";
import nodemailer from "nodemailer";
import { jsonError } from "@/lib/server/http";

// Still unwired: components/Contact.tsx composes a mailto: link rather than
// POSTing here. Kept so the endpoint is ready if you ever wire it up.
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json().catch(() => ({}));

    if (!name || !email || !message) {
      return Response.json(
        { message: "Name, email, and message are all required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: message,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return Response.json(
      { message: "Could not send message right now." },
      { status: 500 }
    );
  }
}

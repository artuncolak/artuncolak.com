import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_TO, EMAIL_USER } from '@lib/config';
import { ContactRequest } from '@lib/models';
import nodemailer from 'nodemailer';

export async function sendEmail({ name, email, message }: ContactRequest) {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  await transporter.sendMail({
    from: `${name} <${EMAIL_USER}>`,
    to: EMAIL_TO,
    cc: email,
    subject: `You have a message from ${name}`,
    text: message
  });
}

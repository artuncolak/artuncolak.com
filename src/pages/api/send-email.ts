import { sendEmail } from '@lib/contact';
import { ContactRequest } from '@lib/models';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, message, email }: ContactRequest = req.body;

  if (!name || !message || !email) {
    return res
      .status(400)
      .json({ error: 'Bad Request', message: 'All fields must be filled' });
  }

  try {
    await sendEmail(req.body);

    res.status(200).json({ message: 'Sent' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
}

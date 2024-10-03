import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  console.log('token', token);
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({ token });
}

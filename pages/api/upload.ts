import { cloudinary } from '@/utils/cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLowerCase() !== 'post') {
    return res.status(405).end();
  }

  const { data } = req.body;

  try {
    const url = new URL(data).toString();

    const img = await cloudinary.uploader.upload(url);

    res.json({ publicId: img.public_id, url: img.secure_url });
  } catch (error) {
    res.status(400).json({ message: 'Invalid URL' });
  }
}

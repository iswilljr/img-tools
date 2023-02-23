import { cloudinary } from '@/utils/cloudinary';
import { getResourceFromPublicId } from '@/utils/get-resource';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLowerCase() !== 'post') {
    return res.status(405).end();
  }

  const { publicId, width, height, x, y } = req.body;

  try {
    if (typeof publicId !== 'string') throw Error('Invalid publicId param');

    const isValid = [width, height, x, y].every(value => typeof value === 'number');

    if (!isValid) throw Error('Expected values to be type number');

    const resource = await getResourceFromPublicId(publicId);

    const croppedImageUrl = cloudinary.url(resource.publicId, {
      crop: 'crop',
      width: Math.round(width),
      height: Math.round(height),
      x: Math.round(x),
      y: Math.round(y),
    });

    const img = await cloudinary.uploader.upload(croppedImageUrl);

    res.json({ publicId: img.public_id, url: img.secure_url });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

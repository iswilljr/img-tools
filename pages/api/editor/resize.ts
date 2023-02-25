import { cloudinary } from '@/utils/cloudinary';
import { getResourceFromPublicId } from '@/utils/get-resource';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLowerCase() !== 'post') {
    return res.status(405).end();
  }

  const { publicId, color, width, height } = req.body;

  try {
    if (typeof publicId !== 'string' || typeof color !== 'string') {
      throw Error('Invalid publicId or color param to be type string');
    }

    if (typeof width !== 'number' || typeof height !== 'number') {
      throw Error('Invalid width or height param to be type number');
    }

    const resource = await getResourceFromPublicId(publicId);

    const compressedImageUrl = cloudinary.url(resource.publicId, {
      crop: 'pad',
      background: `rgb:${color.replace('#', '')}`,
      width,
      height,
    });

    const img = await cloudinary.uploader.upload(compressedImageUrl);

    res.json({ publicId: img.public_id, url: img.secure_url });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

import { cloudinary } from '@/utils/cloudinary';
import { getResourceFromPublicId } from '@/utils/get-resource';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toLowerCase() !== 'post') {
    return res.status(405).end();
  }

  const { publicId, quality, format } = req.body;

  try {
    if (typeof publicId !== 'string') throw Error('Invalid publicId param');
    if (typeof quality !== 'number') throw Error('Invalid quality param');
    if (typeof format !== 'string') throw Error('Invalid format param');

    const resource = await getResourceFromPublicId(publicId);

    const compressedImageUrl = cloudinary.url(resource.publicId, {
      fetch_format: format,
      quality,
    });

    const img = await cloudinary.uploader.upload(compressedImageUrl);

    res.json({ publicId: img.public_id, url: img.secure_url });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

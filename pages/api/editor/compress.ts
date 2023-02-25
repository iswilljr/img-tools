import { cloudinary } from '@/utils/cloudinary';
import { getResourceFromPublicId } from '@/utils/get-resource';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if (req.method?.toLowerCase() !== 'post') {
  //   return res.status(405).end();
  // }

  const { publicId, quality } = req.body;

  try {
    if (typeof publicId !== 'string') throw Error('Invalid publicId param');
    // if (typeof quality !== 'number') throw Error('Invalid quality param');

    const resource = await getResourceFromPublicId(publicId);

    const compressedImageUrl = cloudinary.url(resource.publicId, {
      quality,
    });

    const img = await cloudinary.uploader.upload(compressedImageUrl);

    res.json({ publicId: img.public_id, url: img.secure_url });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

import { z } from 'zod';
import { apiHandler } from '@/utils/api-handler';
import { cloudinary } from '@/utils/cloudinary';
import { getResourceFromPublicId } from '@/utils/get-resource';
import type { NextApiRequest, NextApiResponse } from 'next';

const bodySchema = z.object({
  publicId: z.string(),
  quality: z.number().min(5).max(100),
  format: z.enum(['png', 'jpg', 'webp', 'avif']),
});

async function compressImage(req: NextApiRequest, res: NextApiResponse<BaseResponse>) {
  const { publicId, quality, format } = bodySchema.parse(req.body);

  const resource = await getResourceFromPublicId(publicId);

  const compressedImageUrl = cloudinary.url(resource.publicId, {
    fetch_format: format,
    quality,
  });

  const img = await cloudinary.uploader.upload(compressedImageUrl);

  res.json({ publicId: img.public_id, url: img.secure_url });
}

export default apiHandler(compressImage);

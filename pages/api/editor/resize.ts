import { z } from 'zod';
import { apiHandler } from '@/utils/api-handler';
import { cloudinary } from '@/utils/cloudinary';
import { getResourceFromPublicId } from '@/utils/get-resource';
import type { NextApiRequest, NextApiResponse } from 'next';

const bodySchema = z.object({
  publicId: z.string(),
  color: z.string().regex(/^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i, {
    message: 'Color should be a hex color',
  }),
  width: z.number(),
  height: z.number(),
});

async function resizeImage(req: NextApiRequest, res: NextApiResponse<BaseResponse>) {
  const { publicId, color, width, height } = bodySchema.parse(req.body);

  const resource = await getResourceFromPublicId(publicId);

  const compressedImageUrl = cloudinary.url(resource.publicId, {
    crop: 'pad',
    background: `rgb:${color.replace('#', '')}`,
    width,
    height,
  });

  const img = await cloudinary.uploader.upload(compressedImageUrl);

  res.json({ publicId: img.public_id, url: img.secure_url });
}

export default apiHandler(resizeImage);

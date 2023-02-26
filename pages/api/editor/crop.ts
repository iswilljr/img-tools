import { z } from 'zod';
import { apiHandler } from '@/utils/api-handler';
import { cloudinary } from '@/utils/cloudinary';
import { getResourceFromPublicId } from '@/utils/get-resource';
import type { NextApiRequest, NextApiResponse } from 'next';

const bodySchema = z.object({
  publicId: z.string(),
  width: z.number().transform(Math.round),
  height: z.number().transform(Math.round),
  x: z.number().transform(Math.round),
  y: z.number().transform(Math.round),
});

async function cropImage(req: NextApiRequest, res: NextApiResponse<BaseResponse>) {
  const { publicId, width, height, x, y } = bodySchema.parse(req.body);

  const resource = await getResourceFromPublicId(publicId);

  const croppedImageUrl = cloudinary.url(resource.publicId, {
    crop: 'crop',
    width,
    height,
    x,
    y,
  });

  const img = await cloudinary.uploader.upload(croppedImageUrl);

  res.json({ publicId: img.public_id, url: img.secure_url });
}

export default apiHandler(cropImage);

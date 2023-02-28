import { z } from 'zod';
import { apiHandler } from '@/utils/api-handler';
import { cloudinary } from '@/utils/cloudinary';
import { getResourceFromPublicId } from '@/utils/get-resource';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ResizeBody = z.infer<typeof resizeBodySchema>;

const resizeBodySchema = z.object({
  publicId: z.string(),
  background: z.string().regex(/^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i, {
    message: 'Background should be a hex color',
  }),
  width: z.number(),
  height: z.number(),
});

async function resizeImage(req: NextApiRequest, res: NextApiResponse<BaseResponse>) {
  const { publicId, background, width, height } = resizeBodySchema.parse(req.body);

  const resource = await getResourceFromPublicId(publicId);

  const compressedImageUrl = cloudinary.url(resource.publicId, {
    crop: 'pad',
    background,
    width,
    height,
  });

  const img = await cloudinary.uploader.upload(compressedImageUrl);

  res.json({ publicId: img.public_id, url: img.secure_url });
}

export default apiHandler(resizeImage);

import { z } from 'zod';
import { apiHandler } from '@/utils/api-handler';
import { cloudinary } from '@/utils/cloudinary';
import { getResourceFromPublicId } from '@/utils/get-resource';
import { formats } from '@/utils/formats';
import type { NextApiRequest, NextApiResponse } from 'next';

export type ConvertBody = z.infer<typeof convertBodySchema>;

const convertBodySchema = z.object({
  publicId: z.string(),
  format: z.enum(formats),
});

async function convertImage(req: NextApiRequest, res: NextApiResponse<BaseResponse>) {
  const { publicId, format } = convertBodySchema.parse(req.body);

  const resource = await getResourceFromPublicId(publicId);

  const compressedImageUrl = cloudinary.url(resource.publicId, {
    fetch_format: format,
  });

  const img = await cloudinary.uploader.upload(compressedImageUrl).catch(() => null);

  if (img === null) throw Error(`Could not transform to ${format}`);

  res.json({ publicId: img.public_id, url: img.secure_url });
}

export default apiHandler(convertImage);

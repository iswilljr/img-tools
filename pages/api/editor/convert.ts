import { z } from 'zod';
import { apiHandler } from '@/utils/api-handler';
import { cloudinary } from '@/utils/cloudinary';
import { getResourceFromPublicId } from '@/utils/get-resource';
import { formats } from '@/utils/formats';
import type { NextApiRequest, NextApiResponse } from 'next';

const bodySchema = z.object({
  publicId: z.string(),
  format: z.enum(formats),
});

async function compressImage(req: NextApiRequest, res: NextApiResponse<BaseResponse>) {
  const { publicId, format } = bodySchema.parse(req.body);

  const resource = await getResourceFromPublicId(publicId);

  const compressedImageUrl = cloudinary.url(resource.publicId, {
    fetch_format: format,
  });

  const img = await cloudinary.uploader.upload(compressedImageUrl).catch(() => null);

  if (img === null) throw Error(`Could not transform to ${format}`);

  res.json({ publicId: img.public_id, url: img.secure_url });
}

export default apiHandler(compressImage);

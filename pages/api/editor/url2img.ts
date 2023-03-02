import { z } from 'zod';
import { apiHandler } from '@/utils/api-handler';
import { cloudinary } from '@/utils/cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

export type Url2ImgBody = z.infer<typeof url2imgBodySchema>;

const url2imgBodySchema = z.object({
  url: z.string().url(),
});

async function convertUrlToImage(req: NextApiRequest, res: NextApiResponse<BaseResponse>) {
  const { url } = url2imgBodySchema.parse(req.body);

  const compressedImageUrl = cloudinary.url(url, {
    type: 'url2png',
    cloud_name: process.env.CLOUD_NAME,
  });

  const img = await cloudinary.uploader.upload(compressedImageUrl);

  res.json({ publicId: img.public_id, url: img.secure_url });
}

export default apiHandler(convertUrlToImage);

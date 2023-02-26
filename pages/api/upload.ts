import { z } from 'zod';
import { apiHandler } from '@/utils/api-handler';
import { cloudinary } from '@/utils/cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

const bodySchema = z.object({
  data: z.string().url(),
});

async function uploadFile(req: NextApiRequest, res: NextApiResponse<BaseResponse>) {
  const { data } = bodySchema.parse(req.body);

  const img = await cloudinary.uploader.upload(data);

  res.json({ publicId: img.public_id, url: img.secure_url });
}

export default apiHandler(uploadFile);

import { cloudinary } from './cloudinary';

export const getResourceFromPublicId = async (publicId: unknown) => {
  if (typeof publicId !== 'string' || !publicId) throw Error('Invalid publicId param');

  const {
    secure_url: url,
    width,
    height,
  } = await cloudinary.api.resource(publicId).catch(() => {
    throw new Error('Resource not found');
  });

  return { url, width, height, publicId };
};

import { cloudinary } from './cloudinary';
import type { UploadApiResponse } from 'cloudinary';

export const getResourceFromPublicId = (publicId: string): Promise<UploadApiResponse> => {
  return cloudinary.api.resource(publicId).catch(() => {
    throw new Error('Resource not found');
  });
};

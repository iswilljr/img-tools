import { Cloudinary } from '@cloudinary/url-gen';

export const generator = new Cloudinary({ cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME } });

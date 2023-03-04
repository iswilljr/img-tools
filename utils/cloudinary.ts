import { Cloudinary } from '@cloudinary/url-gen';
import { v2 as cloudinary } from 'cloudinary';

export const config = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const generator = new Cloudinary({ cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME } });

export { cloudinary };

export type Format = (typeof formats)[number];

export const formats = [
  'avif',
  'bmp',
  'eps',
  'gif',
  'heic',
  'ico',
  'jpg',
  'png',
  'svg',
  'tga',
  'tiff',
  'webp',
] as const;

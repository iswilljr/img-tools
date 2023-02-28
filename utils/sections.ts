import type { SectionProps } from '@/components/Section';
import { IconArrowsMaximize, IconArrowsMinimize, IconCrop, IconPhoto, IconRotate } from '@tabler/icons-react';

export const sections: SectionProps[] = [
  {
    title: 'Crop',
    description:
      'Lead the eye to a certain part of your photo by using the image cropping tool. The easy to use editor allows you to crop image and photo files with a set ratio, custom sizes, and more.',
    tryItOut: '/crop',
    icon: IconCrop,
  },
  {
    title: 'Rotate',
    description:
      'Your image is upside down or inverted? This editing tool will allow you to rotate an image or mirror image files vertically and horizontally.',
    tryItOut: '/rotate',
    icon: IconRotate,
  },
  {
    title: 'Compress',
    description:
      'Change the file size of any image. With this image compressor, you can easily change the actual file size of your photos, pictures, and other image files!',
    tryItOut: '/compress',
    icon: IconArrowsMinimize,
  },
  {
    title: 'Resize',
    description:
      'This image editing tool will help you to resize image files online. Resize an image using the width and/or height in pixels.',
    tryItOut: '/resize',
    icon: IconArrowsMaximize,
  },
  {
    title: 'Convert',
    description:
      'This image converter allows you to convert your pictures into other image formats. Convert JPG to PNG, JPG to SVG, PNG to WEBP and more.',
    tryItOut: '/convert',
    icon: IconPhoto,
  },
];

import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconCrop,
  IconDroplet,
  IconPhoto,
  IconRotate,
  IconVideo,
} from '@tabler/icons-react';

export const sections = [
  {
    title: 'Crop',
    description:
      'Lead the eye to a certain part of your photo by using the image cropping tool. The easy to use editor allows you to crop image and photo files with a set ratio, custom sizes, and more.',
    tryItOut: '/crop',
    label: 'Crop',
    icon: IconCrop,
  },
  {
    title: 'Rotate',
    description:
      'Your image is upside down or inverted? This editing tool will allow you to rotate an image or mirror image files vertically and horizontally.',
    label: 'Rotate',
    tryItOut: '/rotate',
    icon: IconRotate,
  },
  {
    title: 'Watermark',
    description:
      'With this online photo editor, you can remove different types of watermarks from your photos, pictures, and other images.',
    label: 'Watermark',
    tryItOut: '/watermark',
    icon: IconDroplet,
  },
  {
    title: 'Compress',
    description:
      'Change the file size of any image. With this image compressor, you can easily change the actual file size of your photos, pictures, and other image files!',
    label: 'Compress',
    tryItOut: '/compress',
    icon: IconArrowsMinimize,
  },
  {
    title: 'Resize',
    description:
      'This image editing tool will help you to resize image files online. Resize an image using the width and/or height in pixels.',
    label: 'Resize',
    tryItOut: '/resize',
    icon: IconArrowsMaximize,
  },
  {
    title: 'Convert Image',
    label: 'Convert',
    description:
      'This image converter allows you to convert your pictures into other image formats. Convert JPG to PNG, JPG to SVG, PNG to WEBP and more..',
    tryItOut: '/convert',
    icon: IconPhoto,
  },
  {
    title: 'Convert to GIF',
    description:
      'Animated GIFs are amazing and now you can turn your video into animated GIF! No matter if you have an AVI, MP4, MOV or even 3GP video, create animated GIFs here!',
    label: 'Video',
    tryItOut: '/convert?to=gif',
    icon: IconVideo,
  },
];

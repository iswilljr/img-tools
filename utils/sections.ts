import type { SectionProps } from '@/components/Section';
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconCrop,
  IconLink,
  IconPhoto,
  IconRotate,
  IconTexture,
} from '@tabler/icons-react';
import { tools, urlToImg } from './tools';

export const sections: SectionProps[] = [
  {
    title: 'Remove Bg',
    description: tools['remove-bg'].description,
    tryItOut: '/remove-bg',
    icon: IconTexture,
  },
  {
    title: 'URL to Img',
    description: urlToImg.description,
    tryItOut: '/url-2-img',
    icon: IconLink,
  },
  {
    title: 'Crop',
    description: tools.crop.description,
    tryItOut: '/crop',
    icon: IconCrop,
  },
  {
    title: 'Rotate',
    description: tools.rotate.description,
    tryItOut: '/rotate',
    icon: IconRotate,
  },
  {
    title: 'Compress',
    description: tools.compress.description,
    tryItOut: '/compress',
    icon: IconArrowsMinimize,
  },
  {
    title: 'Resize',
    description: tools.resize.description,
    tryItOut: '/resize',
    icon: IconArrowsMaximize,
  },
  {
    title: 'Convert',
    description: tools.convert.description,
    tryItOut: '/convert',
    icon: IconPhoto,
  },
];

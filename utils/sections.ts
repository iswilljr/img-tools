import type { SectionProps } from '@/components/Section';
import { IconArrowsMaximize, IconArrowsMinimize, IconCrop, IconPhoto, IconRotate } from '@tabler/icons-react';
import { tools } from './tools';

export const sections: SectionProps[] = [
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

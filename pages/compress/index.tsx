import { SectionHome } from '@/components/SectionHome';

const guide = {
  title: 'How To Crop an Image?',
  step: 'Draw a crop rectangle on the image.',
};

export default function RotateHome() {
  return (
    <SectionHome
      title="Compress Images Online"
      description="Reduce the size of an image by adjusting its quality."
      highlight="compress"
      editor="compress"
      guide={guide}
    />
  );
}

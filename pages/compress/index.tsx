import { SectionHome } from '@/components/SectionHome';

const guide = {
  title: 'How to Compress an Image?',
  step: 'Adjust the quality and select the exported format.',
};

export default function CompressHome() {
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

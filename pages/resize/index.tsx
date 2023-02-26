import { SectionHome } from '@/components/SectionHome';

const guide = {
  title: 'How To Crop an Image?',
  step: 'Draw a crop rectangle on the image.',
};

export default function RotateHome() {
  return (
    <SectionHome
      title="Resize Image Files Online"
      description="Change the size of an image online, from anywhere, and completely for free."
      highlight="resize"
      editor="resize"
      guide={guide}
    />
  );
}

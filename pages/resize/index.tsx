import { SectionHome } from '@/components/SectionHome';

const guide = {
  title: 'How To Resize an Image?',
  step: 'Enter a new target size for your image.',
};

export default function ResizeHome() {
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

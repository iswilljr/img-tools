import { SectionHome } from '@/components/SectionHome';

const guide = {
  title: 'How to Rotate an Image?',
  step: 'Click on the rotate buttons to rotate the image.',
};

export default function RotateHome() {
  return (
    <SectionHome
      title="Mirror And Rotate Image Online"
      description="Rotate your image to the left or right, mirror it vertically or horizontally."
      highlight="rotate|mirror"
      editor="rotate"
      guide={guide}
    />
  );
}

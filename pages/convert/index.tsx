import { SectionHome } from '@/components/SectionHome';

const guide = {
  title: 'How to Convert an Image?',
  step: 'Choose the image format you want to convert your picture to from the menu.',
};

export default function ConvertHome() {
  return (
    <SectionHome
      title="Convert Image To Image Online"
      description="Convert JPG to PNG, JPG to WEBP, PNG to GIF and more."
      highlight="convert"
      editor="convert"
      guide={guide}
    />
  );
}

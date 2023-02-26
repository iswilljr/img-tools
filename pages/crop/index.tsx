import { SectionHome } from '@/components/SectionHome';

const guide = {
  title: 'How To Crop an Image?',
  step: 'Draw a crop rectangle on the image.',
};

export default function CropHome() {
  return (
    <SectionHome
      title="Online Image Cropping Tool"
      description="Crop pictures online to get an exact cutout of the photo you want."
      highlight="cropping"
      editor="crop"
      guide={guide}
    />
  );
}

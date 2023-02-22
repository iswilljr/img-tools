import { Dropzone } from '@/components/Dropzone';
import { SectionInfo } from '@/components/SectionInfo';
import { uploadFile } from '@/utils/upload';
import { useRouter } from 'next/router';

export default function CropHome() {
  const router = useRouter();

  return (
    <>
      <SectionInfo
        title="Online Image Cropping Tool"
        description="Crop pictures online to get an exact cutout of the photo you want."
        highlight="cropping"
      />
      <Dropzone
        accept={{ 'image/*': [] }}
        onFileAccepted={async file => {
          const { publicId } = await uploadFile(file);
          router.push(`/crop/${publicId}`);
        }}
      />
    </>
  );
}

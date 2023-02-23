import { Dropzone, type DropzoneProps } from '@/components/Dropzone';
import { SectionInfo, type SectionInfoProps } from '@/components/SectionInfo';
import { uploadFile } from '@/utils/upload';
import { useRouter } from 'next/router';

interface SectionHomeProps extends SectionInfoProps, Partial<DropzoneProps> {
  editor?: string;
}

export function SectionHome({ title, description, highlight, accept, onFileAccepted, editor }: SectionHomeProps) {
  const router = useRouter();

  const defaultHandler = async (file: File) => {
    if (!editor) return;

    const { publicId } = await uploadFile(file);
    router.push(`/${editor}/${publicId}`);
  };

  return (
    <>
      <SectionInfo {...{ title, description, highlight }} />
      <Dropzone accept={{ 'image/*': [], ...accept }} onFileAccepted={onFileAccepted ?? defaultHandler} />
    </>
  );
}

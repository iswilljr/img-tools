import Image from 'next/image';
import Link from 'next/link';
import { Dropzone } from '@/components/Dropzone';
import { ToolInfo, type ToolInfoProps } from '@/components/ToolInfo';
import { uploadFile } from '@/utils/upload';
import { useRouter } from 'next/router';
import { Translate } from './Translate';
import { Guide, type GuideProps } from './Guide';

export interface ToolProps extends ToolInfoProps {
  editor: string;
  guide: Omit<GuideProps, 'editor' | 'withChooseImageStep'>;
}

export function Tool({ title, description, shortDescription, highlight, editor, guide }: ToolProps) {
  const router = useRouter();

  const label = `${editor} the example image`;

  const defaultHandler = async (file: File) => {
    const { publicId } = await uploadFile(file);
    router.push(`/${editor}/${publicId}`);
  };

  return (
    <Translate>
      <ToolInfo {...{ title, description, shortDescription, highlight }} />
      <Dropzone accept={{ 'image/*': [] }} onFileAccepted={defaultHandler} />
      <div className="mx-auto mt-2 w-full max-w-md px-6 sm:max-w-4xl">
        <p className="flex items-center justify-center text-center">
          No image? Try this one:
          <Link
            className="ml-2 flex items-center justify-center duration-75 hover:scale-105"
            href={`/${editor}/example`}
            aria-label={label}
          >
            <Image src="/favicon.png" width={25} height={25} alt={label} />
          </Link>
        </p>
      </div>
      <Guide editor={editor} {...guide} />
    </Translate>
  );
}

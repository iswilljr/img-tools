/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Image from 'next/image';
import Link from 'next/link';
import { Dropzone } from '@/components/Dropzone';
import { ToolInfo, type ToolInfoProps } from '@/components/ToolInfo';
import { uploadFile } from '@/utils/upload';
import { useRouter } from 'next/router';
import { Translate } from './Translate';

export interface ToolProps extends ToolInfoProps {
  editor: string;
  guide: {
    title: string;
    step: string;
    buttonLabel?: string;
    label?: string;
  };
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
      <div className="mx-auto mt-10 w-fit max-w-md px-6 pb-10 sm:max-w-4xl">
        <h2 className="text-center text-3xl font-bold">{guide.title}</h2>
        <ol className="mt-3 list-inside list-decimal space-y-2 text-left">
          <li>
            Click on the <strong className="font-bold">&quot;Choose Your Image&quot;</strong> button to load your image.
          </li>
          <li>{guide.step}</li>
          <li>
            Click the{' '}
            <strong className="font-bold">
              &quot;{guide.buttonLabel ?? `${editor.at(0)!.toUpperCase()}${editor.slice(1)}`}&quot;
            </strong>{' '}
            button to {guide.label ?? editor} your image.
          </li>
        </ol>
      </div>
    </Translate>
  );
}

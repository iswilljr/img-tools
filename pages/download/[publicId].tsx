import Link from 'next/link';
import { IconDownload, IconPencil, IconRotate } from '@tabler/icons-react';
import { getResourceFromPublicId } from '@/utils/get-resource';
import { downloadImage } from '@/utils/download-image';
import { Button } from '@/components/Button';
import { ToolInfo } from '@/components/ToolInfo';
import { sections } from '@/utils/sections';
import type { GetServerSideProps } from 'next';
import type { SectionProps } from '@/components/Section';

interface Action extends SectionProps {
  publicId?: string;
}

interface DownloadProps {
  result: BaseProps;
  from?: BaseProps | null;
  editor?: string | null;
}

const actions: Action[] = sections.slice(2).map(section => ({
  ...section,
  title: `${section.title} this image`,
}));

export default function Download({ result, from, editor }: DownloadProps) {
  const actionButtons =
    from && editor
      ? [
          { icon: IconPencil, title: 'Re-edit this image', tryItOut: `/${editor}`, publicId: from.publicId },
          {
            icon: IconRotate,
            title: `${editor.charAt(0).toUpperCase()}${editor.slice(1)} another image`,
            tryItOut: `/${editor}`,
            publicId: '',
          },
          ...actions,
        ]
      : actions;

  return (
    <>
      <ToolInfo
        title="Download your image"
        description="Click the download button to save your image"
        highlight="download"
      />
      <Button
        className=" mx-auto mt-20 flex !w-fit items-center justify-center px-12"
        icon={<IconDownload />}
        onClick={() => downloadImage(result.url)}
      >
        Download
      </Button>
      <div className="mx-auto w-fit max-w-md px-6 pb-6 sm:max-w-4xl">
        <ul className="mx-auto mt-6 flex w-fit flex-wrap items-center justify-center gap-2">
          {actionButtons.map(action => (
            <li key={action.title} className="flex w-full items-center justify-center sm:w-fit">
              <Link
                className="flex w-full items-center justify-center rounded-md bg-primary-6 p-1 hover:bg-primary-5"
                href={`${action.tryItOut}/${action.publicId ?? result.publicId}`}
                aria-label={action.title}
              >
                <span className="mr-2">
                  <action.icon />
                </span>
                {action.title}
              </Link>
            </li>
          ))}
        </ul>
        {from && (
          <div className="mx-auto mt-6 flex items-center justify-between gap-2 sm:justify-center sm:gap-20">
            <div className="text-left">
              <p>
                Original: <strong>{`${from.width}x${from.height}`}</strong>
              </p>
              <p>
                Size: <strong>{(from.bytes / 1000).toFixed(2)} KB</strong>
              </p>
            </div>
            <div className="text-right">
              <p>
                Output: <strong>{`${result.width}x${result.height}`}</strong>
              </p>
              <p>
                Size: <strong>{(result.bytes / 1000).toFixed(2)} KB</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<DownloadProps> = async ({ query }) => {
  const { publicId, from, editor } = query;

  try {
    if (typeof publicId !== 'string') throw Error('Invalid publicId param');
    if (from && typeof from !== 'string') throw Error('Invalid from param');
    if (editor && typeof editor !== 'string') throw Error('Invalid editor param');

    const [resultResource, fromResource] = await Promise.all([
      getResourceFromPublicId(publicId),
      from ? getResourceFromPublicId(from) : Promise.resolve(null),
    ]);

    return {
      props: {
        result: resultResource,
        from: fromResource,
        editor: editor && sections.map(section => section.title.toLowerCase()).includes(editor) ? editor : null,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

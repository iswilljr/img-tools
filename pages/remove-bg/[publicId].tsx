import axios from 'redaxios';
import { useEffect, useState } from 'react';
import { IconBug, IconDownload, IconLoader2, IconUpload } from '@tabler/icons-react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { backgroundRemoval } from '@cloudinary/url-gen/actions/effect';
import { defaultGetServerSideProps } from '@/utils/get-resource';
import { useSubmit } from '@/hooks/use-submit';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { Button } from '@/components/Button';
import { downloadImage } from '@/utils/download-image';
import { upload } from '@/utils/upload';
import type { GetServerSideProps } from 'next';

interface RemoveBackgroundEditorProps extends BaseProps {
  originalUrl: string;
}

const MAX_TRIES = 5;

export default function RemoveBackgroundEditor({
  url,
  originalUrl,
  width,
  height,
  publicId,
}: RemoveBackgroundEditorProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tries, setTries] = useState(1);

  const handleSubmit = useSubmit({
    publicId,
    editor: 'remove-bg',
    defaultError: 'Error uploading image',
    loading: 'Uploading image',
    success: 'Image successfully uploading',
    shouldCancel: () => uploading || setUploading(true),
    onSubmit: () => upload(url),
    onFinish: () => setUploading(false),
  });

  useEffect(() => {
    if (tries >= MAX_TRIES) {
      setLoading(false);
      return;
    }

    let timeout: NodeJS.Timeout;

    axios
      .get(`${url}&try=${tries}`)
      .then(() => setTries(MAX_TRIES))
      .catch(() => {
        timeout = setTimeout(
          () =>
            setTries(tries => {
              const value = ++tries;
              if (value >= MAX_TRIES) setError('Could not remove background');
              return value;
            }),
          5000
        );
      });

    return () => {
      clearTimeout(timeout);
    };
  }, [url, tries]);

  return (
    <section className="absolute inset-0 flex h-full w-full items-center justify-center overflow-x-hidden p-6 sm:relative sm:h-[calc(100vh-64px)]">
      {loading && (
        <div className="flex flex-col items-center justify-center">
          <span className="animate-spin">
            <IconLoader2 size={100} />
          </span>
          <p className="mt-2 text-2xl">Removing Background...</p>
        </div>
      )}

      {!loading && !error && (
        <div className="w-full sm:w-auto">
          <div className="mb-2 flex w-full items-center justify-between">
            <p className="text-xl font-bold">Original</p>
            <p className="text-xl font-bold">Result</p>
          </div>
          <ReactCompareSlider
            className="mx-auto"
            itemOne={<ReactCompareSliderImage className="h-auto w-full bg-dark-11" src={originalUrl} alt="Original" />}
            itemTwo={<ReactCompareSliderImage className="h-auto w-full bg-dark-11" src={url} alt="Compressed" />}
          />
          <form onSubmit={handleSubmit}>
            <Button type="submit" className="flex items-center justify-center">
              <span className="mr-2">
                <IconUpload />
              </span>
              Upload and Edit
            </Button>
            <Button type="button" className="flex items-center justify-center" onClick={() => downloadImage(url)}>
              <span className="mr-2">
                <IconDownload />
              </span>
              Download
            </Button>
          </form>
        </div>
      )}

      {!loading && error && (
        <div className="grid place-items-center">
          <IconBug size={150} />
          <h2 className="text-4xl font-bold">{error}</h2>
          <p className="mt-2 text-xl">Looks like we ran out of credits to remove image backgrounds</p>
        </div>
      )}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<RemoveBackgroundEditorProps> = async context => {
  const result = await defaultGetServerSideProps(context);

  if ('notFound' in result || 'redirect' in result) return result;

  const image = new CloudinaryImage(context.query.publicId as string, {
    cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
  });

  const url = image.effect(backgroundRemoval()).toURL();

  return {
    props: {
      ...(result.props as BaseProps),
      url,
      originalUrl: (result.props as BaseProps).url,
    },
  };
};

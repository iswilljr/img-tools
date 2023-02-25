import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDebounce } from 'use-debounce';
import { getResourceFromPublicId } from '@/utils/get-resource';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { compressImage } from '@/utils/compress-image';
import type { GetServerSideProps } from 'next';

interface CropProps {
  url: string;
  width: number;
  height: number;
  publicId: string;
}

export default function CropEditor({ url, width, height, publicId }: CropProps) {
  const router = useRouter();
  const [compressing, setCompressing] = useState(false);
  const [qualityValue, setQuality] = useState(80);
  const [quality] = useDebounce(qualityValue, 300);
  const [format, setFormat] = useState('png');

  return (
    <div className="flex flex-col sm:h-[calc(100vh-64px)] sm:flex-row">
      <section className="flex h-full w-full overflow-auto border-b border-gray-700 sm:min-w-[20rem] sm:max-w-[20rem] sm:border-r sm:border-b-transparent">
        <form
          className="flex w-full flex-col justify-between px-6 pt-6 text-white sm:h-full"
          onReset={() => setQuality(80)}
          onSubmit={e => {
            e.preventDefault();
            if (compressing) return;

            setCompressing(true);
            compressImage({ publicId, quality: qualityValue, format })
              .then(json => router.push(`/download/${json.publicId}?from=${publicId}&compress=true`))
              .catch(console.error)
              .finally(() => setCompressing(false));
          }}
        >
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Compress Options</h2>
            <Input
              id="quality"
              type="range"
              min={5}
              max={100}
              value={qualityValue}
              onChange={e => setQuality(e.target.valueAsNumber)}
              disabled={compressing}
              label={
                <>
                  <span
                    className="min-w-6 absolute hidden h-6 items-center justify-center rounded bg-white p-1 text-black group-hover:flex"
                    id="indicator"
                    style={{
                      left: `clamp(0px, ${qualityValue - 5}% - 12px, 100% - 24px)`,
                    }}
                  >
                    {`${qualityValue}%`}
                  </span>
                  <div className="flex items-center justify-between">
                    <p>Best Compression</p>
                    <p>Best Quality</p>
                  </div>
                </>
              }
            />
            <div className="mt-2 flex flex-col gap-2">
              <label className="text-md" htmlFor="format">
                Format
              </label>
              <select
                className="mt-2 w-full rounded-md border-gray-700 bg-dark-8 py-2 text-white outline-none focus:border-secondary-6 focus:ring-0 disabled:cursor-not-allowed disabled:border-gray-700/50 disabled:bg-dark-8/50 disabled:text-white/50"
                name="format"
                id="format"
                value={format}
                onChange={e => setFormat(e.target.value)}
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="webp">WEBP</option>
                <option value="avif">AVIF</option>
              </select>
            </div>
          </div>
          <div>
            <Button variant="dark" type="reset" disabled={compressing}>
              Reset
            </Button>
            <Button
              className="mb-6 flex items-center justify-center"
              type="submit"
              disabled={compressing}
              loading={compressing}
            >
              Compress
            </Button>
          </div>
        </form>
      </section>
      <section className="relative flex h-full w-full items-center justify-center p-6">
        <Image
          priority
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL as string}/q_${quality},f_${format}/${publicId}`}
          width={width}
          height={height}
          alt="Compress me"
        />
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<CropProps> = async ({ query }) => {
  const { publicId } = query;

  return await getResourceFromPublicId(publicId)
    .then(props => ({ props }))
    .catch(() => ({ notFound: true }));
};

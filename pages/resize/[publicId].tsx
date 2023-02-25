import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { getResourceFromPublicId } from '@/utils/get-resource';
import { Input } from '@/components/Input';
import 'react-image-crop/dist/ReactCrop.css';
import type { GetServerSideProps } from 'next';
import clsx from 'clsx';
import { resizeImage } from '@/utils/resize-image';

interface CropProps {
  url: string;
  width: number;
  height: number;
  publicId: string;
}

const getAspectRatioValue = (n: number, first: number, base: number) => {
  return Math.round(n / (first / base));
};

export default function CropEditor({ url, width: initialWidth, height: initialHeight, publicId }: CropProps) {
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);
  const [cropping, setCropping] = useState(false);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [transparent, setTransparent] = useState(false);
  const [color, setColor] = useState('#000000');

  const handleDimensionsChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      first: number,
      base: number,
      setValue: (value: number) => void,
      setBase: (value: number) => void
    ) => {
      const value = event.target.valueAsNumber;
      if (Number.isNaN(value)) return;

      setValue(value);
      if (lockAspectRatio) setBase(getAspectRatioValue(value, first, base));
    },
    [lockAspectRatio]
  );

  return (
    <div className="flex flex-col sm:h-[calc(100vh-64px)] sm:flex-row">
      <section className="flex h-full w-full overflow-auto border-b border-gray-700 sm:min-w-[20rem] sm:max-w-[20rem] sm:border-r sm:border-b-transparent">
        <form
          className="flex w-full flex-col justify-between px-6 pt-6 text-white sm:h-full"
          onReset={() => {
            setWidth(initialWidth);
            setHeight(initialHeight);
            setLockAspectRatio(true);
          }}
          onSubmit={e => {
            e.preventDefault();
            if (cropping) return;
            setCropping(true);
            resizeImage({ publicId, width, height, color: lockAspectRatio || transparent ? '#0000' : color })
              .then(json => router.push(`/download/${json.publicId}`))
              .catch(console.error)
              .finally(() => setCropping(false));
          }}
        >
          <div>
            <h2 className="text-2xl font-semibold">Resize Settings</h2>
            <Input
              id="width"
              label="Width"
              type="number"
              value={width}
              onChange={e => handleDimensionsChange(e, width, height, setWidth, setHeight)}
              disabled={cropping}
            />
            <Input
              id="height"
              label="Height"
              type="number"
              value={height}
              onChange={e => handleDimensionsChange(e, height, width, setHeight, setWidth)}
              disabled={cropping}
            />
            <div className={clsx('mt-3 flex items-center gap-2', { 'text-white/50': cropping })}>
              <input
                className="appearance-none rounded-sm focus:border-none focus:outline-none focus:ring-0 disabled:bg-white/50 disabled:hover:bg-white/50"
                id="lock"
                type="checkbox"
                checked={lockAspectRatio}
                disabled={cropping}
                onChange={() => {
                  setLockAspectRatio(lockAspectRatio => {
                    if (!lockAspectRatio) {
                      setWidth(initialWidth);
                      setHeight(initialHeight);
                    }
                    return !lockAspectRatio;
                  });
                }}
              />
              <label htmlFor="lock">Lock Aspect Ratio</label>
            </div>
            <div
              className={clsx('mt-4 flex transform flex-col gap-4 rounded-lg duration-300', {
                'pointer-events-none -translate-x-full opacity-0 ': lockAspectRatio,
                'translate-x-0': !lockAspectRatio,
                'text-white/50': cropping,
              })}
            >
              <div>Background Fill</div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <div className="flex w-full cursor-pointer items-center gap-4" onClick={() => setTransparent(false)}>
                    <span
                      className={clsx('h-5 w-5 rounded-full border border-gray-600', {
                        '!border-white bg-primary-6': !transparent,
                      })}
                    />
                    Pick a color
                  </div>
                  {!transparent && (
                    <label htmlFor="color" className="relative flex cursor-pointer items-center gap-3">
                      <div className="ml-auto flex items-center gap-4">{color}</div>
                      <div className="relative h-6 w-6 rounded" style={{ backgroundColor: color }} />
                      <input
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        disabled={cropping}
                        className="absolute right-0 h-6 w-6 cursor-pointer opacity-0"
                        type="color"
                        id="color"
                      />
                    </label>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex w-full cursor-pointer items-center gap-4" onClick={() => setTransparent(true)}>
                    <span
                      className={clsx('h-5 w-5 rounded-full border border-gray-600', {
                        '!border-white bg-primary-6': transparent,
                      })}
                    />
                    Transparent
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button disabled={cropping} variant="dark" type="reset">
              Reset
            </Button>
            <Button
              disabled={cropping}
              loading={cropping}
              className="mb-6 flex items-center justify-center"
              type="submit"
            >
              Resize
            </Button>
          </div>
        </form>
      </section>
      <section className="relative flex h-full w-full items-center justify-center p-6">
        <Image priority width={initialWidth} height={initialHeight} ref={imgRef} alt="Resize me" src={url} />
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

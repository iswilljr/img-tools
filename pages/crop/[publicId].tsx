import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactCrop, { type Crop } from 'react-image-crop';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/Button';
import { cropImage } from '@/utils/crop-image';
import { getResourceFromPublicId } from '@/utils/get-resource';
import { Input } from '@/components/Input';
import type { GetServerSideProps } from 'next';
import 'react-image-crop/dist/ReactCrop.css';

export default function CropEditor({ url, width, height, publicId }: BaseProps) {
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement>(null);
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState<Crop>({ width, height, unit: 'px', x: 0, y: 0 });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = e.target.id;
      const value = e.target.valueAsNumber;
      const maxValue = id === 'width' || id === 'x' ? width : height;
      const nextValue = value >= 0 && value <= maxValue ? value : value > maxValue ? maxValue : 0;

      setCrop(crop => ({ ...crop, [id]: Math.round(nextValue) }));
    },
    [width, height]
  );

  const inputProps = { onChange: handleChange, disabled: cropping };

  return (
    <div className="flex flex-col sm:h-[calc(100vh-64px)] sm:flex-row">
      <section className="flex h-full w-full overflow-auto border-b border-gray-700 sm:min-w-[20rem] sm:max-w-[20rem] sm:border-r sm:border-b-transparent">
        <form
          onReset={() => setCrop({ width, height, unit: 'px', x: 0, y: 0 })}
          className="flex w-full flex-col justify-between px-6 pt-6 sm:h-full"
          onSubmit={e => {
            e.preventDefault();
            if (cropping) return;
            setCropping(true);
            toast
              .promise(cropImage(publicId, crop), {
                error: err => err.data.message ?? err.message ?? 'Something went wrong',
                loading: 'Cropping image',
                success: 'Image successfully cropped',
              })
              .then(json => router.push(`/download/${json.publicId}`))
              .catch(() => {})
              .finally(() => setCropping(false));
          }}
        >
          <div>
            <div>
              <h2 className="text-2xl font-semibold">Crop Rectangle</h2>
              <Input id="width" label="Width" type="number" value={crop.width} {...inputProps} />
              <Input id="height" label="Height" type="number" value={crop.height} {...inputProps} />
            </div>
            <div className="mt-5">
              <h2 className="text-2xl font-semibold">Crop Position</h2>
              <Input id="x" label="Position X" type="number" value={crop.x} {...inputProps} />
              <Input id="y" label="Position Y" type="number" value={crop.y} {...inputProps} />
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
              Crop
            </Button>
          </div>
        </form>
      </section>
      <section className="relative flex h-full w-full items-center justify-center p-6">
        <ReactCrop
          className="relative max-h-full max-w-full"
          crop={crop}
          onChange={crop =>
            setCrop({
              unit: 'px',
              width: Math.round(crop.width),
              height: Math.round(crop.height),
              x: Math.round(crop.x),
              y: Math.round(crop.y),
            })
          }
        >
          <Image
            priority
            onLoad={() => setCrop(crop => ({ ...crop, x: 0, y: 0 }))}
            width={width}
            height={height}
            ref={imgRef}
            alt="Crop me"
            src={url}
          />
        </ReactCrop>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<BaseProps> = async ({ query }) => {
  const { publicId } = query;

  return await getResourceFromPublicId(publicId)
    .then(props => ({ props }))
    .catch(() => ({ notFound: true }));
};

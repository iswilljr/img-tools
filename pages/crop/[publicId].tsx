import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import ReactCrop, { type Crop } from 'react-image-crop';
import { Button } from '@/components/Button';
import { cropImage } from '@/utils/crop-image';
import { downloadImage } from '@/utils/download-image';
import { getResourceFromPublicId } from '@/utils/get-resource';
import { Input } from '@/components/Input';
import 'react-image-crop/dist/ReactCrop.css';
import type { GetServerSideProps } from 'next';
import { IconLoader } from '@tabler/icons-react';

interface CropProps {
  url: string;
  initialWidth: number;
  initialHeight: number;
  initialPublicId: string;
}

export default function CropEditor({ url, initialWidth, initialHeight, initialPublicId }: CropProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [cropping, setCropping] = useState(false);
  const [image, setImage] = useState({ url, width: initialWidth, height: initialHeight, publicId: initialPublicId });
  const [crop, setCrop] = useState<Crop>({ width: initialWidth, height: initialHeight, unit: 'px', x: 0, y: 0 });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = e.target.id;
      const value = e.target.valueAsNumber;
      const maxValue = id === 'width' || id === 'x' ? image.width : image.height;
      const nextValue = value >= 0 && value <= maxValue ? value : value > maxValue ? maxValue : 0;

      setCrop(crop => ({ ...crop, [id]: Math.round(nextValue) }));
    },
    [image]
  );

  const inputProps = { onChange: handleChange, disabled: cropping };

  return (
    <div className="flex flex-col sm:h-[calc(100vh-64px)] sm:flex-row">
      <section className="flex h-full w-full overflow-auto border-b border-gray-700 sm:min-w-[20rem] sm:max-w-[20rem] sm:border-r sm:border-b-transparent">
        <form
          onReset={() => setCrop({ width: image.width, height: image.height, unit: 'px', x: 0, y: 0 })}
          className="flex w-full flex-col justify-between px-6 pt-6 text-white sm:h-full"
          onSubmit={e => {
            e.preventDefault();
            if (cropping) return;
            setCropping(true);
            cropImage(image.publicId, crop)
              .then(json => {
                setImage({ ...json, width: crop.width, height: crop.height });
              })
              .catch(console.error)
              .finally(() => setCropping(false));
          }}
        >
          <div>
            <div>
              <h2 className="text-2xl font-semibold">Crop Rectangle</h2>
              <Input id="width" label="Width" type="number" value={crop.width} {...inputProps} />
              <Input id="height" label="height" type="number" value={crop.height} {...inputProps} />
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
            <Button disabled={cropping} className="mb-6 flex items-center justify-center" type="submit">
              Crop
              {cropping && (
                <span className="ml-2 animate-spin">
                  <IconLoader />
                </span>
              )}
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
            width={image.width}
            height={image.height}
            ref={imgRef}
            alt="Crop me"
            src={image.url}
          />
        </ReactCrop>
        {image.url !== url && (
          <div className="absolute bottom-6 w-full px-6">
            <Button disabled={cropping} onClick={() => downloadImage(image.url)}>
              Download
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<CropProps> = async ({ query }) => {
  const { publicId } = query;

  try {
    if (typeof publicId !== 'string') throw Error('Invalid publicId param');

    const { secure_url: url, width, height } = await getResourceFromPublicId(publicId);

    return { props: { url, initialWidth: width, initialHeight: height, initialPublicId: publicId } };
  } catch (error) {
    return { notFound: true };
  }
};

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { getResourceFromPublicId } from '@/utils/get-resource';
import { upload } from '@/utils/upload';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import type { GetServerSideProps } from 'next';

interface CropProps {
  url: string;
  width: number;
  height: number;
  publicId: string;
}

export default function CropEditor({ url, width, height }: CropProps) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [rotating, setRotating] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [degrees, setDegrees] = useState(0);
  const [horizantallyFlipped, setHorizantallyFlipped] = useState(false);
  const [verticallyFlipped, setVerticallyFlipped] = useState(false);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (!context) return;

    new Promise<HTMLImageElement>(resolve => {
      const image = new Image();
      image.setAttribute('crossorigin', 'anonymous');
      image.setAttribute('src', url);
      image.onload = () => resolve(image);
    }).then(baseImage => {
      context.drawImage(baseImage, 0, 0);
      (imageRef as any).current = baseImage;
      setContext(context);
    });
  }, [url]);

  useEffect(() => {
    if (!context || !imageRef.current) return;

    const positionX = -width / 2;
    const positionY = -height / 2;
    const scaleX = horizantallyFlipped ? -1 : 1;
    const scaleY = verticallyFlipped ? -1 : 1;

    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate((degrees * Math.PI) / 180.0);
    context.scale(scaleX, scaleY);
    context.translate(-positionX - width / 2, -positionY - height / 2);
    context.drawImage(imageRef.current, positionX, positionY, width, height);
    context.restore();
  }, [context, degrees, horizantallyFlipped, verticallyFlipped, width, height]);

  return (
    <div className="flex flex-col sm:h-[calc(100vh-64px)] sm:flex-row">
      <section className="flex h-full w-full overflow-auto border-b border-gray-700 sm:min-w-[20rem] sm:max-w-[20rem] sm:border-r sm:border-b-transparent">
        <form
          className="flex w-full flex-col justify-between px-6 pt-6 text-white sm:h-full"
          onReset={() => {
            setVerticallyFlipped(false);
            setHorizantallyFlipped(false);
            setDegrees(0);
          }}
          onSubmit={e => {
            e.preventDefault();
            if (rotating) return;
            setRotating(true);

            const image = canvasRef.current?.toDataURL();

            if (!image) return;

            upload(image)
              .then(res => router.push(`/download/${res.publicId}`))
              .catch(console.error)
              .finally(() => setRotating(false));
          }}
        >
          <div>
            <div>
              <h2 className="text-2xl font-semibold">Rotate Image</h2>
              <Input
                className="px-0"
                id="degrees"
                label="Degrees"
                type="range"
                min={0}
                max={360}
                value={degrees}
                onChange={e => setDegrees(e.target.valueAsNumber)}
                disabled={rotating}
              />
            </div>
            <div className="mt-5">
              <h2 className="text-2xl font-semibold">Flip Image</h2>
              <Input
                className="hidden"
                type="checkbox"
                name="horizontally"
                id="horizontally"
                hidden
                checked={horizantallyFlipped}
                readOnly
                label={
                  <Button
                    variant="dark"
                    type="button"
                    onClick={() => setHorizantallyFlipped(o => !o)}
                    disabled={rotating}
                  >
                    Horizontally
                  </Button>
                }
              />
              <Input
                className="hidden"
                type="checkbox"
                name="vertically"
                id="vertically"
                hidden
                checked={verticallyFlipped}
                readOnly
                label={
                  <Button
                    variant="dark"
                    type="button"
                    onClick={() => setVerticallyFlipped(o => !o)}
                    disabled={rotating}
                  >
                    Vertically
                  </Button>
                }
              />
            </div>
          </div>
          <div>
            <Button variant="dark" type="reset" disabled={rotating}>
              Reset
            </Button>
            <Button
              className="mb-6 flex items-center justify-center"
              type="submit"
              disabled={rotating}
              loading={rotating}
            >
              Rotate
            </Button>
          </div>
        </form>
      </section>
      <section className="relative flex h-full w-full items-center justify-center p-6">
        <canvas className="max-h-full max-w-full" ref={canvasRef} width={width} height={height} />
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

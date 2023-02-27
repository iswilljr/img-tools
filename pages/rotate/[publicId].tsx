/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { getResourceFromPublicId } from '@/utils/get-resource';
import { upload } from '@/utils/upload';
import { loadImage } from '@/utils/load-image';
import { rotateImage } from '@/utils/rotate-image';
import { useSubmit } from '@/hooks/use-submit';
import { CheckboxButton } from '@/components/CheckboxButton';
import { Input } from '@/components/Input';
import { Editor } from '@/components/Editor';
import type { GetServerSideProps } from 'next';

export default function RotateEditor({ url, width, height, publicId }: BaseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const ctx = useRef<CanvasRenderingContext2D>(null);
  const [rotating, setRotating] = useState(false);
  const [degrees, setDegrees] = useState(0);
  const [horizontallyFlipped, setHorizontallyFlipped] = useState(false);
  const [verticallyFlipped, setVerticallyFlipped] = useState(false);

  useEffect(() => {
    const initialCtx = canvasRef.current?.getContext('2d');
    if (!initialCtx) return;

    loadImage(url)
      .then(baseImg => {
        initialCtx.drawImage(baseImg, 0, 0);
        (img as any).current = baseImg;
        (ctx as any).current = initialCtx;
      })
      .catch(() => toast.error('Error loading image'));
  }, [url]);

  useEffect(() => {
    if (!ctx.current || !img.current) return;
    rotateImage({ degrees, width, height, ctx: ctx.current, img: img.current, horizontallyFlipped, verticallyFlipped });
  }, [ctx, degrees, horizontallyFlipped, verticallyFlipped, width, height]);

  const handleSubmit = useSubmit({
    publicId,
    editor: 'rotate',
    defaultError: 'Error while generating image',
    loading: 'Rotating image',
    success: 'Image successfully rotated',
    shouldCancel: () => !img.current || rotating || setRotating(true),
    onSubmit: () => upload(canvasRef.current!.toDataURL()),
    onFinish: () => setRotating(false),
  });

  return (
    <Editor
      formButtonProps={{ label: 'Rotate', disabled: rotating }}
      onSubmit={handleSubmit}
      onReset={() => {
        setVerticallyFlipped(false);
        setHorizontallyFlipped(false);
        setDegrees(0);
      }}
      content={<canvas className="max-h-full max-w-full" ref={canvasRef} width={width} height={height} />}
    >
      <div>
        <h2 className="text-2xl font-semibold">Rotate Image</h2>
        <Input
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
        <CheckboxButton
          id="horizontally"
          label="Horizontally"
          checked={horizontallyFlipped}
          disabled={rotating}
          onClick={() => setHorizontallyFlipped(o => !o)}
        />
        <CheckboxButton
          id="vertically"
          label="Vertically"
          checked={verticallyFlipped}
          disabled={rotating}
          onClick={() => setVerticallyFlipped(o => !o)}
        />
      </div>
    </Editor>
  );
}

export const getServerSideProps: GetServerSideProps<BaseProps> = async ({ query }) => {
  const { publicId } = query;

  return await getResourceFromPublicId(publicId)
    .then(props => ({ props }))
    .catch(() => ({ notFound: true }));
};

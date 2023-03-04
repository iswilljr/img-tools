import { useRef, useState } from 'react';
import Image from 'next/image';
import ReactCrop, { type Crop } from 'react-image-crop';
import { cropImage } from '@/utils/crop-image';
import { cropTool } from '@/utils/tools';
import { Input } from '@/components/Inputs/Input';
import { Editor } from '@/components/Tool/Editor';
import { useSubmit } from '@/hooks/use-submit';
import 'react-image-crop/dist/ReactCrop.css';
import { useCropHandler } from '@/hooks/use-crop-handler';

export default function CropEditor({ url, width, height, publicId }: BaseProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState<Crop>({ width, height, unit: 'px', x: 0, y: 0 });

  const handleChange = useCropHandler({ width, height, onChange: setCrop });

  const handleSubmit = useSubmit({
    publicId,
    editor: 'crop',
    defaultError: 'Something went wrong',
    loading: 'Cropping image',
    success: 'Image successfully cropped',
    shouldCancel: () => cropping || setCropping(true),
    onSubmit: () => cropImage({ publicId, ...crop }),
    onFinish: () => setCropping(false),
  });

  const inputProps = { disabled: cropping, type: 'number', onChange: handleChange };

  return (
    <Editor
      tool={cropTool}
      formButtonProps={{ label: 'Crop', disabled: cropping }}
      onReset={() => setCrop({ width, height, unit: 'px', x: 0, y: 0 })}
      onSubmit={handleSubmit}
      content={
        <ReactCrop
          className="relative max-h-full max-w-full"
          crop={crop}
          onChange={crop => {
            setCrop({
              unit: 'px',
              width: Math.round(crop.width),
              height: Math.round(crop.height),
              x: Math.round(crop.x),
              y: Math.round(crop.y),
            });
          }}
        >
          <Image priority width={width} height={height} ref={imgRef} alt="Crop me" src={url} />
        </ReactCrop>
      }
    >
      <div>
        <h2 className="text-2xl font-semibold">Crop Rectangle</h2>
        <Input id="width" label="Width" value={crop.width} {...inputProps} />
        <Input id="height" label="Height" value={crop.height} {...inputProps} />
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-semibold">Crop Position</h2>
        <Input id="x" label="Position X" value={crop.x} {...inputProps} />
        <Input id="y" label="Position Y" value={crop.y} {...inputProps} />
      </div>
    </Editor>
  );
}

export { defaultGetServerSideProps as getServerSideProps } from '@/utils/get-resource';

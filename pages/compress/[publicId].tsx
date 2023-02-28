import { useState } from 'react';
import Image from 'next/image';
import { useDebounce } from 'use-debounce';
import { compressImage } from '@/utils/compress-image';
import { useSubmit } from '@/hooks/use-submit';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Editor } from '@/components/Editor';

type Format = (typeof formats)[number];

const formats = ['png', 'jpg', 'webp', 'avif'] as const;

export default function CompressEditor({ url, width, height, publicId }: BaseProps) {
  const [compressing, setCompressing] = useState(false);
  const [qualityValue, setQuality] = useState(80);
  const [quality] = useDebounce(qualityValue, 300);
  const [format, setFormat] = useState<Format>('png');

  const handleSubmit = useSubmit({
    publicId,
    editor: 'compress',
    defaultError: 'Error compressing image',
    loading: 'Compressing image',
    success: 'Image successfully compressed',
    shouldCancel: () => compressing || setCompressing(true),
    onSubmit: () => compressImage({ publicId, quality: qualityValue, format }),
    onFinish: () => setCompressing(false),
  });

  return (
    <Editor
      formButtonProps={{ label: 'Compress', disabled: compressing }}
      onReset={() => setQuality(80)}
      onSubmit={handleSubmit}
      content={
        <Image
          priority
          src={`${process.env.NEXT_PUBLIC_IMAGES_URL as string}/q_${quality},f_${format}/${publicId}`}
          width={width}
          height={height}
          alt="Compress me"
        />
      }
    >
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
              style={{ left: `clamp(0px, ${qualityValue - 5}% - 12px, 100% - 24px)` }}
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
      <Select
        id="format"
        label="Format"
        data={formats}
        value={format}
        onChange={e => setFormat(e.target.value as Format)}
      />
    </Editor>
  );
}

export { defaultGetServerSideProps as getServerSideProps } from 'utils/get-resource';

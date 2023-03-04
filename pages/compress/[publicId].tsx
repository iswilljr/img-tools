import { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { useDebounce } from 'use-debounce';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { compressImage } from '@/utils/compress-image';
import { compressTool } from '@/utils/tools';
import { useSubmit } from '@/hooks/use-submit';
import { Select } from '@/components/Select';
import { Editor } from '@/components/Editor';
import { Range } from '@/components/Range';

type Format = (typeof formats)[number];

const formats = ['png', 'jpg', 'webp', 'avif'] as const;
const cloudinary = new Cloudinary({ cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME } });

export default function CompressEditor({ url, width, height, publicId, bytes }: BaseProps) {
  const [compressing, setCompressing] = useState(false);
  const [qualityValue, setQuality] = useState(80);
  const [quality] = useDebounce(qualityValue, 300);
  const [format, setFormat] = useState<Format>('png');
  const [outputSize, setOutputSize] = useState(bytes);

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

  useEffect(() => {
    fetch(cloudinary.image(publicId).quality(quality).format(format).toURL())
      .then(res => res.blob())
      .then(blob => setOutputSize(blob.size));
  }, [format, publicId, quality]);

  return (
    <Editor
      tool={compressTool}
      formButtonProps={{ label: 'Compress', disabled: compressing }}
      onReset={() => setQuality(80)}
      onSubmit={handleSubmit}
      content={
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-10">
          <div className="top-0 z-10 flex w-full items-center justify-between bg-dark-10 sm:absolute">
            <p>
              Original: <strong>{`${(bytes / 1000).toFixed(2)} KB`}</strong>
            </p>
            <p>
              Compressed: <strong>{`${(outputSize / 1000).toFixed(2)} KB`}</strong>
            </p>
          </div>
          <ReactCompareSlider
            style={{ width, height }}
            itemOne={
              <ReactCompareSliderImage
                className="bg-dark-10"
                src={url}
                width={width}
                height={height}
                alt="Compress me"
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                className="bg-dark-10"
                src={cloudinary.image(publicId).quality(quality).format(format).toURL()}
                width={width}
                height={height}
                alt="Compressed"
              />
            }
          />
        </div>
      }
    >
      <h2 className="mb-4 text-2xl font-semibold">Compress Options</h2>
      <Range
        id="quality"
        min={5}
        max={100}
        value={qualityValue}
        onChange={e => setQuality(e.target.valueAsNumber)}
        disabled={compressing}
        labelLeft="Best Compression"
        labelRight="Best Quality"
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

export { defaultGetServerSideProps as getServerSideProps } from '@/utils/get-resource';

import { useState } from 'react';
import Image from 'next/image';
import { formats, type Format } from '@/utils/formats';
import { Editor } from '@/components/Tool/Editor';
import { Select } from '@/components/Inputs/Select';
import { useSubmit } from '@/hooks/use-submit';
import { convertImage } from '@/utils/convert-image';
import { convertTool } from '@/utils/tools';

export default function ConvertEditor({ url, width, height, publicId }: BaseProps) {
  const [converting, setConverting] = useState(false);
  const [format, setFormat] = useState<Format>('png');

  const handleSubmit = useSubmit({
    publicId,
    editor: 'convert',
    defaultError: 'Error converting image',
    loading: 'Converting image',
    success: 'Image successfully converted',
    shouldCancel: () => converting || setConverting(true),
    onSubmit: () => convertImage({ publicId, format }),
    onFinish: () => setConverting(false),
  });

  return (
    <Editor
      tool={convertTool}
      formButtonProps={{ label: 'Convert', disabled: converting }}
      onReset={() => {}}
      onSubmit={handleSubmit}
      content={
        <Image
          className="!h-auto !max-h-full !w-auto !max-w-full"
          priority
          width={width}
          height={height}
          alt="Convert me"
          src={url}
        />
      }
    >
      <h2 className="mb-4 text-2xl font-semibold">Convert Options</h2>
      <Select
        id="format"
        label="Choose the Format"
        data={formats}
        value={format}
        onChange={e => setFormat(e.target.value as Format)}
      />
    </Editor>
  );
}

export { defaultGetServerSideProps as getServerSideProps } from '@/utils/get-resource';

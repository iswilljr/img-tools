import { useEffect, useState } from 'react';
import { generator } from '@/utils/image-generator';

interface ImageSizeOptions {
  initialSize: number;
  publicId: string;
  quality: number;
  format: string;
}

export function useImageSize({ initialSize, publicId, quality, format }: ImageSizeOptions) {
  const [outputSize, setOutputSize] = useState(initialSize);

  useEffect(() => {
    fetch(generator.image(publicId).quality(quality).format(format).toURL())
      .then(res => res.blob())
      .then(blob => setOutputSize(blob.size));
  }, [format, publicId, quality]);

  return outputSize;
}

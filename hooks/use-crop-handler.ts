import { useCallback } from 'react';
import type { Crop } from 'react-image-crop';

interface CropHandler {
  width: number;
  height: number;
  onChange: React.Dispatch<React.SetStateAction<Crop>>;
}

export function useCropHandler({ width, height, onChange }: CropHandler) {
  const safeNumberHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = e.target.id;
      const value = e.target.valueAsNumber;

      if (Number.isNaN(value)) return;

      const maxValue = id === 'width' || id === 'x' ? width : height;
      const nextValue = value >= 0 && value <= maxValue ? value : value > maxValue ? maxValue : 0;

      onChange(crop => ({ ...crop, [id]: Math.round(nextValue) }));
    },
    [width, height, onChange]
  );

  return safeNumberHandler;
}

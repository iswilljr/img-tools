import type { Crop } from 'react-image-crop';

interface CropResponse {
  publicId: string;
  url: string;
}

export const cropImage = (publicId: string, crop: Crop): Promise<CropResponse> => {
  return fetch('/api/editor/crop', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...crop, publicId }),
  }).then(res => res.json());
};

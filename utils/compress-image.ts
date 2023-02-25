interface Options {
  publicId: string;
  quality: number;
}

interface CompressResponse {
  publicId: string;
  url: string;
}

export const compressImage = ({ publicId, quality }: Options): Promise<CompressResponse> => {
  return fetch('/api/editor/compress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicId, quality }),
  }).then(res => res.json());
};

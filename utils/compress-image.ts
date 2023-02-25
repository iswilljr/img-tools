interface Options {
  publicId: string;
  quality: number;
  format: string;
}

interface CompressResponse {
  publicId: string;
  url: string;
}

export const compressImage = (options: Options): Promise<CompressResponse> => {
  return fetch('/api/editor/compress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  }).then(res => res.json());
};

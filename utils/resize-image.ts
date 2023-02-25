interface Options {
  publicId: string;
  width: number;
  height: number;
  color: string;
}

interface ResizeResponse {
  publicId: string;
  url: string;
}

export const resizeImage = (options: Options): Promise<ResizeResponse> => {
  return fetch('/api/editor/resize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  }).then(res => res.json());
};

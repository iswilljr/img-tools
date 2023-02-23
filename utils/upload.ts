interface UploadResponse {
  publicId: string;
  url: string;
}

export const uploadFile = (file: File) => {
  return new Promise<UploadResponse>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const url = reader.result?.toString() ?? '';

      upload(url).then(resolve).catch(reject);
    });

    reader.readAsDataURL(file);
  });
};

export const upload = (dataUrl: string): Promise<UploadResponse> => {
  return fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: dataUrl }),
  }).then(res => res.json());
};

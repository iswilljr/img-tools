import axios from 'redaxios';

export const readFile = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const url = reader.result?.toString() ?? '';

      resolve(url);
    });

    reader.addEventListener('error', reject);

    reader.readAsDataURL(file);
  });
};

export const uploadFile = (file: File) => {
  return readFile(file).then(upload);
};

export const upload = (dataUrl: string): Promise<BaseResponse> => {
  return axios.post('/api/upload', { data: dataUrl }).then(res => res.data);
};

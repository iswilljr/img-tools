import axios from 'redaxios';

interface CompressBody {
  publicId: string;
  quality: number;
  format: string;
}

export const compressImage = (body: CompressBody): Promise<BaseResponse> => {
  return axios.post('/api/editor/compress', body).then(res => res.data);
};

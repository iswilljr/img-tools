import axios from 'redaxios';
import type { CompressBody } from '@/pages/api/editor/compress';

export const compressImage = (body: CompressBody): Promise<BaseResponse> => {
  return axios.post('/api/editor/compress', body).then(res => res.data);
};

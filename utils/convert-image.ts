import axios from 'redaxios';
import type { ConvertBody } from '@/pages/api/editor/convert';

export const convertImage = (body: ConvertBody): Promise<BaseResponse> => {
  return axios.post('/api/editor/convert', body).then(res => res.data);
};

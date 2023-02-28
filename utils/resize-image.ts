import axios from 'redaxios';
import type { ResizeBody } from '@/pages/api/editor/resize';

export const resizeImage = (body: ResizeBody): Promise<BaseResponse> => {
  return axios.post('/api/editor/resize', body).then(res => res.data);
};

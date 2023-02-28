import axios from 'redaxios';
import type { CropBody } from '@/pages/api/editor/crop';

export const cropImage = (body: CropBody): Promise<BaseResponse> => {
  return axios.post('/api/editor/crop', body).then(res => res.data);
};

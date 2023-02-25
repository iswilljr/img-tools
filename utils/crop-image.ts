import axios from 'redaxios';
import type { Crop } from 'react-image-crop';

export const cropImage = (publicId: string, crop: Crop): Promise<BaseResponse> => {
  return axios.post('/api/editor/crop', { publicId, ...crop }).then(res => res.data);
};

import axios from 'redaxios';

interface Body {
  publicId: string;
  width: number;
  height: number;
  color: string;
}

export const resizeImage = (body: Body): Promise<BaseResponse> => {
  return axios.post('/api/editor/resize', body).then(res => res.data);
};

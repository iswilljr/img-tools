import axios from 'redaxios';

interface ConvertBody {
  publicId: string;
  format: string;
}

export const convertImage = (body: ConvertBody): Promise<BaseResponse> => {
  return axios.post('/api/editor/convert', body).then(res => res.data);
};

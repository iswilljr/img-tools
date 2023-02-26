declare global {
  interface BaseResponse {
    publicId: string;
    url: string;
  }

  interface BaseProps extends BaseResponse {
    width: number;
    height: number;
  }
}

export {};

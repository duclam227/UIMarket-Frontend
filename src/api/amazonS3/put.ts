import { AxiosRequestConfig } from 'axios';
import axiosClient from '..';

class Put {
  uploadToS3Bucket = (
    signedURL: string,
    file: File,
    extraConfig?: AxiosRequestConfig<File>,
  ) => {
    const config: AxiosRequestConfig<File> = {
      ...extraConfig,
      headers: {
        'Content-Type': file.type,
      },
    };
    return axiosClient.put(signedURL, file, config);
  };
}

export default new Put();

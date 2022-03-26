import axiosClient from '..';

class Put {
  uploadToS3Bucket = (signedURL: string, file: File) => {
    const config = {
      headers: {
        'Content-Type': file.type,
      },
    };
    return axiosClient.put(signedURL, file, config);
  };
}

export default new Put();

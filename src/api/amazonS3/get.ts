import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

class Get {
  getSignedUrl = (folder: string) => {
    const imageUploadApiEndpoint = `/api/v1/pictures/${folder}/upload`;
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    return axiosClient.get(imageUploadApiEndpoint, config);
  };
}

export default new Get();

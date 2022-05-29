import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const LICENSE_ENDPOINT = '/api/v1/licenses/';
class Get {
  getLicenseById = (id: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.get(`${LICENSE_ENDPOINT}/detail/${id}`, config);
  };
}

export default new Get();

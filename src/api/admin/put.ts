import axiosClient from '../';
const API_ENDPOINT = '/api/v1/admin';
import { getJwt } from '../../app/util/authHelpers';

class Put {
  activateUser = (userId: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.put(`${API_ENDPOINT}/users/${userId}/active`, null, config);
  };
  deactivateUser = (userId: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.put(`${API_ENDPOINT}/users/${userId}/deactive`, null, config);
  };

  activateShop = (shopId: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.put(`${API_ENDPOINT}/shops/${shopId}/active`, null, config);
  };
  deactivateShop = (shopId: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.put(`${API_ENDPOINT}/shops/${shopId}/deactive`, null, config);
  };
}

export default new Put();

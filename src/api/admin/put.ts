import axiosClient from '../';
import { getJwt } from '../../app/util/authHelpers';
const API_ENDPOINT = '/api/v1/admin';

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
  acceptReport = (reportId: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.put(`${API_ENDPOINT}/report/accept/${reportId}`, null, config);
  };
  rejectReport = (reportId: string) => {
    const jwt = getJwt();
    const data = {
      rejectReason: 'Admin rejected',
    };
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.put(`${API_ENDPOINT}/report/reject/${reportId}`, data, config);
  };
}

export default new Put();

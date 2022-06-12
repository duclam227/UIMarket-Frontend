import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/admin';
class Post {
  acceptRefund = (refundId: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.post(`${API_ENDPOINT}/refund/accept/${refundId}`, null, config);
  };
  rejectRefund = (refundId: string) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.post(`${API_ENDPOINT}/refund/reject/${refundId}`, null, config);
  };
}

export default new Post();

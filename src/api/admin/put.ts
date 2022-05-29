import axiosClient from '../';
const API_ENDPOINT = '/api/v1/admin';

class Put {
  activateUser = (userId: string) => {
    return axiosClient.put(`${API_ENDPOINT}/users/${userId}/active`);
  };
  deactivateUser = (userId: string) => {
    return axiosClient.put(`${API_ENDPOINT}/users/${userId}/deactive`);
  };
}

export default new Put();

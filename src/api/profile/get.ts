import axiosClient from '..';

const PROFILE_ENDPOINT = 'api/v1/profile';

class Get {
  getUserActivityById = (id: string) => {
    return axiosClient.get(`${PROFILE_ENDPOINT}/activity/${id}`);
  };
  getUserProfileInfoById = (id: string) => {
    return axiosClient.get(`${PROFILE_ENDPOINT}/info/${id}`);
  };
}

export default new Get();

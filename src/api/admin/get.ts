import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/admin';

class Get {
  getAllUsers = (pageNumber: number | string, itemsPerPage: number) => {
    return axiosClient.get(
      `${API_ENDPOINT}/users?page=${pageNumber}&limit=${itemsPerPage}`,
    );
  };
}

export default new Get();

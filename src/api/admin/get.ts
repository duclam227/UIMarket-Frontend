import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/admin';

class Get {
  getAllUsers = (pageNumber: number | string, itemsPerPage: number) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.get(
      `${API_ENDPOINT}/users?page=${pageNumber}&limit=${itemsPerPage}`,
      config,
    );
  };
  getAllShops = (pageNumber: number | string, itemsPerPage: number) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.get(
      `${API_ENDPOINT}/shops?page=${pageNumber}&limit=${itemsPerPage}`,
      config,
    );
  };
  getAllReports = (pageNumber: number | string, itemsPerPage: number) => {
    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.get(
      `${API_ENDPOINT}/report/list/EC?page=${pageNumber}&limit=${itemsPerPage}`,
      config,
    );
  };
}

export default new Get();

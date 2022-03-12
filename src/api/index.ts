import axios from 'axios';
import { getJwt } from '../app/util/authHelpers';

const jwt = getJwt();
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_SERVER_URL,
  headers: {
    'content-type': 'application/json',
    Authentication: `Bearer ${jwt}`,
  },
});

axiosClient.interceptors.request.use(async config => {
  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    throw error;
  },
);

export default axiosClient;

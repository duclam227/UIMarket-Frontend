import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_SERVER_URL,
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

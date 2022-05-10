import axiosClient from '..';

class Get {
  getUserFromToken = (jwt: string) => {
    return axiosClient.get('/api/v1/auth/login', {
      headers: { Authorization: `Bearer ${jwt}` },
    });
  };

  resendVerifyEmail = (userId: string) => {
    return axiosClient.get(`api/v1/verify/resend?userId=${userId}`);
  };

  verifyEmailCode = (userId: string, verifyCode: string) => {
    return axiosClient.get(
      `api/v1/verify/?userId=${userId}&verifyCode=${verifyCode}`,
    );
  };
}

export default new Get();

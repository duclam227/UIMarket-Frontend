import axiosClient from '..';
import { authCredentials } from '../../app/util/interfaces';
import { RecoverCredentials } from '../../forms/RecoverPasswordForm/RecoverPasswordForm';
import { getJwt } from '../../app/util/authHelpers';

interface ResetPasswordCredentials {
  newPassword: string;
  userId: string;
  verifyCode: string;
}
class Post {
  logIn = (credentials: authCredentials) => {
    return axiosClient.post('/api/v1/auth/login', {
      ...credentials,
    });
  };

  signUp = (credentials: authCredentials) => {
    return axiosClient.post('/api/v1/auth/register', {
      ...credentials,
    });
  };

  recoverPassword = (credentials: RecoverCredentials) => {
    return axiosClient.post('api/v1/auth/forgetPassword', {
      customerEmail: credentials.email,
    });
  };

  logInWithGoogle = (tokenId: string) => {
    return axiosClient.post('/api/v1/auth/login-google', {
      tokenId,
    });
  };

  resetPassword = (credentials: ResetPasswordCredentials) => {
    return axiosClient.post('/api/v1/verify/resetForgetPassword', {
      ...credentials,
    });
  };

  changePassword = (credentials: { userId: string; newPassword: string }) => {
    const jwt = getJwt();
    console.log(jwt);
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    return axiosClient.post(
      '/api/v1/auth/resetPassword',
      { ...credentials },
      config,
    );
  };
}

export default new Post();

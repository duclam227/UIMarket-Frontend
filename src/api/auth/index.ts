import post from './post';
import get from './get';

const authAPI = {
  //get
  getUserFromToken: get.getUserFromToken,
  resendVerifyEmail: get.resendVerifyEmail,

  //post
  logIn: post.logIn,
  logInWithGoogle: post.logInWithGoogle,
  signUp: post.signUp,
  sendRecoverPasswordRequest: post.recoverPassword,
  resetPassword: post.resetPassword,
};

export default authAPI;

import actionTypes from './authActionTypes';

const setActiveUser = (credentials) => {
  return {
    type: actionTypes.AUTH_SET_ACTIVE_USER,

  }
}

const setUserToNull = () => {
  return {
    type: actionTypes.AUTH_USER_SIGN_OUT,
  }
}

const setError = (msg) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: msg,
  }
}

const logIn = (credentials) => {
  return async (dispatch) => {
    dispatch(setError(null));
    try {
      //sign in with credentials
      // if(userData !== null){
      //   saveUserToBrowser({...userData});
      //   dispatch(setActiveUser({ ...userData }));
      // }
      // else{
      //   dispatch(setErrorUserNotExist());
      // }
    }
    catch (error) {
      dispatch(setError(error.message));
    }
  }
}

const logOut = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(setUserToNull());
  }
}

export { logIn, logOut, setActiveUser };
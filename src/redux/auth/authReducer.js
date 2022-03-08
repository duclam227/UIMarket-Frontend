import actionTypes from './authActionTypes';

const initialState = {
  userId: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SET_ACTIVE_USER:
      return {
        ...state,
        userId: action.userId,
        error: null,
      }
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case actionTypes.AUTH_USER_SIGN_OUT:
      return {
        userId: null,
      }
    default:
      return state;
  }
}

export default authReducer;
import { actionTypes } from './authActionTypes';
import { Action, authState } from './authInterfaces';

const initialState: authState = {
	user: {},
	isInProgress: null,
	error: null,
};

const authReducer = (state: authState = initialState, action: Action) => {
	switch (action.type) {
		case actionTypes.AUTH_LOGIN_SUCCESS:
			return {
				...state,
				error: null,
				isInProgress: false,
				user: { ...action.user },
			};
		case actionTypes.AUTH_LOGIN_REQUEST:
			return {
				...state,
				error: null,
				isInProgress: true,
			};
		case actionTypes.AUTH_SIGNUP_SUCCESS:
			return {
				...state,
				error: null,
				isInProgress: false,
			};
		case actionTypes.AUTH_SIGNUP_REQUEST:
			return {
				...state,
				error: null,
				isInProgress: true,
			};
		case actionTypes.AUTH_ERROR:
			return {
				...state,
				error: action.error,
				isInProgress: false,
				user: null,
			};
		case actionTypes.AUTH_USER_SIGN_OUT:
			return {
				error: null,
				isInProgress: false,
				user: null,
			};
		default:
			return state;
	}
};

export default authReducer;

import { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import authAPI from '../../api/auth';
import { getErrorMessage } from '../../app/util';
import { authCredentials } from '../../app/util/interfaces';
import { actionTypes } from './authActionTypes';
import { Action } from './authInterfaces';

const loginInProgress = () => {
	return {
		type: actionTypes.AUTH_LOGIN_REQUEST,
	} as Action;
};

const loginSuccess = (userData: Object) => {
	return {
		type: actionTypes.AUTH_LOGIN_SUCCESS,
		user: { ...userData },
	} as Action;
};

const signUpInProgress = () => {
	return {
		type: actionTypes.AUTH_LOGIN_REQUEST,
	} as Action;
};

const signUpSuccess = (userData: Object) => {
	return {
		type: actionTypes.AUTH_SIGNUP_SUCCESS,
		user: { ...userData },
	} as Action;
};

const setUserToNull = () => {
	return {
		type: actionTypes.AUTH_USER_SIGN_OUT,
	} as Action;
};

const setError = (msg: string | null) => {
	return {
		type: actionTypes.AUTH_ERROR,
		error: msg,
	} as Action;
};

const logIn = (credentials: authCredentials) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch(setError(null));
		dispatch(loginInProgress());
		authAPI.post
			.logIn(credentials)
			.then((res: any) => {
				const { user, token } = res;
				localStorage.setItem('authToken', token);
				dispatch(loginSuccess({ customerEmail: credentials.customerEmail, ...user }));
			})
			.catch(error => {
				const errorMsg = getErrorMessage(error);
				dispatch(setError(errorMsg));
			});
	};
};

const signUp = (credentials: authCredentials) => {
	return (dispatch: Dispatch<Action>) => {
		dispatch(setError(null));
		dispatch(signUpInProgress());
		authAPI.post
			.signUp(credentials)
			.then((res: any) => {
				const { user, token } = res;
				localStorage.setItem('authToken', token);
				dispatch(signUpSuccess({ customerEmail: credentials.customerEmail, ...user }));
			})
			.catch(error => {
				const errorMsg = getErrorMessage(error);
				dispatch(setError(errorMsg));
			});
	};
};

const logOut = () => {
	return (dispatch: Dispatch<Action>) => {
		localStorage.clear();
		dispatch(setUserToNull());
	};
};

export { signUp, logIn, logOut };

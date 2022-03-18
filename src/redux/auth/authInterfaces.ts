import { actionTypes } from './authActionTypes';
import { customer } from '../../app/util/interfaces';
interface authLoginRequest {
  type: actionTypes.AUTH_LOGIN_REQUEST;
  user?: customer | null;
  error: string | null;
  isInProgress: boolean;
}

interface authLoginSuccess {
  type: actionTypes.AUTH_LOGIN_SUCCESS;
  user: customer;
  error: null;
  isInProgress: boolean;
}

interface authSignUpRequest {
  type: actionTypes.AUTH_SIGNUP_REQUEST;
  user?: customer | null;
  error: string | null;
  isInProgress: boolean;
}

interface authSignUpSuccess {
  type: actionTypes.AUTH_SIGNUP_SUCCESS;
  user: customer;
  error: null;
  isInProgress: boolean;
}

interface authError {
  type: actionTypes.AUTH_ERROR;
  user?: null;
  error: string;
  isInProgress: boolean;
}

interface authSignOut {
  type: actionTypes.AUTH_USER_SIGN_OUT;
  user: null;
  error: null;
  isInProgress: boolean;
}

export type Action =
  | authError
  | authLoginRequest
  | authLoginSuccess
  | authSignOut
  | authSignUpRequest
  | authSignUpSuccess;
export interface authState {
  user: customer | null;
  error: string | null;
  isInProgress: boolean | null;
}

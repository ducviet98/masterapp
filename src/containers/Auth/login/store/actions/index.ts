import * as types from '../constants';

export const loginRequest = (data) => {
  return {
    type: types.LOGIN_REQUEST,
    payload: { data },
  };
};

export const loginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: { data },
  };
};

export const loginFail = (data) => {
  return {
    type: types.LOGIN_FAIL,
    payload: { data },
  };
};

export const logoutRequest = () => {
  return {
    type: types.LOGOUT_REQUEST,
  };
};

export const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS,
  };
};

export const logoutFail = () => {
  return {
    type: types.LOGOUT_FAIL
  };
};

export const refreshTokenRequest = () => {
  return {
    type: types.REFRESH_TOKEN_REQUEST,
  };
};

export const refreshTokenSuccess = () => {
  return {
    type: types.REFRESH_TOKEN_SUCCESS,
  };
};

export const refreshTokenFail = () => {
  return {
    type: types.REFRESH_TOKEN_FAIL
  };
};


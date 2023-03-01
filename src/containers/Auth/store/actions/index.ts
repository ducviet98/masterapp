import * as types from '../constants';

export const registerRequest = (data: any) => {
  return {
    type: types.REGISTER_REQUEST,
    payload: data,
  };
};

export const registerSuccess = (data: any) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data,
  };
};

export const registerFail = (data: any) => {
  return {
    type: types.REGISTER_FAIL,
    payload: data,
  };
};

export const loginRequest = (data: any) => {
  return {
    type: types.LOGIN_REQUEST,
    payload: data,
  };
};

export const loginSuccess = (data: any) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFail = (data: any) => {
  return {
    type: types.LOGIN_FAIL,
    payload: data,
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
    type: types.LOGOUT_FAIL,
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
    type: types.REFRESH_TOKEN_FAIL,
  };
};

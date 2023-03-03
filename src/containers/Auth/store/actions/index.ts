import * as types from '../constants';

export const registerRequest = (data: any) => ({
  type: types.REGISTER_REQUEST,
  payload: data,
}
)

export const registerSuccess = (data: any) => ({
  type: types.REGISTER_SUCCESS,
  payload: data,
})

export const registerFail = (data: any) => ({
  type: types.REGISTER_FAIL,
  payload: data,
})

export const loginRequest = (data: any) => ({
  type: types.LOGIN_REQUEST,
  payload: data,
})

export const loginSuccess = (data: any) => ({
  type: types.LOGIN_SUCCESS,
  payload: data,
})

export const loginFail = (data: any) => ({
  type: types.LOGIN_FAIL,
  payload: data,
})

export const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST,
})

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
})

export const logoutFail = () => ({
  type: types.LOGOUT_FAIL,
})

export const refreshTokenRequest = () => ({
  type: types.REFRESH_TOKEN_REQUEST,
})

export const refreshTokenSuccess = () => ({
  type: types.REFRESH_TOKEN_SUCCESS,
})

export const refreshTokenFail = () => ({
  type: types.REFRESH_TOKEN_FAIL,
})

import * as types from '../constants';

export const getPermissionRequest = () => ({
  type: types.GET_PERMISSION_REQUEST,
});

export const getPermissionSuccess = (data: any) => ({
  type: types.GET_PERMISSION_SUCCESS,
  payload: data,
});

export const getPermissionFail = (data: any) => ({
  type: types.GET_PERMISSION_FAIL,
  payload: data,
});

export const getRoleRequest = (data: any) => ({
  type: types.GET_ROLE_REQUEST,
  payload: data,
});

export const getRoleSuccess = (data: any) => ({
  type: types.GET_ROLE_SUCCESS,
  payload: data,
});

export const getRoleFail = (data: any) => ({
  type: types.GET_ROLE_FAIL,
  payload: data,
});

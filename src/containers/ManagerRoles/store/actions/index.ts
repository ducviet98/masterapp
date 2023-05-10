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

export const updateRoleRequest = (data: any) => ({
  type: types.UPDATE_ROLE_REQUEST,
  payload: data,
});

export const updateRoleSuccess = (data: any) => ({
  type: types.UPDATE_ROLE_SUCCESS,
  payload: data,
});

export const updateRoleFail = (data: any) => ({
  type: types.UPDATE_ROLE_FAIL,
  payload: data,
});

export const createRoleRequest = (data: any) => ({
  type: types.CREATE_ROLE_REQUEST,
  payload: data,
});

export const createRoleSuccess = (data: any) => ({
  type: types.CREATE_ROLE_SUCCESS,
  payload: data,
});

export const createRoleFail = (data: any) => ({
  type: types.CREATE_ROLE_FAIL,
  payload: data,
});

export const deleteRoleRequest = (data: any) => ({
  type: types.DELETE_ROLE_REQUEST,
  payload: data,
});

export const deleteRoleSuccess = (data: any) => ({
  type: types.DELETE_ROLE_SUCCESS,
  payload: data,
});

export const deleteRoleFail = (data: any) => ({
  type: types.DELETE_ROLE_FAIL,
  payload: data,
});
import * as types from '../constants';

export const getOrganizationRequest = () => ({
  type: types.GET_ORGANIZATION_REQUEST,
});

export const getOrganizationSuccess = (data: any) => ({
  type: types.GET_ORGANIZATION_SUCCESS,
  payload: data,
});

export const getOrganizationFail = (data: any) => ({
  type: types.GET_ORGANIZATION_FAIL,
  payload: data,
});

export const createOrganizationRequest = (data: any) => ({
  type: types.CREATE_ORGANIZATION_REQUEST,
  payload: data,
});

export const createOrganizationSuccess = (data: any) => ({
  type: types.CREATE_ORGANIZATION_SUCCESS,
  payload: data,
});

export const createOrganizationFail = (data: any) => ({
  type: types.CREATE_ORGANIZATION_FAIL,
  payload: data,
});

export const switchOrganizationRequest = (data: any) => ({
  type: types.SWITCH_ORGANIZATION_REQUEST,
  payload: data,
});

export const switchOrganizationSuccess = (data: any) => ({
  type: types.SWITCH_ORGANIZATION_SUCCESS,
  payload: data,
});

export const switchOrganizationFail = (data: any) => ({
  type: types.SWITCH_ORGANIZATION_FAIL,
  payload: data,
});

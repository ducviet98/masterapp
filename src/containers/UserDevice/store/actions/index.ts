import * as types from '../constants';

export const getUserDeviceRequest = (data: any) => {
  return {
    type: types.GET_USER_DEVICE_REQUEST,
    payload: data,
  };
};

export const getUserDeviceSuccess = (data: any) => {
  return {
    type: types.GET_USER_DEVICE_SUCCESS,
    payload: data,
  };
};

export const getUserDeviceFail = (data: any) => {
  return {
    type: types.GET_USER_DEVICE_FAIL,
    payload: data,
  };
};

export const getDeviceDetailRequest = (data: any) => {
  return {
    type: types.GET_DEVICE_DETAIL_REQUEST,
    payload: data,
  };
};

export const getDeviceDetailSuccess = (data: any) => {
  return {
    type: types.GET_DEVICE_DETAIL_SUCCESS,
    payload: data,
  };
};

export const getDeviceDetailFail = (data: any) => {
  return {
    type: types.GET_DEVICE_DETAIL_FAIL,
    payload: data,
  };
};



export const createDeviceRequest = (data: any) => {
  return {
    type: types.CREATE_DEVICE_REQUEST,
    payload: data,
  };
};

export const createDeviceSuccess = (data: any) => {
  return {
    type: types.CREATE_DEVICE_SUCCESS,
    payload: data,
  };
};

export const createDeviceFail = (data: any) => {
  return {
    type: types.CREATE_DEVICE_FAIL,
    payload: data,
  };
};

export const getCategoriesRequest = () => {
  return {
    type: types.GET_CATEGORIES_REQUEST
  };
};

export const getCategoriesSuccess = (data: any) => {
  return {
    type: types.GET_CATEGORIES_SUCCESS,
    payload: data,
  };
};

export const getCategoriesFail = (data: any) => {
  return {
    type: types.GET_CATEGORIES_FAIL,
    payload: data,
  };
};

export const getBrandsRequest = () => {
  return {
    type: types.GET_BRANDS_REQUEST
  };
};

export const getBrandsSuccess = (data: any) => {
  return {
    type: types.GET_BRANDS_SUCCESS,
    payload: data,
  };
};

export const getBrandsFail = (data: any) => {
  return {
    type: types.GET_BRANDS_FAIL,
    payload: data,
  };
};

export const getStatusRequest = () => {
  return {
    type: types.GET_STATUS_REQUEST
  };
};

export const getStatusSuccess = (data: any) => {
  return {
    type: types.GET_STATUS_SUCCESS,
    payload: data,
  };
};

export const getStatusFail = (data: any) => {
  return {
    type: types.GET_STATUS_FAIL,
    payload: data,
  };
};


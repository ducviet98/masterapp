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

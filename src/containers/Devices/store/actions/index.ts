import * as types from '../constants';

export const getUserDeviceRequest = (data: any) => ({
  type: types.GET_USER_DEVICE_REQUEST,
  payload: data,
})

export const getUserDeviceSuccess = (data: any) => ({
  type: types.GET_USER_DEVICE_SUCCESS,
  payload: data,
})

export const getUserDeviceFail = (data: any) => ({
  type: types.GET_USER_DEVICE_FAIL,
  payload: data,
})

export const getDeviceDetailRequest = (data: any) => ({
  type: types.GET_DEVICE_DETAIL_REQUEST,
  payload: data,
})

export const getDeviceDetailSuccess = (data: any) => ({
  type: types.GET_DEVICE_DETAIL_SUCCESS,
  payload: data,
})

export const getDeviceDetailFail = (data: any) => ({
  type: types.GET_DEVICE_DETAIL_FAIL,
  payload: data,
})



export const createDeviceRequest = (data: any) => ({
  type: types.CREATE_DEVICE_REQUEST,
  payload: data,
})

export const createDeviceSuccess = (data: any) => ({
  type: types.CREATE_DEVICE_SUCCESS,
  payload: data,
})

export const createDeviceFail = (data: any) => ({
  type: types.CREATE_DEVICE_FAIL,
  payload: data,
})

export const getCategoriesRequest = () => ({
  type: types.GET_CATEGORIES_REQUEST
})

export const getCategoriesSuccess = (data: any) => ({
  type: types.GET_CATEGORIES_SUCCESS,
  payload: data,
})

export const getCategoriesFail = (data: any) => ({
  type: types.GET_CATEGORIES_FAIL,
  payload: data,
})

export const getBrandsRequest = () => ({
  type: types.GET_BRANDS_REQUEST
})

export const getBrandsSuccess = (data: any) => ({
  type: types.GET_BRANDS_SUCCESS,
  payload: data,
})

export const getBrandsFail = (data: any) => ({
  type: types.GET_BRANDS_FAIL,
  payload: data,
})

export const getStatusRequest = () => ({
  type: types.GET_STATUS_REQUEST
})

export const getStatusSuccess = (data: any) => ({
  type: types.GET_STATUS_SUCCESS,
  payload: data,
})

export const getStatusFail = (data: any) => ({
  type: types.GET_STATUS_FAIL,
  payload: data,
})

export const deleteDeviceRequest = (data: number) => ({
  type: types.DELETE_DEVICE_REQUEST,
  payload: data
})

export const deleteDeviceSuccess = (data: number) => ({
  type: types.DELETE_DEVICE_SUCCESS,
  payload: data
})
export const deleteDeviceFail = (data: any) => ({
  type: types.DELETE_DEVICE_FAIL,
  payload: data
})

export const editDeviceRequest = (data: any) => ({
  type: types.EDIT_DEVICE_REQUEST,
  payload: data,
})

export const editDeviceSuccess = (data: any) => ({
  type: types.EDIT_DEVICE_SUCCESS,
  payload: data,
})

export const editDeviceFail = (data: any) => ({
  type: types.EDIT_DEVICE_FAIL,
  payload: data,
})
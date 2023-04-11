import * as types from '../constants';

export const getAccessoryInfoRequest = (data: any) => ({
  type: types.GET_ACCESSORY_INFO_REQUEST,
  payload: data,
})

export const getAccessoryInfoSuccess = (data: any) => ({
  type: types.GET_ACCESSORY_INFO_SUCCESS,
  payload: data,
})

export const getAccessoryInfoFail = (data: any) => ({
  type: types.GET_ACCESSORY_INFO_FAIL,
  payload: data,
})

export const createAccessoryInfoRequest = (data: any) => ({
  type: types.CREATE_ACCESSORY_INFO_REQUEST,
  payload: data,
})

export const createAccessoryInfoSuccess = (data: any) => ({
  type: types.CREATE_ACCESSORY_INFO_SUCCESS,
  payload: data,
})

export const createAccessoryInfoFail = (data: any) => ({
  type: types.CREATE_ACCESSORY_INFO_FAIL,
  payload: data,
})

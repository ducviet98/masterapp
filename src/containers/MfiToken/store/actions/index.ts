import * as types from '../constants';

export const getMfiTokenRequest = (data: any) => ({
  type: types.GET_MFI_TOKEN_REQUEST,
  payload: data,
})

export const getMfiTokenSuccess = (data: any) => ({
  type: types.GET_MFI_TOKEN_SUCCESS,
  payload: data,
})

export const getMfiTokenFail = (data: any) => ({
  type: types.GET_MFI_TOKEN_FAIL,
  payload: data,
})

export const getMfiTokenDetailRequest = (data: any) => ({
  type: types.GET_MFI_TOKEN_DETAIL_REQUEST,
  payload: data,
})

export const getMfiTokenDetailSuccess = (data: any) => ({
  type: types.GET_MFI_TOKEN_DETAIL_SUCCESS,
  payload: data,
})

export const getMfiTokenDetailFail = (data: any) => ({
  type: types.GET_MFI_TOKEN_DETAIL_FAIL,
  payload: data,
})


export const createMfiTokenRequest = (data: any) => ({
  type: types.CREATE_MFI_TOKEN_REQUEST,
  payload: data,
})

export const createMfiTokenSuccess = (data: any) => ({
  type: types.CREATE_MFI_TOKEN_SUCCESS,
  payload: data,
})

export const createMfiTokenFail = (data: any) => ({
  type: types.CREATE_MFI_TOKEN_FAIL,
  payload: data,
})


export const deleteMfiTokenRequest = (data: any) => ({
  type: types.DELETE_MFI_TOKEN_REQUEST,
  payload: data
})

export const deleteMfiTokenSuccess = (data: number) => ({
  type: types.DELETE_MFI_TOKEN_SUCCESS,
  payload: data
})
export const deleteMfiTokenFail = (data: any) => ({
  type: types.DELETE_MFI_TOKEN_FAIL,
  payload: data
})

export const editMfiTokenRequest = (data: any) => ({
  type: types.EDIT_MFI_TOKEN_REQUEST,
  payload: data,
})

export const editMfiTokenSuccess = (data: any) => ({
  type: types.EDIT_MFI_TOKEN_SUCCESS,
  payload: data,
})

export const editMfiTokenFail = (data: any) => ({
  type: types.EDIT_MFI_TOKEN_FAIL,
  payload: data,
})

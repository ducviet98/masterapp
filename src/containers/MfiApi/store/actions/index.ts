import * as types from '../constants';

export const getMfiApiRequest = (data: any) => ({
  type: types.GET_MFI_API_REQUEST,
  payload: data,
})

export const getMfiApiSuccess = (data: any) => ({
  type: types.GET_MFI_API_SUCCESS,
  payload: data,
})

export const getMfiApiFail = (data: any) => ({
  type: types.GET_MFI_API_FAIL,
  payload: data,
})

export const getMfiApiDetailRequest = (data: any) => ({
  type: types.GET_MFI_API_DETAIL_REQUEST,
  payload: data,
})

export const getMfiApiDetailSuccess = (data: any) => ({
  type: types.GET_MFI_API_DETAIL_SUCCESS,
  payload: data,
})

export const getMfiApiDetailFail = (data: any) => ({
  type: types.GET_MFI_API_DETAIL_FAIL,
  payload: data,
})


export const createMfiApiRequest = (data: any) => ({
  type: types.CREATE_MFI_API_REQUEST,
  payload: data,
})

export const createMfiApiSuccess = (data: any) => ({
  type: types.CREATE_MFI_API_SUCCESS,
  payload: data,
})

export const createMfiApiFail = (data: any) => ({
  type: types.CREATE_MFI_API_FAIL,
  payload: data,
})


export const deleteMfiApiRequest = (data: any) => ({
  type: types.DELETE_MFI_API_REQUEST,
  payload: data
})

export const deleteMfiApiSuccess = (data: number) => ({
  type: types.DELETE_MFI_API_SUCCESS,
  payload: data
})
export const deleteMfiApiFail = (data: any) => ({
  type: types.DELETE_MFI_API_FAIL,
  payload: data
})

export const editMfiApiRequest = (data: any) => ({
  type: types.EDIT_MFI_API_REQUEST,
  payload: data,
})

export const editMfiApiSuccess = (data: any) => ({
  type: types.EDIT_MFI_API_SUCCESS,
  payload: data,
})

export const editMfiApiFail = (data: any) => ({
  type: types.EDIT_MFI_API_FAIL,
  payload: data,
})

export const requestMfiApiRequest = (data: any) => ({
  type: types.REQUEST_MFI_API_REQUEST,
  payload: data,
})

export const requestMfiApiSuccess = (data: any) => ({
  type: types.REQUEST_MFI_API_SUCCESS,
  payload: data,
})

export const requestMfiApiFail = (data: any) => ({
  type: types.REQUEST_MFI_API_FAIL,
  payload: data,
})

export const removeMfiApiRequest = () => ({
  type: types.REMOVE_MFI_API_REQUEST,
})

import * as types from '../constants';

export const getCertificateRequest = (data: any) => ({
  type: types.GET_CERTIFICATE_REQUEST,
  payload: data,
})

export const getCertificateSuccess = (data: any) => ({
  type: types.GET_CERTIFICATE_SUCCESS,
  payload: data,
})

export const getCertificateFail = (data: any) => ({
  type: types.GET_CERTIFICATE_FAIL,
  payload: data,
})

export const getCertificateDetailRequest = (data: any) => ({
  type: types.GET_CERTIFICATE_DETAIL_REQUEST,
  payload: data,
})

export const getCertificateDetailSuccess = (data: any) => ({
  type: types.GET_CERTIFICATE_DETAIL_SUCCESS,
  payload: data,
})

export const getCertificateDetailFail = (data: any) => ({
  type: types.GET_CERTIFICATE_DETAIL_FAIL,
  payload: data,
})


export const createCertificateRequest = (data: any) => ({
  type: types.CREATE_CERTIFICATE_REQUEST,
  payload: data,
})

export const createCertificateSuccess = (data: any) => ({
  type: types.CREATE_CERTIFICATE_SUCCESS,
  payload: data,
})

export const createCertificateFail = (data: any) => ({
  type: types.CREATE_CERTIFICATE_FAIL,
  payload: data,
})


export const deleteCertificateRequest = (data: any) => ({
  type: types.DELETE_CERTIFICATE_REQUEST,
  payload: data
})

export const deleteCertificateSuccess = (data: number) => ({
  type: types.DELETE_CERTIFICATE_SUCCESS,
  payload: data
})
export const deleteCertificateFail = (data: any) => ({
  type: types.DELETE_CERTIFICATE_FAIL,
  payload: data
})

export const editCertificateRequest = (data: any) => ({
  type: types.EDIT_CERTIFICATE_REQUEST,
  payload: data,
})

export const editCertificateSuccess = (data: any) => ({
  type: types.EDIT_CERTIFICATE_SUCCESS,
  payload: data,
})

export const editCertificateFail = (data: any) => ({
  type: types.EDIT_CERTIFICATE_FAIL,
  payload: data,
})

export const closeDialogNotification = () => ({
  type: types.CLOSE_DIALOG_CERTIFICATE
})
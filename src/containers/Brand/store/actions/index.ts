import * as types from '../constants';

export const getBrandRequest = (data: any) => ({
  type: types.GET_BRAND_REQUEST,
  payload: data,
})

export const getBrandSuccess = (data: any) => ({
  type: types.GET_BRAND_SUCCESS,
  payload: data,
})

export const getBrandFail = (data: any) => ({
  type: types.GET_BRAND_FAIL,
  payload: data,
})

export const getBrandDetailRequest = (data: any) => ({
  type: types.GET_BRAND_DETAIL_REQUEST,
  payload: data,
})

export const getBrandDetailSuccess = (data: any) => ({
  type: types.GET_BRAND_DETAIL_SUCCESS,
  payload: data,
})

export const getBrandDetailFail = (data: any) => ({
  type: types.GET_BRAND_DETAIL_FAIL,
  payload: data,
})


export const createBrandRequest = (data: any) => ({
  type: types.CREATE_BRAND_REQUEST,
  payload: data,
})

export const createBrandSuccess = (data: any) => ({
  type: types.CREATE_BRAND_SUCCESS,
  payload: data,
})

export const createBrandFail = (data: any) => ({
  type: types.CREATE_BRAND_FAIL,
  payload: data,
})


export const deleteBrandRequest = (data: any) => ({
  type: types.DELETE_BRAND_REQUEST,
  payload: data
})

export const deleteBrandSuccess = (data: number) => ({
  type: types.DELETE_BRAND_SUCCESS,
  payload: data
})
export const deleteBrandFail = (data: any) => ({
  type: types.DELETE_BRAND_FAIL,
  payload: data
})

export const editBrandRequest = (data: any) => ({
  type: types.EDIT_BRAND_REQUEST,
  payload: data,
})

export const editBrandSuccess = (data: any) => ({
  type: types.EDIT_BRAND_SUCCESS,
  payload: data,
})

export const editBrandFail = (data: any) => ({
  type: types.EDIT_BRAND_FAIL,
  payload: data,
})

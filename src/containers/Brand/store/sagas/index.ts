import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions';
import * as types from '../constants';
import {
  createBrandService,
  deleteBrandService,
  editBrandService,
  getBrandDetailService, getBrandService
} from '../services';


function* getBrandSaga({ payload }: any) {
  try {
    const { data } = yield call(getBrandService, payload);
    yield put(actionTypes.getBrandSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getBrandFail(error));
    toast.error('Get Brand Fail !');
  }
}

function* createBrandSaga({ payload }: any) {
  try {
    const { data } = yield call(createBrandService, payload);
    yield payload.callback();
    yield put(actionTypes.createBrandSuccess(data));
    toast.success('Create Brand Successfully !');
  } catch (error: any) {
    yield put(actionTypes.createBrandFail(error));
    toast.error('Create Brand Fail !');
  }
}

function* deleteBrandSaga({ payload }: any) {
  try {
    yield Promise.all(payload.ids.map((item: number) => deleteBrandService(item)))
    yield put(actionTypes.deleteBrandSuccess(payload));
    yield payload.callback();
    toast.success('Delete Brand Successfully !');
  } catch (err: any) {
    yield put(actionTypes.deleteBrandFail(err));
    toast.error('Delete Brand Fail !');
  }
}

function* editBrandSaga({ payload }: any) {
  try {
    const { data } = yield call(editBrandService, payload);
    yield payload.callback();
    yield put(actionTypes.editBrandSuccess(data));
    toast.success('Update Brand Successfully !');
  } catch (error: any) {
    yield put(actionTypes.editBrandFail(error));
    toast.error('Update Brand Fail !');
  }
}

function* getBrandDetailSaga({ payload }: any) {
  try {
    const { data } = yield call(getBrandDetailService, payload);
    yield put(actionTypes.getBrandDetailSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getBrandDetailFail(error));
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_BRAND_REQUEST, getBrandSaga);
  yield takeLatest(types.CREATE_BRAND_REQUEST, createBrandSaga);
  yield takeLatest(types.DELETE_BRAND_REQUEST, deleteBrandSaga);
  yield takeLatest(types.EDIT_BRAND_REQUEST, editBrandSaga);
  yield takeLatest(types.GET_BRAND_DETAIL_REQUEST, getBrandDetailSaga);
}

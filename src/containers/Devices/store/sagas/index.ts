import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import * as actionTypes from '../actions';
import * as types from '../constants';
import {
  getUserDeviceService,
  getCategoriesService,
  getBrandsService,
  getStatusService,
  createDeviceService,
  deleteDeviceService,
  editDeviceService,
  getDeviceDetailService,
} from '../services';

function* getUserDeviceSaga({ payload }: any) {
  try {
    const { data } = yield call(getUserDeviceService, payload);
    yield put(actionTypes.getUserDeviceSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getUserDeviceFail(error));
  }
}

function* getCategoriesSaga({ payload }: any) {
  try {
    const { data } = yield call(getCategoriesService);
    yield put(actionTypes.getCategoriesSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getCategoriesFail(error));
  }
}

function* getBrandsSaga() {
  try {
    const { data } = yield call(getBrandsService);
    yield put(actionTypes.getBrandsSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getBrandsFail(error));
  }
}

function* getStatusSaga() {
  try {
    const { data } = yield call(getStatusService);
    yield put(actionTypes.getStatusSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getStatusFail(error));
  }
}

function* createDeviceSaga({ payload }: any) {
  try {
    const { data } = yield call(createDeviceService, payload);
    yield payload.callback();
    yield put(actionTypes.createDeviceSuccess(data));
    toast.success('Create Device Successfully !');
  } catch (error: any) {
    yield put(actionTypes.createDeviceFail(error));
    toast.error('Create Device Fail !');
  }
}

function* deleteDeviceSaga({ payload }: any) {
  try {
    yield call(deleteDeviceService, payload);
    yield put(actionTypes.deleteDeviceSuccess(payload));
    toast.success('Delete Device Successfully !');
  } catch (err: any) {
    yield put(actionTypes.deleteDeviceFail(err));
    toast.error('Delete Device Fail !');
  }
}

function* editDeviceSaga({ payload }: any) {
  try {
    const { data } = yield call(editDeviceService, payload);
    yield payload.callback();
    yield put(actionTypes.editDeviceSuccess(data));
    toast.success('Update Device Successfully !');
  } catch (error: any) {
    yield put(actionTypes.editDeviceFail(error));
    toast.error('Update Device Fail !');
  }
}

function* getDeviceDetailSaga({ payload }: any) {
  try {
    const { data } = yield call(getDeviceDetailService, payload);
    yield put(actionTypes.getDeviceDetailSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getDeviceDetailFail(error));
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_USER_DEVICE_REQUEST, getUserDeviceSaga);
  yield takeLatest(types.GET_CATEGORIES_REQUEST, getCategoriesSaga);
  yield takeLatest(types.GET_BRANDS_REQUEST, getBrandsSaga);
  yield takeLatest(types.GET_STATUS_REQUEST, getStatusSaga);
  yield takeLatest(types.CREATE_DEVICE_REQUEST, createDeviceSaga);
  yield takeLatest(types.DELETE_DEVICE_REQUEST, deleteDeviceSaga);
  yield takeLatest(types.EDIT_DEVICE_REQUEST, editDeviceSaga);
  yield takeLatest(types.GET_DEVICE_DETAIL_REQUEST, getDeviceDetailSaga);
}

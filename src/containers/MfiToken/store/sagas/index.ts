import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions';
import * as types from '../constants';
import {
  createMfiTokenService,
  deleteMfiTokenService,
  editMfiTokenService,
  getMfiTokenDetailService, getMfiTokenService
} from '../services';


function* getMfiTokenSaga({ payload }: any) {
  try {
    const { data } = yield call(getMfiTokenService, payload);
    yield put(actionTypes.getMfiTokenSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getMfiTokenFail(error));
    toast.error('Get MfiToken Fail !');
  }
}


function* createMfiTokenSaga({ payload }: any) {
  try {
    const { data } = yield call(createMfiTokenService, payload);
    yield payload.callback();
    yield put(actionTypes.createMfiTokenSuccess(data));
    toast.success('Create MfiToken Successfully !');
  } catch (error: any) {
    yield put(actionTypes.createMfiTokenFail(error));
    toast.error('Create MfiToken Fail !');
  }
}

function* deleteMfiTokenSaga({ payload }: any) {
  try {
    yield Promise.all(payload.ids.map((item: number) => deleteMfiTokenService(item)))
    yield put(actionTypes.deleteMfiTokenSuccess(payload));
    yield payload.callback();
    toast.success('Delete MfiToken Successfully !');
  } catch (err: any) {
    yield put(actionTypes.deleteMfiTokenFail(err));
    toast.error('Delete MfiToken Fail !');
  }
}

function* editMfiTokenSaga({ payload }: any) {
  try {
    const { data } = yield call(editMfiTokenService, payload);
    yield payload.callback();
    yield put(actionTypes.editMfiTokenSuccess(data));
    toast.success('Update MfiToken Successfully !');
  } catch (error: any) {
    yield put(actionTypes.editMfiTokenFail(error));
    toast.error('Update MfiToken Fail !');
  }
}

function* getMfiTokenDetailSaga({ payload }: any) {
  try {
    const { data } = yield call(getMfiTokenDetailService, payload);
    yield put(actionTypes.getMfiTokenDetailSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getMfiTokenDetailFail(error));
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_MFI_TOKEN_REQUEST, getMfiTokenSaga);
  yield takeLatest(types.CREATE_MFI_TOKEN_REQUEST, createMfiTokenSaga);
  yield takeLatest(types.DELETE_MFI_TOKEN_REQUEST, deleteMfiTokenSaga);
  yield takeLatest(types.EDIT_MFI_TOKEN_REQUEST, editMfiTokenSaga);
  yield takeLatest(types.GET_MFI_TOKEN_DETAIL_REQUEST, getMfiTokenDetailSaga);
}

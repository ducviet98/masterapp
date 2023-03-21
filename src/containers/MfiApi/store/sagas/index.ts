import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions';
import * as types from '../constants';
import {
  createMfiApiService,
  deleteMfiApiService,
  editMfiApiService,
  getMfiApiDetailService, getMfiApiService
} from '../services';


function* getMfiApiSaga({ payload }: any) {
  try {
    const { data } = yield call(getMfiApiService, payload);
    yield put(actionTypes.getMfiApiSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getMfiApiFail(error));
    toast.error('Get MfiApi Fail !');
  }
}


function* createMfiApiSaga({ payload }: any) {
  try {
    const { data } = yield call(createMfiApiService, payload);
    yield payload.callback();
    yield put(actionTypes.createMfiApiSuccess(data));
    toast.success('Create MfiApi Successfully !');
  } catch (error: any) {
    yield put(actionTypes.createMfiApiFail(error));
    toast.error('Create MfiApi Fail !');
  }
}

function* deleteMfiApiSaga({ payload }: any) {
  try {
    yield Promise.all(payload.ids.map((item: number) => deleteMfiApiService(item)))
    yield put(actionTypes.deleteMfiApiSuccess(payload));
    yield payload.callback();
    toast.success('Delete MfiApi Successfully !');
  } catch (err: any) {
    yield put(actionTypes.deleteMfiApiFail(err));
    toast.error('Delete MfiApi Fail !');
  }
}

function* editMfiApiSaga({ payload }: any) {
  try {
    const { data } = yield call(editMfiApiService, payload);
    yield payload.callback();
    yield put(actionTypes.editMfiApiSuccess(data));
    toast.success('Update MfiApi Successfully !');
  } catch (error: any) {
    yield put(actionTypes.editMfiApiFail(error));
    toast.error('Update MfiApi Fail !');
  }
}

function* getMfiApiDetailSaga({ payload }: any) {
  try {
    const { data } = yield call(getMfiApiDetailService, payload);
    yield put(actionTypes.getMfiApiDetailSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getMfiApiDetailFail(error));
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_MFI_API_REQUEST, getMfiApiSaga);
  yield takeLatest(types.CREATE_MFI_API_REQUEST, createMfiApiSaga);
  yield takeLatest(types.DELETE_MFI_API_REQUEST, deleteMfiApiSaga);
  yield takeLatest(types.EDIT_MFI_API_REQUEST, editMfiApiSaga);
  yield takeLatest(types.GET_MFI_API_DETAIL_REQUEST, getMfiApiDetailSaga);
}

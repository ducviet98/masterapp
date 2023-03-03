import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions';
import * as types from '../constants';
import {
  createCertificateService,
  deleteCertificateService,
  editCertificateService,
  getCertificateDetailService, getCertificateService
} from '../services';


function* getCertificateSaga({ payload }: any) {
  try {
    const { data } = yield call(getCertificateService, payload);
    yield put(actionTypes.getCertificateSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getCertificateFail(error));
  }
}


function* createCertificateSaga({ payload }: any) {
  try {
    const { data } = yield call(createCertificateService, payload);
    yield payload.callback();
    yield put(actionTypes.createCertificateSuccess(data));
    toast.success('Create Certificate Successfully !');
  } catch (error: any) {
    yield put(actionTypes.createCertificateFail(error));
    toast.error('Create Certificate Fail !');
  }
}

function* deleteCertificateSaga({ payload }: any) {
  try {
    yield Promise.all(payload.ids.map((item: number) => deleteCertificateService(item)))
    yield put(actionTypes.deleteCertificateSuccess(payload));
    yield payload.callback();
    toast.success('Delete Certificate Successfully !');
  } catch (err: any) {
    yield put(actionTypes.deleteCertificateFail(err));
    toast.error('Delete Certificate Fail !');
  }
}

function* editCertificateSaga({ payload }: any) {
  try {
    const { data } = yield call(editCertificateService, payload);
    yield payload.callback();
    yield put(actionTypes.editCertificateSuccess(data));
    toast.success('Update Certificate Successfully !');
  } catch (error: any) {
    yield put(actionTypes.editCertificateFail(error));
    toast.error('Update Certificate Fail !');
  }
}

function* getCertificateDetailSaga({ payload }: any) {
  try {
    const { data } = yield call(getCertificateDetailService, payload);
    yield put(actionTypes.getCertificateDetailSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getCertificateDetailFail(error));
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_CERTIFICATE_REQUEST, getCertificateSaga);
  yield takeLatest(types.CREATE_CERTIFICATE_REQUEST, createCertificateSaga);
  yield takeLatest(types.DELETE_CERTIFICATE_REQUEST, deleteCertificateSaga);
  yield takeLatest(types.EDIT_CERTIFICATE_REQUEST, editCertificateSaga);
  yield takeLatest(types.GET_CERTIFICATE_DETAIL_REQUEST, getCertificateDetailSaga);
}

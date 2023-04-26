import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import CookieHandlerInstance from 'src/utils/cookie';
import AxiosClientInstance from 'src/utils/axios';

import * as actionTypes from '../actions';
import * as types from '../constants';

import { getPermissionService, getRoleService } from '../services';

function* getPermissionSaga() {
  try {
    const { data } = yield call(getPermissionService);

    const currentOrganizations = CookieHandlerInstance.getCookie('current_organizations');
    AxiosClientInstance.setHeaderOrganization(currentOrganizations);
    yield put(actionTypes.getPermissionSuccess(data));
  } catch (error) {
    yield put(actionTypes.getPermissionFail(error));
    toast.error('Get Organization Fail !');
  }
}

function* getRoleSaga({ payload }: any) {
  try {
    const { data } = yield call(getRoleService, payload);
    yield put(actionTypes.getRoleSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getRoleFail(error));
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_PERMISSION_REQUEST, getPermissionSaga);
  yield takeLatest(types.GET_ROLE_REQUEST, getRoleSaga);
}

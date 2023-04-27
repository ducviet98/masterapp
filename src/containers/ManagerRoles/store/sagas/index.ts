import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import CookieHandlerInstance from 'src/utils/cookie';
import AxiosClientInstance from 'src/utils/axios';

import * as actionTypes from '../actions';
import * as types from '../constants';

import {
  getPermissionService,
  getRoleService,
  updateRoleService,
  createRoleService,
  deleteRoleService,
} from '../services';

function* getPermissionSaga() {
  try {
    const { data } = yield call(getPermissionService);
    const currentOrganizations = CookieHandlerInstance.getCookie('current_organizations');
    AxiosClientInstance.setHeaderOrganization(currentOrganizations);
    yield put(actionTypes.getPermissionSuccess(data));
  } catch (error) {
    yield put(actionTypes.getPermissionFail(error));
    toast.error('Get Permission Fail !');
  }
}

function* getRoleSaga({ payload }: any) {
  try {
    const currentOrganizations = CookieHandlerInstance.getCookie('current_organizations');
    AxiosClientInstance.setHeaderOrganization(currentOrganizations);
    const { data } = yield call(getRoleService, payload);
    yield put(actionTypes.getRoleSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getRoleFail(error));
  }
}

function* updateRoleSaga({ payload }: any) {
  try {
    yield call(updateRoleService, payload);
    yield put(actionTypes.updateRoleSuccess(payload));
    yield payload.callback();
    yield payload.callbackClear();
    toast.success('Update Success !');
  } catch (error: any) {
    yield put(actionTypes.updateRoleFail(error));
  }
}

function* createRoleSaga({ payload }: any) {
  try {
    yield call(createRoleService, payload);
    yield put(actionTypes.createRoleSuccess(payload));
    yield payload.callback();
    yield payload.callbackClear();
    toast.success('Create Role Success !');
  } catch (error: any) {
    yield put(actionTypes.createRoleFail(error));
    toast.error('Create Role Fail !');
  }
}

function* deleteRoleSaga({ payload }: any) {
  try {
    yield Promise.all(payload.ids.map((item: number) => deleteRoleService(item)));
    yield put(actionTypes.deleteRoleSuccess(payload));
    yield payload.callback();
    toast.success('Delete Role Success !');
  } catch (error: any) {
    yield put(actionTypes.deleteRoleFail(error));
    toast.error(error?.data?.detail || 'Delete Role Fail !');
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_PERMISSION_REQUEST, getPermissionSaga);
  yield takeLatest(types.GET_ROLE_REQUEST, getRoleSaga);
  yield takeLatest(types.UPDATE_ROLE_REQUEST, updateRoleSaga);
  yield takeLatest(types.CREATE_ROLE_REQUEST, createRoleSaga);
  yield takeLatest(types.DELETE_ROLE_REQUEST, deleteRoleSaga);
}

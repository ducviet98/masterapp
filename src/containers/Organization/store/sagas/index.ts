import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import CookieHandlerInstance from 'src/utils/cookie';
import AxiosClientInstance from 'src/utils/axios';

import * as actionTypes from '../actions';
import * as types from '../constants';

import {
  getOrganizationService,
  createOrganizationService,
  getOrganizationMemberService,
  getRoleOrganizationService,
} from '../services';

function* getOrganizationSaga() {
  try {
    const { data } = yield call(getOrganizationService);

    const currentOrganizations = CookieHandlerInstance.getCookie('current_organizations');

    if (currentOrganizations) {
      AxiosClientInstance.setHeaderOrganization(currentOrganizations);
    }

    if (data.results.length === 0) {
      CookieHandlerInstance.removeCookie('current_organizations');
    }

    if (data.results[0]?.id) {
      CookieHandlerInstance.setCookie('current_organizations', data.results[0]?.id);
    }

    yield put(actionTypes.getOrganizationSuccess(data));
  } catch (error) {
    yield put(actionTypes.getOrganizationFail(error));
    toast.error('Get Organization Fail !');
  }
}

function* createOrganizationSaga({ payload }: any) {
  try {
    const { data } = yield call(createOrganizationService, payload.name);
    yield CookieHandlerInstance.setCookie('current_organizations', data.id);
    yield AxiosClientInstance.setHeaderOrganization(data.id);
    yield put(actionTypes.createOrganizationSuccess(data));
    payload.callback();
  } catch (error) {
    yield put(actionTypes.createOrganizationFail(error));
  }
}

function* switchOrganizationSaga({ payload }: any) {
  try {
    yield CookieHandlerInstance.setCookie('current_organizations', payload.id);
    yield AxiosClientInstance.setHeaderOrganization(payload.id);
    yield put(actionTypes.switchOrganizationSuccess(payload));
    payload.callback();
  } catch (error) {
    yield put(actionTypes.switchOrganizationFail(error));
  }
}

function* getOrganizationMemberSaga({ payload }: any) {
  try {
    const { data } = yield call(getOrganizationMemberService, payload);
    yield put(actionTypes.getOrganizationMemberSuccess(data));
  } catch (error) {
    yield put(actionTypes.getOrganizationMemberFail(error));
    toast.error('Get Organization Member Fail !');
  }
}

function* getRoleOrganizationMemberSaga({ payload }: any) {
  try {
    const idOrganizations = CookieHandlerInstance.getCookie('current_organizations');
    yield AxiosClientInstance.setHeaderOrganization(idOrganizations);
    const { data } = yield call(getRoleOrganizationService);
    yield put(actionTypes.getRoleOrganizationMemberSuccess(data));
  } catch (error) {
    yield put(actionTypes.getRoleOrganizationMemberFail(error));
    toast.error('Get Role Organization Member Fail !');
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_ORGANIZATION_REQUEST, getOrganizationSaga);
  yield takeLatest(types.CREATE_ORGANIZATION_REQUEST, createOrganizationSaga);
  yield takeLatest(types.SWITCH_ORGANIZATION_REQUEST, switchOrganizationSaga);
  yield takeLatest(types.GET_ORGANIZATION_MEMBER_REQUEST, getOrganizationMemberSaga);
  yield takeLatest(types.GET_ROLE_ORGANIZATION_MEMBER_REQUEST, getRoleOrganizationMemberSaga);
}

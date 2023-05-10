import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';

import AxiosClientInstance from 'src/utils/axios';
import CookieHandlerInstance from 'src/utils/cookie';

import * as actionTypes from '../actions';
import * as types from '../constants';

import {
  createOrganizationService, deleteMemberOrganizationService, getDetailOrganizationMemberService, getOrganizationMemberService, getOrganizationService, getRoleOrganizationService,
  inviteOrganizationMemberService, updateMemberOrganizationService
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
    toast.success('Switch Organization !');
  } catch (error) {
    yield put(actionTypes.switchOrganizationFail(error));
  }
}

function* getOrganizationMemberSaga({ payload }: any) {
  try {
    const currentOrganizations = CookieHandlerInstance.getCookie('current_organizations');
    AxiosClientInstance.setHeaderOrganization(currentOrganizations);
    const { data } = yield call(getOrganizationMemberService, payload);
    yield put(actionTypes.getOrganizationMemberSuccess(data));
  } catch (error) {
    yield put(actionTypes.getOrganizationMemberFail(error));
  }
}

function* getRoleOrganizationMemberSaga({ payload }: any) {
  try {
    const { data } = yield call(getRoleOrganizationService, payload);
    yield put(actionTypes.getRoleOrganizationMemberSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getRoleOrganizationMemberFail(error));
    toast.error(error?.data?.detail || 'Get Role Organization Member Fail !');
  }
}

function* inviteOrganizationMemberSaga({ payload }: any) {
  try {
    yield call(inviteOrganizationMemberService, payload);
    yield put(actionTypes.inviteOrganizationMemberSuccess(payload));
    payload.callback();
  } catch (error: any) {
    yield put(actionTypes.inviteOrganizationMemberFail(error));
    toast.error(error?.data?.detail || 'Invite Organization Member Fail !');
    payload.callback();
  }
}

function* getDetailOrganizationMemberSaga({ payload }: any) {
  try {

    const { data } = yield call(getDetailOrganizationMemberService, payload); yield put(actionTypes.getDetailOrganizationMemberSuccess(data));
  } catch (error: any) {
    yield put(actionTypes.getDetailOrganizationMemberFail(error));
    toast.error('Get Detail Organization Member Fail !');
  }
}

function* deleteMemberOrganizationSaga({ payload }: any) {
  const { currentOrganizations, organization, organizationMember, userID, id } = payload;
  const newOrganization = organization.filter((item: any) => item.id !== +currentOrganizations);
  const isAdmin = organization.find((item: any) => item.created_by === userID);

  // yield Promise.all(payload.id.map((item: number) => deleteMemberOrganizationService(item)))

  try {
    yield call(deleteMemberOrganizationService, payload.id);

    if (organization.length === 1 && organizationMember.length === 1 && isAdmin) {
      return payload.callbackOrg();
    }

    if (organization.length > 1 && organizationMember.length > 1 && isAdmin) {
      yield CookieHandlerInstance.setCookie('current_organizations', newOrganization[0].id);
      yield AxiosClientInstance.setHeaderOrganization(newOrganization[0].id);
      yield put(actionTypes.deleteMemberOrganizationSuccess({ payload, newOrganization }));
    }

    if (organizationMember.length === 1 && organization.length > 1 && isAdmin) {
      yield CookieHandlerInstance.setCookie('current_organizations', newOrganization[0].id);
      yield AxiosClientInstance.setHeaderOrganization(newOrganization[0].id);
      yield put(actionTypes.deleteMemberOrganizationSuccess({ payload, newOrganization }));
    }

    payload.callback();
    toast.success('Delete Organization Member Success !');
  } catch (error: any) {
    yield put(actionTypes.deleteMemberOrganizationFail(error));
    toast.error(error?.data?.detail || 'Delete Organization Member Fail !');
  }
}

function* updateMemberOrganizationSaga({ payload }: any) {
  try {
    yield call(updateMemberOrganizationService, {
      role: payload.role,
      user: payload.email,
      id: payload.id
    });
    yield put(actionTypes.updateMemberOrganizationSuccess(payload));
    toast.error('Update Organization Member Success !');
    payload.callback();
  } catch (error: any) {
    yield put(actionTypes.updateMemberOrganizationFail(error));
    toast.error(error?.data?.detail || 'Update Organization Member Fail !');
  }
}

export default function* watchApp() {
  yield takeLatest(types.GET_ORGANIZATION_REQUEST, getOrganizationSaga);
  yield takeLatest(types.CREATE_ORGANIZATION_REQUEST, createOrganizationSaga);
  yield takeLatest(types.SWITCH_ORGANIZATION_REQUEST, switchOrganizationSaga);
  yield takeLatest(types.GET_ORGANIZATION_MEMBER_REQUEST, getOrganizationMemberSaga);
  yield takeLatest(types.GET_ROLE_ORGANIZATION_MEMBER_REQUEST, getRoleOrganizationMemberSaga);
  yield takeLatest(types.INVITE_ORGANIZATION_MEMBER_REQUEST, inviteOrganizationMemberSaga);
  yield takeLatest(types.GET_DETAIL_ORGANIZATION_MEMBER_REQUEST, getDetailOrganizationMemberSaga);
  yield takeLatest(types.DELETE_MEMBER_ORGANIZATION_REQUEST, deleteMemberOrganizationSaga);
  yield takeLatest(types.UPDATE_MEMBER_ORGANIZATION_REQUEST, updateMemberOrganizationSaga);
}

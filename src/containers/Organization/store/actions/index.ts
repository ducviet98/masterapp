import * as types from '../constants';

export const getOrganizationRequest = () => ({
  type: types.GET_ORGANIZATION_REQUEST,
});

export const getOrganizationSuccess = (data: any) => ({
  type: types.GET_ORGANIZATION_SUCCESS,
  payload: data,
});

export const getOrganizationFail = (data: any) => ({
  type: types.GET_ORGANIZATION_FAIL,
  payload: data,
});

export const createOrganizationRequest = (data: any) => ({
  type: types.CREATE_ORGANIZATION_REQUEST,
  payload: data,
});

export const createOrganizationSuccess = (data: any) => ({
  type: types.CREATE_ORGANIZATION_SUCCESS,
  payload: data,
});

export const createOrganizationFail = (data: any) => ({
  type: types.CREATE_ORGANIZATION_FAIL,
  payload: data,
});

export const switchOrganizationRequest = (data: any) => ({
  type: types.SWITCH_ORGANIZATION_REQUEST,
  payload: data,
});

export const switchOrganizationSuccess = (data: any) => ({
  type: types.SWITCH_ORGANIZATION_SUCCESS,
  payload: data,
});

export const switchOrganizationFail = (data: any) => ({
  type: types.SWITCH_ORGANIZATION_FAIL,
  payload: data,
});

export const getOrganizationMemberRequest = (data: any) => ({
  type: types.GET_ORGANIZATION_MEMBER_REQUEST,
  payload: data,
});

export const getOrganizationMemberSuccess = (data: any) => ({
  type: types.GET_ORGANIZATION_MEMBER_SUCCESS,
  payload: data,
});

export const getOrganizationMemberFail = (data: any) => ({
  type: types.GET_ORGANIZATION_MEMBER_FAIL,
  payload: data,
});

export const getRoleOrganizationMemberRequest = (data: any) => ({
  type: types.GET_ROLE_ORGANIZATION_MEMBER_REQUEST,
  payload: data,
});

export const getRoleOrganizationMemberSuccess = (data: any) => ({
  type: types.GET_ROLE_ORGANIZATION_MEMBER_SUCCESS,
  payload: data,
});

export const getRoleOrganizationMemberFail = (data: any) => ({
  type: types.GET_ROLE_ORGANIZATION_MEMBER_FAIL,
  payload: data,
});

export const inviteOrganizationMemberRequest = (data: any) => ({
  type: types.INVITE_ORGANIZATION_MEMBER_REQUEST,
  payload: data,
});

export const inviteOrganizationMemberSuccess = (data: any) => ({
  type: types.INVITE_ORGANIZATION_MEMBER_SUCCESS,
  payload: data,
});

export const inviteOrganizationMemberFail = (data: any) => ({
  type: types.INVITE_ORGANIZATION_MEMBER_FAIL,
  payload: data,
});

export const getDetailOrganizationMemberRequest = (id: string | undefined) => ({
  type: types.GET_DETAIL_ORGANIZATION_MEMBER_REQUEST,
  payload: id,
});

export const getDetailOrganizationMemberSuccess = (data: any) => ({
  type: types.GET_DETAIL_ORGANIZATION_MEMBER_SUCCESS,
  payload: data,
});

export const getDetailOrganizationMemberFail = (data: any) => ({
  type: types.GET_DETAIL_ORGANIZATION_MEMBER_FAIL,
  payload: data,
});

export const deleteMemberOrganizationRequest = (data: any) => ({
  type: types.DELETE_MEMBER_ORGANIZATION_REQUEST,
  payload: data,
});

export const deleteMemberOrganizationSuccess = (data: any) => ({
  type: types.DELETE_MEMBER_ORGANIZATION_SUCCESS,
  payload: data,
});

export const deleteMemberOrganizationFail = (data: any) => ({
  type: types.DELETE_MEMBER_ORGANIZATION_FAIL,
  payload: data,
});

export const updateMemberOrganizationRequest = (data: any) => ({
  type: types.UPDATE_MEMBER_ORGANIZATION_REQUEST,
  payload: data,
});

export const updateMemberOrganizationSuccess = (data: any) => ({
  type: types.UPDATE_MEMBER_ORGANIZATION_SUCCESS,
  payload: data,
});

export const updateMemberOrganizationFail = (data: any) => ({
  type: types.UPDATE_MEMBER_ORGANIZATION_FAIL,
  payload: data,
});

export const getPermissionRequest = (data: any) => ({
  type: types.GET_PERMISSION_REQUEST,
  payload: data,
});

export const getPermissionSuccess = (data: any) => ({
  type: types.GET_PERMISSION_SUCCESS,
  payload: data,
});

export const getPermissionFail = (data: any) => ({
  type: types.GET_PERMISSION_FAIL,
  payload: data,
});

/* eslint-disable */
import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  isLoading: false,
  total: 0,
  organizationData: [],
  error: '',
  organizationMember: [],
  roleUser: [],
};

const organizationReduce = (state = initialState, { type, payload }: any) =>
  produce(state, (draft) => {
    switch (type) {
      case types.GET_ORGANIZATION_REQUEST:
        draft.isLoading = true;
        draft.total = 0;
        draft.organizationData = [];
        draft.error = '';
        break;
      case types.GET_ORGANIZATION_SUCCESS:
        draft.isLoading = false;
        draft.organizationData = payload.results;
        draft.total = payload.count;
        draft.error = '';
        break;
      case types.GET_ORGANIZATION_FAIL:
        draft.isLoading = false;
        draft.organizationData = [];
        draft.total = 0;
        draft.error = payload.data;
        break;
      case types.GET_ORGANIZATION_MEMBER_REQUEST:
        draft.isLoading = true;
        draft.total = 0;
        draft.organizationMember = [];
        draft.error = '';
        break;
      case types.GET_ORGANIZATION_MEMBER_SUCCESS:
        draft.isLoading = false;
        draft.organizationMember = payload.results;
        draft.total = payload.count;
        draft.error = '';
        break;
      case types.GET_ORGANIZATION_MEMBER_FAIL:
        draft.isLoading = false;
        draft.organizationMember = [];
        draft.total = 0;
        draft.error = payload.data;
        break;
      case types.GET_ROLE_ORGANIZATION_MEMBER_REQUEST:
        draft.roleUser = [];
        break;
      case types.GET_ROLE_ORGANIZATION_MEMBER_SUCCESS:
        draft.roleUser = payload.results;
        break;
      case types.GET_ROLE_ORGANIZATION_MEMBER_FAIL:
        draft.roleUser = [];
        break;
      default:
        break;
    }
  });

export default organizationReduce;

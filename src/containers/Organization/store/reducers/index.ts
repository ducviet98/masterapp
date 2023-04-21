/* eslint-disable */
import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  isLoading: false,
  total: 0,
  organizationData: [],
  error: '',
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
      default:
        break;
    }
  });

export default organizationReduce;

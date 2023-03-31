/* eslint-disable */
import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  isLoading: true,
  total: 0,
  mfiApis: [],
  errors: '',
  mfiApiDetail: {},
  isLoadingAction: false,
  requestApi: null
};

const mfiApiReducer = (state = initialState, { type, payload }: any) =>
  produce(state, (draft) => {
    switch (type) {
      case types.GET_MFI_API_REQUEST:
        draft.isLoading = true;
        break;
      case types.GET_MFI_API_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_MFI_API_SUCCESS:
        draft.isLoading = false;
        draft.mfiApis = payload.results;
        draft.total = payload.count;
        break;

      // CREATE MFI_API
      case types.CREATE_MFI_API_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.CREATE_MFI_API_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.CREATE_MFI_API_SUCCESS:
        const newData: any = [...state.mfiApis, payload]
        draft.isLoadingAction = false;
        draft.mfiApis = newData;
        break;
      // DELETE MFI_API
      case types.DELETE_MFI_API_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.DELETE_MFI_API_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.DELETE_MFI_API_SUCCESS:
        draft.isLoadingAction = false;
        break;

      // EDIT MFI_API
      case types.EDIT_MFI_API_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.EDIT_MFI_API_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.EDIT_MFI_API_SUCCESS:
        draft.isLoadingAction = false;
        draft.mfiApiDetail = payload;
        break;
      // GET_MFI_API_DETAIL_REQUEST
      case types.GET_MFI_API_DETAIL_REQUEST:
        draft.isLoading = true;
        break;
      case types.GET_MFI_API_DETAIL_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_MFI_API_DETAIL_SUCCESS:
        draft.isLoading = false;
        draft.mfiApiDetail = payload;
        break;

      // REQUEST_MFI_API_REQUEST
      case types.REQUEST_MFI_API_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.REQUEST_MFI_API_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.REQUEST_MFI_API_SUCCESS:
        draft.isLoadingAction = false;
        draft.requestApi = payload;
        break;
      case types.REMOVE_MFI_API_REQUEST:
        draft.requestApi = null;
        break;
      default:
        break;
    }
  });

export default mfiApiReducer;


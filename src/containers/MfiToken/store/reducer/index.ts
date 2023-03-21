/* eslint-disable */
import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  isLoading: true,
  total: 0,
  mfiTokens: [],
  errors: '',
  mfiDetail: {},
  isLoadingAction: false,
};

const mfiTokenReducer = (state = initialState, { type, payload }: any) =>
  produce(state, (draft) => {
    switch (type) {
      case types.GET_MFI_TOKEN_REQUEST:
        draft.isLoading = true;
        break;
      case types.GET_MFI_TOKEN_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_MFI_TOKEN_SUCCESS:
        draft.isLoading = false;
        draft.mfiTokens = payload.results;
        draft.total = payload.count;
        break;

      // CREATE MFI_TOKEN
      case types.CREATE_MFI_TOKEN_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.CREATE_MFI_TOKEN_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.CREATE_MFI_TOKEN_SUCCESS:
        const newData: any = [...state.mfiTokens, payload]
        draft.isLoadingAction = false;
        draft.mfiTokens = newData;
        break;
      // DELETE MFI_TOKEN
      case types.DELETE_MFI_TOKEN_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.DELETE_MFI_TOKEN_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.DELETE_MFI_TOKEN_SUCCESS:
        draft.isLoadingAction = false;
        break;

      // EDIT MFI_TOKEN
      case types.EDIT_MFI_TOKEN_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.EDIT_MFI_TOKEN_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.EDIT_MFI_TOKEN_SUCCESS:
        draft.isLoadingAction = false;
        draft.mfiDetail = payload;
        break;
      // GET_MFI_TOKEN_DETAIL_REQUEST
      case types.GET_MFI_TOKEN_DETAIL_REQUEST:
        draft.isLoading = true;
        break;
      case types.GET_MFI_TOKEN_DETAIL_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_MFI_TOKEN_DETAIL_SUCCESS:
        draft.isLoading = false;
        draft.mfiDetail = payload;
        break;
      default:
        break;
    }
  });

export default mfiTokenReducer;


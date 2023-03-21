/* eslint-disable */
import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  isLoading: true,
  total: 0,
  certificates: [],
  errors: '',
  certificateDetail: {},
  isLoadingAction: false,
  newCertificate: {}
};

const certificateReducer = (state = initialState, { type, payload }: any) =>
  produce(state, (draft) => {
    switch (type) {
      case types.GET_CERTIFICATE_REQUEST:
        draft.isLoading = true;
        break;
      case types.GET_CERTIFICATE_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_CERTIFICATE_SUCCESS:
        draft.isLoading = false;
        draft.certificates = payload.results;
        draft.total = payload.count;
        break;

      // CREATE CERTIFICATE
      case types.CREATE_CERTIFICATE_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.CREATE_CERTIFICATE_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.CREATE_CERTIFICATE_SUCCESS:
        const newData: any = [...state.certificates, payload]
        draft.isLoadingAction = false;
        draft.certificates = newData;
        draft.newCertificate = payload.data;
        break;
      // DELETE CERTIFICATE
      case types.DELETE_CERTIFICATE_REQUEST:
        draft.isLoadingAction = true;
        break;
      case types.DELETE_CERTIFICATE_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.DELETE_CERTIFICATE_SUCCESS:
        draft.isLoadingAction = false;
        break;

      // EDIT CERTIFICATE
      case types.EDIT_CERTIFICATE_REQUEST:
        draft.isLoadingAction = true;
        draft.newCertificate = {};
        break;
      case types.EDIT_CERTIFICATE_FAIL:
        draft.isLoadingAction = false;
        break;
      case types.EDIT_CERTIFICATE_SUCCESS:
        draft.isLoadingAction = false;
        draft.newCertificate = {};
        draft.certificateDetail = payload;
        break;
      // GET_CERTIFICATE_DETAIL_REQUEST
      case types.GET_CERTIFICATE_DETAIL_REQUEST:
        draft.isLoading = true;
        break;
      case types.GET_CERTIFICATE_DETAIL_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_CERTIFICATE_DETAIL_SUCCESS:
        draft.isLoading = false;
        draft.certificateDetail = payload;
        break;
      case types.CLOSE_DIALOG_CERTIFICATE:
        draft.newCertificate = {};
        break;
      default:
        break;
    }
  });

export default certificateReducer;


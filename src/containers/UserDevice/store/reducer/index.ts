import * as types from '../constants';
import produce from 'immer';

export const initialState = {
  isLoading: true,
  total: 0,
  userDevice: [],
  errors: '',
  listDevice: [],
};

const usersReduce = (state = initialState, { type, payload }: any) =>
  produce(state, (draft) => {
    switch (type) {
      case types.GET_USER_DEVICE_REQUEST:
        draft.isLoading = true;
        draft.userDevice = [];
        draft.listDevice = [];
        break;
      case types.GET_USER_DEVICE_FAIL:
        draft.isLoading = false;
        break;
      case types.GET_USER_DEVICE_SUCCESS:
        draft.isLoading = false;
        draft.userDevice = payload.data.result;
        draft.listDevice = payload.data.result.device;
        break;
      default:
        break;
    }
  });

export default usersReduce;

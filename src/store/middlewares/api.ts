
import { refreshTokenRequest } from 'src/containers/Auth/store/actions';
import * as types from 'src/containers/Auth/store/constants';
let previousActions: any = [];

const authenticateMiddleware = (store: any) => (next: any) => (action: any) => {
  const { type: actionType, payload } = action;

  if (actionType.indexOf('_REQUEST') > 0) {
    previousActions.push(action);
  }

  if (actionType.indexOf('_SUCCESS') > 0 || actionType.indexOf('_FAIL') > 0) {
  }

  if (actionType.includes('_FAIL')) {
    const statusCode = payload.status;

    if (statusCode === 401) {
      previousActions.push(action);
      store.dispatch(refreshTokenRequest());
    }
  }

  if (
    actionType === types.REFRESH_TOKEN_SUCCESS &&
    previousActions.length > 0
  ) {
    previousActions.forEach((previousAction: any) => {
      const type = previousAction.type.replace('_FAIL', '_REQUEST');
      const action = previousActions.find((item: any) => item.type === type);

      if (action) store.dispatch(action);
    });
    previousActions = [];
  }
  next(action);
};

export default authenticateMiddleware;


const authenticateMiddleware = store => next => action => {
  const { type: actionType, payload } = action;
  const snackOpts = {
    vertical: 'bottom',
    horizontal: 'right',
    autoHideDuration: 600000,
    isReloadPageButton: true,
  };

  if (actionType.includes('FAIL')) {
    const { error = {} } = payload || {};
    const { response = {}, code = '' } = error;
    const { status = 1 } = response;
    if (status === 401 || +code === 401) {
      const refreshSessionFail = () => {
      };
      const refreshSessionSuccess = () => {
      };
    }

  }
  next(action);
};

export default authenticateMiddleware;

/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';

// import history from '../utils/history';
import globalReducer from '../containers/App/store/reducers';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const appReducer = combineReducers({
    global: globalReducer,
    // router: connectRouter(history),
    ...injectedReducers,
  });

  const rootReducer = (state: any, action: any) => appReducer(state, action)

  return rootReducer;
}

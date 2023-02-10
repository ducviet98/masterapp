import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const authState = (state: any) => state.auth || initialState;

const makeSelectIsLoading = () =>
  createSelector(authState, (state) => state.isLoading);

const makeSelectAuthenticated = () =>
  createSelector(authState, (state) => state.authenticated);

const makeSelectErrors = () =>
  createSelector(authState, (state) => state.errors);

export { makeSelectIsLoading, makeSelectAuthenticated, makeSelectErrors };

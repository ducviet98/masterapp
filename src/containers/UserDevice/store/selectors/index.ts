import { createSelector } from 'reselect';

import { initialState } from '../reducer';

const userDeviceState = (state: any) => state.device || initialState;

const makeSelectIsLoading = () =>
  createSelector(userDeviceState, (state) => state.isLoading);

const makeSelectErrors = () =>
  createSelector(userDeviceState, (state) => state.errors);

const makeSelectTotalUsers = () =>
  createSelector(userDeviceState, (state) => state.total);

const makeSelectUserDevice = () =>
  createSelector(userDeviceState, (state) => state.userDevice);

const makeSelectListDevice = () =>
  createSelector(userDeviceState, (state) => state.listDevice);

export {
  makeSelectIsLoading,
  makeSelectErrors,
  makeSelectTotalUsers,
  makeSelectUserDevice,
  makeSelectListDevice,
};

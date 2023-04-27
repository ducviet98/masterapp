import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const managerRoleState = (state: any) => state.managerRole || initialState;

const makeSelectIsLoadingManagerRole = () =>
  createSelector(managerRoleState, (state) => state.isLoading);

const makeSelectErrorManagerRole = () => createSelector(managerRoleState, (state) => state.error);

const makeSelectTotalManagerRole = () => createSelector(managerRoleState, (state) => state.total);

const makeSelectPermission = () => createSelector(managerRoleState, (state) => state.permissions);

const makeSelectRoles = () => createSelector(managerRoleState, (state) => state.roles);

export {
  makeSelectIsLoadingManagerRole,
  makeSelectErrorManagerRole,
  makeSelectTotalManagerRole,
  makeSelectPermission,
  makeSelectRoles,
};

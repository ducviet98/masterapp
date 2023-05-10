import { createSelector } from 'reselect';

import { initialState } from '../reducers';

const organizationState = (state: any) => state.organization || initialState;

const makeSelectIsLoadingOrganization = () =>
  createSelector(organizationState, (state) => state.isLoading);

const makeSelectErrorOrganization = () => createSelector(organizationState, (state) => state.error);

const makeSelectTotalOrganization = () => createSelector(organizationState, (state) => state.total);

const makeSelectOrganization = () =>
  createSelector(organizationState, (state) => state.organizationData);

const makeSelectOrganizationMember = () =>
  createSelector(organizationState, (state) => state.organizationMember);

const makeSelectRoleOrganizationMember = () =>
  createSelector(organizationState, (state) => state.roleUser);

const makeSelectDetailOrganizationMember = () =>
  createSelector(organizationState, (state) => state.detailOrganization);

export {
  makeSelectIsLoadingOrganization,
  makeSelectErrorOrganization,
  makeSelectTotalOrganization,
  makeSelectOrganization,
  makeSelectOrganizationMember,
  makeSelectRoleOrganizationMember,
  makeSelectDetailOrganizationMember,
};

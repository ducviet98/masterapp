import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';

import reducer from './store/reducers';
import saga from './store/sagas';

import { makeSelectIsLoadingOrganization, makeSelectTotalOrganization } from './store/selectors';

const OrganizationContainer = () => {
  useInjectReducer({ key: 'organization', reducer });
  useInjectSaga({ key: 'organization', saga });

  return <div>Organization</div>;
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectIsLoadingOrganization(),
  total: makeSelectTotalOrganization(),
});

export default connect(mapStateToProps)(OrganizationContainer);

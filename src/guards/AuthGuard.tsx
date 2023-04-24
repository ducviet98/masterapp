import { ReactNode, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'src/utils/injectReducer';
import { useInjectSaga } from 'src/utils/injectSaga';
import cookie from 'src/utils/cookie';
import reducer from 'src/containers/Organization/store/reducers';
import saga from 'src/containers/Organization/store/sagas';
import { getOrganizationRequest } from 'src/containers/Organization/store/actions';
import { makeSelectOrganization } from 'src/containers/Organization/store/selectors';
import { OrganizationType } from 'src/containers/Organization/interface';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
  organization: [OrganizationType];
};

const AuthGuard = ({ children, organization }: AuthGuardProps) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = cookie.checkCookie('token');
  const currentOrganizations = cookie.getCookie('current_organizations');
  useInjectReducer({ key: 'organization', reducer });
  useInjectSaga({ key: 'organization', saga });

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
      dispatch(getOrganizationRequest());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth && !currentOrganizations) {
      navigate('/organization/new');
    }
  }, [currentOrganizations, isAuth, navigate]);

  if (!isAuth) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to="/auth/login" />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
});

export default connect(mapStateToProps)(AuthGuard);

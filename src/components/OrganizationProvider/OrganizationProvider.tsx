import { ReactNode, useEffect } from 'react';

import history from 'src/utils/history';
import CookieHandlerInstance from 'src/utils/cookie';

type Props = {
  children: ReactNode;
};

const OrganizationProvider = ({ children }: Props) => {
  const isAuth = CookieHandlerInstance.checkCookie('token');
  const currentOrganizations = CookieHandlerInstance.getCookie('current_organizations');

  useEffect(() => {

    if (!isAuth) {
      
      setTimeout(() => history.push('/auth/login'), 0);
    } else if (isAuth && !currentOrganizations) {
      setTimeout(() => history.push('/organization/new'), 0);
    }
  }, [isAuth, currentOrganizations]);

  return <>{children}</>;
};

export default OrganizationProvider;

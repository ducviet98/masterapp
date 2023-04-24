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
      return history.push('/auth/login');
    } else if (isAuth && !currentOrganizations) {
      return history.push('/organization/new');
    }
  }, [isAuth, currentOrganizations]);

  return <>{children}</>;
};

export default OrganizationProvider;

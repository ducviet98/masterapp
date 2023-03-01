import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import cookie from 'src/utils/cookie';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {

  if (cookie.checkCookie('token')) {
    return <Navigate to={'/'} />;
  }

  return <>{children}</>;
}

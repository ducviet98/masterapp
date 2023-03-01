import { ReactNode, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import cookie from 'src/utils/cookie';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { pathname } = useLocation();
  console.log('pathname', pathname);


  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!cookie.checkCookie('token')) {
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
}

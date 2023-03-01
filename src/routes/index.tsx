import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';
import GuestGuard from 'src/guards/GuestGuard';
import AuthGuard from 'src/guards/AuthGuard';
import cookie from 'src/utils/cookie';
import { path } from 'src/constants/path'
// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isAuthenticated = cookie.checkCookie('token');

  const isDashboard = pathname.includes('/') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: path.login,
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: path.register,
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        }
      ],
    },
    {
      path: path.home,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={path.app} replace />, index: true },
        { path: path.app, element: <Dashboard /> },
        { path: path.device, element: <Devices /> },
        { path: path.newDevice, element: <NewDevices /> },
        { path: path.editDevice, element: <EditDevices /> },

      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Authentication

const Login = Loadable(lazy(() => import('src/containers/Auth/login')));
const Register = Loadable(lazy(() => import('src/containers/Auth/register')));

// Dashboard
const Dashboard = Loadable(lazy(() => import('src/containers/Dashboard')));
const Devices = Loadable(lazy(() => import('src/containers/Devices')));
const NewDevices = Loadable(lazy(() => import('src/containers/Devices/view/newDevice')));
const EditDevices = Loadable(lazy(() => import('src/containers/Devices/view/editDevice')));

const NotFound = Loadable(lazy(() => import('../pages/Page404')));

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
import { path } from 'src/constants/path';
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
    // Authenticate
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
        },
      ],
    },
    {
      path: path.createOrganization,
      element: <CreateOrganization />,
    },
    // Dashboard
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
        { path: path.certificates, element: <Certificates /> },
        { path: path.newCertificate, element: <NewCertificates /> },
        { path: path.editCertificate, element: <EditCertificates /> },

        { path: path.mfiToken, element: <MfiToken /> },
        { path: path.newMfiToken, element: <NewMfiToken /> },
        { path: path.editMfiToken, element: <EditMfiToken /> },

        { path: path.mfiApi, element: <MfiApi /> },
        { path: path.newMfiApi, element: <NewMfiApi /> },
        { path: path.editMfiApi, element: <EditMfiApi /> },

        { path: path.brand, element: <Brand /> },
        { path: path.newBrand, element: <NewBrand /> },
        { path: path.editBrand, element: <EditBrand /> },

        { path: path.accessoryInfo, element: <AccessoryInfo /> },
        { path: path.newAccessoryInfo, element: <NewAccessoryInfo /> },
      ],
    },
    // page Error
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
const Dashboard = Loadable(lazy(() => import('src/containers/Dashboard/GeneralApp')));
const Certificates = Loadable(lazy(() => import('src/pages/Certificates')));
const NewCertificates = Loadable(
  lazy(() => import('src/containers/Certificates/view/NewCertificate'))
);
const EditCertificates = Loadable(
  lazy(() => import('src/containers/Certificates/view/EditCertificate'))
);

const Devices = Loadable(lazy(() => import('src/pages/Devices')));
const NewDevices = Loadable(lazy(() => import('src/containers/Devices/view/newDevice')));
const EditDevices = Loadable(lazy(() => import('src/containers/Devices/view/editDevice')));

const MfiToken = Loadable(lazy(() => import('src/containers/MfiToken')));
const NewMfiToken = Loadable(lazy(() => import('src/containers/MfiToken/view/NewCertificate')));
const EditMfiToken = Loadable(lazy(() => import('src/containers/MfiToken/view/EditCertificate')));

const MfiApi = Loadable(lazy(() => import('src/containers/MfiApi')));
const NewMfiApi = Loadable(lazy(() => import('src/containers/MfiApi/view/NewMfiApi')));
const EditMfiApi = Loadable(lazy(() => import('src/containers/MfiApi/view/EditMfiApi')));

const Brand = Loadable(lazy(() => import('src/containers/Brand')));
const NewBrand = Loadable(lazy(() => import('src/containers/Brand/view/NewBrand')));
const EditBrand = Loadable(lazy(() => import('src/containers/Brand/view/EditBrand')));

const AccessoryInfo = Loadable(lazy(() => import('src/containers/AccessoryInfo')));
const NewAccessoryInfo = Loadable(
  lazy(() => import('src/containers/AccessoryInfo/view/NewAccessoryInfo'))
);

const NotFound = Loadable(lazy(() => import('src/pages/Page404')));

const CreateOrganization = Loadable(
  lazy(() => import('src/containers/Organization/views/CreateOrganization'))
);

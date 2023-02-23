import { path } from 'src/constants/path';
import NewDevice from 'src/containers/UserDevice/view/newDevice';
import UserDevice from 'src/pages/UserDevicePage';
import { AuthenticatedRoute } from '../components/routes';

const userDeviceRoute = [
  {
    path: path.userDevice,
    title: 'User Device',
    component: UserDevice,
    route: AuthenticatedRoute,
    roles: [],
    permission: [],
    exact: true,
  },
  {
    path: path.newDevice,
    title: 'New Device',
    component: NewDevice,
    route: AuthenticatedRoute,
    roles: [],
    permission: [],
    exact: true,
  },
];

export default userDeviceRoute;

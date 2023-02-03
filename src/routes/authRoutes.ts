import { AuthLayout } from 'src/layouts';
import { LoginPage } from '../pages';

const authRoute = [
  {
    path: '/login',
    title: 'Login',
    route: LoginPage,
    layout: AuthLayout,
    roles: [],
    permission: [],
    exact: true,
  },
];


export default authRoute;
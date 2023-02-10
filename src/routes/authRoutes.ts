import { AuthLayout } from 'src/layouts';
import { LoginPage, RegisterPage } from '../pages';

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
  {
    path: '/register',
    title: 'Register',
    route: RegisterPage,
    layout: AuthLayout,
    roles: [],
    permission: [],
    exact: true,
  },
];

export default authRoute;

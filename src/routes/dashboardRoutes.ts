import { AuthenticatedRoute } from '../components/routes';
import { DashboardPage } from '../pages';

const homeRoute = [
  {
    path: '/',
    title: 'Dashboard',
    component: DashboardPage,
    route: AuthenticatedRoute,
    roles: [],
    permission: [],
    exact: true,
  },
];


export default homeRoute;
import { Fragment } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import dashboardRoutes from './dashboardRoutes';
import authRoute from './authRoutes';
import { MainLayout } from '../layouts';

const routes = [
  ...dashboardRoutes,
  ...authRoute,
];

const RenderRouter = ({
  route: Component,
  layout: Layout = Fragment,
  breadcrumb,
  title,
  ...rest
}: any) => (
  <Fragment>
    <Layout breadcrumb={breadcrumb} title={title}>
      <Component {...rest} />
    </Layout>
  </Fragment>
);

const Router = (
  <BrowserRouter>
    <Switch>
      {routes.map((routeItem: any, index: number) => {
        return (
          <RenderRouter
            route={routeItem.route}
            key={index}
            path={routeItem.path}
            component={routeItem.component}
            layout={routeItem.layout || MainLayout}
            roles={routeItem.roles}
            permission={routeItem.permission}
            breadcrumb={routeItem.breadcrumb}
            title={routeItem.title}
            exact={routeItem.exact}
            tabs={routeItem.tabs ? routeItem.tabs : []}
          />
        );
      })}
    </Switch>
  </BrowserRouter>
);

export default Router;

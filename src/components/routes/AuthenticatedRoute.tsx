import { Route, Redirect } from 'react-router-dom';

import cookie from '../../utils/cookie';

const AuthenticatedRoute = ({
  component: Component,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={(props) => {
      if (!cookie.checkCookie('token')) {
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }
      return <Component {...props} {...rest} />;
    }}
  />
);
export default AuthenticatedRoute;

import { Route, Redirect } from 'react-router-dom';

import cookie from '../../utils/cookie';

const AuthenticateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) => {
      if (cookie.checkCookie('token')) {
        return <Component {...props} {...rest} />;
      }
      return (
        <Redirect
          to={{ pathname: '/', state: { from: props.location } }}
        />
      );
    }}
  />
);
export default AuthenticateRoute;

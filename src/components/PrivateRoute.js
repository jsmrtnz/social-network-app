import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../state/auth-context';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}
const PrivateRoute = ({ component, isAuth, key, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {({ loggedIn }) => (
        <Route {...rest} render={routeProps => {
          return loggedIn ? (
            renderMergedProps(component, routeProps, key, rest)
          ) : (
            <Redirect to={{
              pathname: "/login",
              state: { from: routeProps.location }
            }}/>
          );
        }}/>
      )}
    </AuthContext.Consumer>
  );
};

export default PrivateRoute;
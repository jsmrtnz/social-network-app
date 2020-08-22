import React from 'react';
import { 
  Route,
  Redirect
} from 'react-router-dom';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}
const PrivateRoute = ({ component, isAuth, key, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return isAuth ? (
        renderMergedProps(component, routeProps, key, rest)
      ) : (
        <Redirect to={{
          pathname: "/login",
          state: { from: routeProps.location }
        }}/>
      );
    }}/>
  );
};
/* function PrivateRoute({ isAuth, children, ...rest}){
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? ( children ) : (
          <Redirect to={{ 
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
} */

export default PrivateRoute;
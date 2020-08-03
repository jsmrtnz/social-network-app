import React from 'react';
import { 
  Route,
  Redirect
} from 'react-router-dom';

function PrivateRoute({ isAuth, children, ...rest}){
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
}

export default PrivateRoute;
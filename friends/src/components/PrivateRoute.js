import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isAutheticated = () => {
  return localStorage.getItem('token') ? true : false;
}

const PrivateRoute = ({ children, ...rest }) => {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={({ location }) => 
    isAutheticated() ? (
      children
    ) : (
      <Redirect
      to={{
        pathname: 'login',
        state: { from: location }
      }}
      />
    )}
    />
  );
};

export default PrivateRoute;
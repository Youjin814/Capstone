import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

interface AuthenticationProps extends Omit<RouteProps, 'element'> {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const Authentication: React.FC<AuthenticationProps> = ({
  isAuthenticated,
  children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={!isAuthenticated ? <Navigate to="/login" replace /> : children}
    />
  );
};

export default Authentication;




import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRoute = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRoute) => {
  const auth = localStorage.getItem('user');

  return auth ? children : <Navigate to={'/'} />;
};

export default PrivateRoute;

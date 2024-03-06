import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, fallback }) => {
  const auth = localStorage.getItem('user');

  return auth ? children : <Navigate to={'/'} />;
};

export default PrivateRoute;

import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoutes = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Profile must be used within an AuthProvider');
  }

  const { isUserLoggedIn } = authContext;

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

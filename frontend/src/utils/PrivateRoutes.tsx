import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoutes = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Profile must be used within an AuthProvider');
  }

  const { isUserLoggedIn, isUserPremiumMember } = authContext;

  return isUserLoggedIn && isUserPremiumMember ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoutes;

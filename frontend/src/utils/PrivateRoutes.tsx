import { Outlet, Navigate } from 'react-router-dom';
import { UseAuth } from '../hooks/context/useAuth';

const PrivateRoutes = () => {
  const { isUserLoggedIn, isUserPremiumMember } = UseAuth();

  return isUserLoggedIn && isUserPremiumMember ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoutes;

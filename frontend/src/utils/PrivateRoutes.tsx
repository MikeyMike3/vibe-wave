import { Outlet, Navigate } from 'react-router-dom';
import { UseAuthContext } from '../hooks/context/useAuthContext';

const PrivateRoutes = () => {
  const { isUserLoggedIn, isUserPremiumMember } = UseAuthContext();

  return isUserLoggedIn && isUserPremiumMember ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoutes;

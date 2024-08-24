import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const UseAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Profile must be used within an AuthProvider');
  }

  return authContext;
};

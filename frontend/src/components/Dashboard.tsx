import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

type DashboardProps = {
  code: string;
};

export const Dashboard = ({ code }: DashboardProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('Profile must be used within an AuthProvider');
  }
  const { login, accessToken, isUserLoggedIn } = authContext;

  if (!isUserLoggedIn) {
    login(code);
  }

  return <div>{accessToken}</div>;
};

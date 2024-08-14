import { UseAuth } from '../hooks/UseAuth';

type DashboardProps = {
  code: string;
};

export const Dashboard = ({ code }: DashboardProps) => {
  const accessToken = UseAuth(code);
  return <div>{accessToken}</div>;
};

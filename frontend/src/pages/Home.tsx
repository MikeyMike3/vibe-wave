import { Dashboard } from '../components/Dashboard';
import { Login } from '../components/Login';

const code = new URLSearchParams(window.location.search).get('code');

export const Home = () => {
  return <div>{code ? <Dashboard code={code} /> : <Login />}</div>;
};

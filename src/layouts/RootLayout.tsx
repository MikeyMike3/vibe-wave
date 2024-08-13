import { PCNav } from '../components/nav/PCNav';
import { MobileNav } from '../components/nav/MobileNav';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <>
      <PCNav />
      <MobileNav />
      <Outlet />
    </>
  );
};

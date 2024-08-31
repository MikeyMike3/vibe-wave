import { PCNav } from '../components/nav/PCNav';
import { MobileNav } from '../components/nav/MobileNav';
import { Outlet } from 'react-router-dom';
import { SpotifyPlayer } from '../components/spotifyPlayer/SpotifyPlayer';

export const RootLayout = () => {
  return (
    <>
      <PCNav />
      <MobileNav />
      <Outlet />
      <SpotifyPlayer />
    </>
  );
};

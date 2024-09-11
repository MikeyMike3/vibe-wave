import { PCNav } from '../components/nav/PCNav';
import { MobileNav } from '../components/nav/MobileNav';
import { Outlet } from 'react-router-dom';
import { SpotifyPlayer } from '../components/spotifyPlayer/SpotifyPlayer';

export const RootLayout = () => {
  return (
    <>
      <div className="grid h-screen grid-cols-[300px_1fr] overflow-y-scroll">
        <div>
          <PCNav />
          <MobileNav />
        </div>
        <div>
          <p className="text-white">Search</p>
          <Outlet />
        </div>
      </div>

      <SpotifyPlayer />
    </>
  );
};

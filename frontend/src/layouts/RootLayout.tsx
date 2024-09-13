import { PCNav } from '../components/nav/PCNav';
import { MobileNav } from '../components/nav/MobileNav';
import { Outlet } from 'react-router-dom';
import { SpotifyPlayer } from '../components/spotifyPlayer/SpotifyPlayer';
import { Search } from '../pages/Search';

export const RootLayout = () => {
  return (
    <>
      <div className="fixed top-0 grid h-screen w-full grid-cols-[300px_1fr]">
        <div className="bg-black">
          <PCNav />
          <MobileNav />
        </div>
        <div className="overflow-y-scroll pb-32">
          <Search />
          <div className="pt-7">
            <Outlet />
          </div>
        </div>
      </div>

      <SpotifyPlayer />
    </>
  );
};

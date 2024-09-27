import { PCNav } from '../components/nav/PCNav';
import { MobileNav } from '../components/nav/MobileNav';
import { Outlet } from 'react-router-dom';
import { SpotifyPlayer } from '../components/spotifyPlayer/SpotifyPlayer';
import { SearchBar } from '../components/SearchBar';

export const RootLayout = () => {
  return (
    <>
      <div className="fixed top-0 grid h-screen w-full grid-cols-[300px_1fr]">
        <div className="bg-black">
          <PCNav />
          <MobileNav />
        </div>
        <div className="flex flex-col">
          <SearchBar />
          {/* the height is very magic numbery */}
          <div className="overflow-y-auto p-2" style={{ height: 'calc(100vh - 189px)' }}>
            <Outlet />
          </div>
          <SpotifyPlayer />
        </div>
      </div>
    </>
  );
};

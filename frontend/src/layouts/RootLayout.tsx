import { PCNav } from '../components/nav/PCNav';
import { MobileNav } from '../components/nav/MobileNav';
import { Outlet } from 'react-router-dom';
import { togglePlay } from '../apis/spotifyPlayer/togglePlay';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';

export const RootLayout = () => {
  const { player } = useSpotifyPlayerContext();

  return (
    <>
      <PCNav />
      <MobileNav />
      <Outlet />
      <div>
        <button onClick={() => togglePlay(player)}>Play Pause</button>
      </div>
    </>
  );
};

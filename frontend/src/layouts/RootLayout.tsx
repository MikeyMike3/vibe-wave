import { PCNav } from '../components/nav/PCNav';
import { MobileNav } from '../components/nav/MobileNav';
import { Outlet } from 'react-router-dom';
import { SpotifyPlayer } from '../components/spotifyPlayer/SpotifyPlayer';
import { SearchBar } from '../components/SearchBar';
import { getCurrentlyPlayingTrackSessionStorage } from '../functions/sessionStorage/playback/currentlyPlayingTrack/getCurrentlyPlayingTrackSessionStorage';
import { usePlaySong } from '../hooks/spotifyPlayer/usePlaySong';
import { useState, useEffect } from 'react';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';
import { getPlayerPositionSessionStorage } from '../functions/sessionStorage/playback/playerPosition/getPlayerPositionSessionStorage';

export const RootLayout = () => {
  const playSongMutation = usePlaySong();
  const { isPlayerReady } = useSpotifyPlayerContext();

  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Detect page refresh
    const navigationEntries = performance.getEntriesByType(
      'navigation',
    ) as PerformanceNavigationTiming[];
    const isRefresh = navigationEntries.length > 0 && navigationEntries[0].type === 'reload';

    if (isRefresh && getCurrentlyPlayingTrackSessionStorage()) {
      setShowOverlay(true);
    }
  }, []);
  return (
    <>
      <div className="fixed top-0 grid h-screen w-full grid-cols-[300px_1fr] gap-2">
        <div className="bg-black">
          <PCNav />
          <MobileNav />
        </div>
        <div className="flex flex-col">
          <SearchBar />
          <div
            className="overflow-y-auto rounded-3xl border-2 border-bgAccent"
            style={{ height: 'calc(100vh - 185px)' }}
          >
            <Outlet />
          </div>
          <SpotifyPlayer />
        </div>
      </div>

      {showOverlay && isPlayerReady && getCurrentlyPlayingTrackSessionStorage() && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg border-2 border-magenta bg-black p-6 text-center shadow-lg">
            <h2 className="text-xl font-bold text-aqua">Looks like you refreshed the page!</h2>
            <p className="mt-2 text-base text-textPrimary">Click this button to resume playback.</p>
            <button
              className="mt-2 rounded-xl border-[1px] border-textPrimary px-4 py-1 text-base text-textPrimary duration-200 hover:border-aqua hover:text-aqua"
              onClick={() => {
                playSongMutation({
                  uri: getCurrentlyPlayingTrackSessionStorage(),
                  options: { seekTo: getPlayerPositionSessionStorage() },
                });
                setShowOverlay(false);
              }}
            >
              Click Me!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

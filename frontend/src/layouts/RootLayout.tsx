import { PCNav } from '../components/nav/PCNav';
import { Outlet } from 'react-router-dom';
import { SpotifyPlayer } from '../components/spotifyPlayer/SpotifyPlayer';
import { SearchBar } from '../components/SearchBar';
import { getCurrentlyPlayingTrackSessionStorage } from '../functions/sessionStorage/playback/currentlyPlayingTrack/getCurrentlyPlayingTrackSessionStorage';
import { usePlaySong } from '../hooks/spotifyPlayer/usePlaySong';
import { useState, useEffect } from 'react';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';
import { getPlayerPositionSessionStorage } from '../functions/sessionStorage/playback/playerPosition/getPlayerPositionSessionStorage';
import { useMainDisplayRefContext } from '../hooks/context/useMainDisplayRefContext';

export const RootLayout = () => {
  const playSongMutation = usePlaySong();
  const { isPlayerReady } = useSpotifyPlayerContext();

  const { mainDisplayRef } = useMainDisplayRefContext();

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
  const [height, setHeight] = useState(
    typeof window !== 'undefined' && window.innerWidth < 1024
      ? 'calc(100dvh - 290px)'
      : 'calc(100dvh - 195px)',
  );

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth < 1024 ? 'calc(100dvh - 275px)' : 'calc(100dvh - 185px)');
    };

    // Listen for window resize events
    window.addEventListener('resize', updateHeight);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  return (
    <>
      <div className="fixed top-0 grid h-screen w-full lg:grid-cols-[225px_1fr] lg:gap-2">
        <div className="bg-black">
          <PCNav />
        </div>
        <div className="flex w-full flex-col">
          <SearchBar />

          <div
            className="overflow-y-auto rounded-3xl border-2 border-bgAccent"
            ref={mainDisplayRef}
            style={{
              height,
            }}
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

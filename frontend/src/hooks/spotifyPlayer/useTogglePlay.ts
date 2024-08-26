import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';

export const useTogglePlay = () => {
  const { player, isPausedRef } = useSpotifyPlayerContext();
  const togglePlay = () => {
    if (player) {
      isPausedRef.current = false;
      player.togglePlay();
    }
  };
  return togglePlay;
};

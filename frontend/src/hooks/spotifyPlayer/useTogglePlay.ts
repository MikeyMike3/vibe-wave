import { usePlaybackContext } from '../context/usePlaybackContext';
import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';

export const useTogglePlay = () => {
  const { player } = useSpotifyPlayerContext();
  const { isPausedRef } = usePlaybackContext();
  const togglePlay = () => {
    if (player) {
      isPausedRef.current = false;
      player.togglePlay();
    }
  };
  return togglePlay;
};

import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';

export const useTogglePlay = () => {
  const { player } = useSpotifyPlayerContext();
  const togglePlay = () => {
    if (player) {
      player.togglePlay();
    }
  };
  return togglePlay;
};

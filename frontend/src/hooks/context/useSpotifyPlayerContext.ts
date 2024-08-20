import { useContext } from 'react';
import { SpotifyPlayerContext } from '../../context/SpotifyPlayerContext';

export const useSpotifyPlayerContext = () => {
  const spotifyPlayerContext = useContext(SpotifyPlayerContext);

  if (!spotifyPlayerContext) {
    throw new Error('Profile must be used within an SpotifyPlayerProvider');
  }

  return spotifyPlayerContext;
};

import { useContext } from 'react';
import { PlaybackContext } from '../../context/PlaybackContext';

export const usePlaybackContext = () => {
  const playbackContext = useContext(PlaybackContext);

  if (!playbackContext) {
    throw new Error('Profile must be used within an PlaybackProvider');
  }
  return playbackContext;
};

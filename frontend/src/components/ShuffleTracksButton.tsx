import { useState } from 'react';
import { usePlaybackContext } from '../hooks/context/usePlaybackContext';

export const ShuffleTracksButton = () => {
  const { shuffleTracksRef } = usePlaybackContext();
  const [shuffleTracks, setShuffleTracks] = useState(false);

  const handleClick = () => {
    shuffleTracksRef.current = !shuffleTracksRef.current;
    setShuffleTracks(shuffle => !shuffle);
  };

  return <button onClick={handleClick}>Shuffle</button>;
};

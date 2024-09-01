import { usePlaybackContext } from '../hooks/context/usePlaybackContext';
import { useShuffleTracks } from '../hooks/spotifyPlayer/useShuffleTracks';

export const ShuffleTracksButton = () => {
  const { shuffleTracksState } = usePlaybackContext();
  const shuffleTracks = useShuffleTracks();

  return (
    <>
      {shuffleTracksState ? (
        <button onClick={shuffleTracks}>Shuffled</button>
      ) : (
        <button onClick={shuffleTracks}>Shuffle</button>
      )}
    </>
  );
};

import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useShuffleTracks } from '../../hooks/spotifyPlayer/useShuffleTracks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';

export const ShuffleTracksButton = () => {
  const { shuffleTracksState } = usePlaybackContext();
  const shuffleTracks = useShuffleTracks();

  return (
    <>
      {shuffleTracksState ? (
        <button
          className="text-aqua duration-150"
          onClick={() => shuffleTracks({ shouldChangeState: true })}
        >
          <FontAwesomeIcon className="text-2xl" icon={faShuffle} />
        </button>
      ) : (
        <button
          className="text-textAccent duration-150 hover:text-textPrimary"
          onClick={() => shuffleTracks({ shouldChangeState: true })}
        >
          <FontAwesomeIcon className="text-2xl" icon={faShuffle} />
        </button>
      )}
    </>
  );
};

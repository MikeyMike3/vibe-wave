import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useShuffleTracks } from '../../hooks/spotifyPlayer/useShuffleTracks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

export const ShuffleTracksButton = () => {
  const { shuffleTracksState } = usePlaybackContext();
  const shuffleTracks = useShuffleTracks();

  return (
    <>
      {shuffleTracksState ? (
        <button className="text-aqua" onClick={() => shuffleTracks({ shouldChangeState: true })}>
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

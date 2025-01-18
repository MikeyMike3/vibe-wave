import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useShuffleTracks } from '../../hooks/spotifyPlayer/useShuffleTracks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

type buttonColorProps = {
  buttonColor?: string;
};

export const ShuffleTracksButton = ({ buttonColor }: buttonColorProps) => {
  const { shuffleTracksState } = usePlaybackContext();
  const shuffleTracks = useShuffleTracks();

  return (
    <>
      {shuffleTracksState ? (
        <button
          className="text-aqua"
          style={{ color: buttonColor || '#00ffff' }}
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

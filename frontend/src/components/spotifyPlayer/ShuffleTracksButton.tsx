import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useShuffleTracks } from '../../hooks/spotifyPlayer/useShuffleTracks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

type buttonColorProps = {
  activeButtonColor?: string;
  notActiveButtonColor?: string;
};

export const ShuffleTracksButton = ({
  activeButtonColor,
  notActiveButtonColor,
}: buttonColorProps) => {
  const { shuffleTracksState } = usePlaybackContext();
  const shuffleTracks = useShuffleTracks();

  return (
    <>
      {shuffleTracksState ? (
        <button
          style={{ color: activeButtonColor || '#00ffff' }}
          onClick={() => shuffleTracks({ shouldChangeState: true })}
        >
          <FontAwesomeIcon className="text-2xl" icon={faShuffle} />
        </button>
      ) : (
        <button
          className="duration-150"
          onClick={() => shuffleTracks({ shouldChangeState: true })}
          style={{ color: notActiveButtonColor || 'rgb(168 168 168)' }}
        >
          <FontAwesomeIcon className="text-2xl" icon={faShuffle} />
        </button>
      )}
    </>
  );
};

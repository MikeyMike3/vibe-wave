import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import { usePreviousTrack } from '../../hooks/spotifyPlayer/usePreviousTrack';

export const PreviousTrackButton = () => {
  const previousTrack = usePreviousTrack();

  return (
    <button className="text-textAccent duration-150 hover:text-textPrimary" onClick={previousTrack}>
      <FontAwesomeIcon className="text-2xl" icon={faBackwardStep} />
    </button>
  );
};

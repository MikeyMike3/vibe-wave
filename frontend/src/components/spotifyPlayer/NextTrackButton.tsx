import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { useNextTrack } from '../../hooks/spotifyPlayer/useNextTrack';

export const NextTrackButton = () => {
  const nextTrack = useNextTrack();
  return (
    <button className="text-textAccent duration-150 hover:text-textPrimary" onClick={nextTrack}>
      <FontAwesomeIcon className="text-2xl" icon={faForwardStep} />
    </button>
  );
};

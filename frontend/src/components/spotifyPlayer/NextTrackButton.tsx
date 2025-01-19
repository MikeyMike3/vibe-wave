import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { useNextTrack } from '../../hooks/spotifyPlayer/useNextTrack';
import { useDynamicImageBgColorContext } from '../../hooks/context/useDynamicImageBgColorContext';

export const NextTrackButton = () => {
  const nextTrack = useNextTrack();
  const { dynamicImageBgColorMuted } = useDynamicImageBgColorContext();
  return (
    <button className="duration-150" onClick={nextTrack}>
      <FontAwesomeIcon
        className="text-2xl"
        icon={faForwardStep}
        style={{ color: dynamicImageBgColorMuted }}
      />
    </button>
  );
};

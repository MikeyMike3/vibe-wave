import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { usePreviousTrack } from '../../hooks/spotifyPlayer/usePreviousTrack';
import { useDynamicImageBgColorContext } from '../../hooks/context/useDynamicImageBgColorContext';

export const PreviousTrackButton = () => {
  const previousTrack = usePreviousTrack();
  const { dynamicImageBgColorMuted } = useDynamicImageBgColorContext();

  return (
    <button className="text-textAccent duration-150 hover:text-textPrimary" onClick={previousTrack}>
      <FontAwesomeIcon
        className="text-2xl"
        icon={faBackwardStep}
        style={{ color: dynamicImageBgColorMuted }}
      />
    </button>
  );
};

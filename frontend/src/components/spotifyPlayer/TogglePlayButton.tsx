import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { useTogglePlay } from '../../hooks/spotifyPlayer/useTogglePlay';
import { useDynamicImageBgColorContext } from '../../hooks/context/useDynamicImageBgColorContext';

export const TogglePlayButton = () => {
  const togglePlay = useTogglePlay();
  const { dynamicImageBgColorLighter } = useDynamicImageBgColorContext();
  return (
    <button className="duration-200 hover:scale-105" onClick={togglePlay}>
      <FontAwesomeIcon
        className="text-4xl"
        icon={faCirclePlay}
        style={{ color: dynamicImageBgColorLighter }}
      />
    </button>
  );
};

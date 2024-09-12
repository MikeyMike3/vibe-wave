import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePause } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { useTogglePlay } from '../../hooks/spotifyPlayer/useTogglePlay';

export const TogglePauseButton = () => {
  const togglePlay = useTogglePlay();
  return (
    <button className="duration-200 hover:scale-105" onClick={togglePlay}>
      <FontAwesomeIcon className="text-4xl text-aqua" icon={faCirclePause} />
    </button>
  );
};

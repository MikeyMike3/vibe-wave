import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useTogglePlay } from '../../hooks/spotifyPlayer/useTogglePlay';

export const TogglePlayButton = () => {
  const togglePlay = useTogglePlay();
  return (
    <button className="duration-200 hover:scale-105" onClick={togglePlay}>
      <FontAwesomeIcon className="text-4xl" icon={faCirclePlay} color="aqua" />
    </button>
  );
};

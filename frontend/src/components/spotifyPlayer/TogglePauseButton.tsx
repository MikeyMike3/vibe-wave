import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePause } from '@fortawesome/free-solid-svg-icons';
import { useTogglePlay } from '../../hooks/spotifyPlayer/useTogglePlay';

export const TogglePauseButton = () => {
  const togglePlay = useTogglePlay();
  return (
    <button onClick={togglePlay}>
      <FontAwesomeIcon icon={faCirclePause} color="aqua" size="3x" />
    </button>
  );
};

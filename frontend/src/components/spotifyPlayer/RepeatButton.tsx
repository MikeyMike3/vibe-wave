import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import { faRepeat1 } from '@fortawesome/pro-solid-svg-icons';

import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';

export const RepeatButton = () => {
  const { repeat, setRepeat, repeatRef } = usePlaybackContext();

  const handleClick = () => {
    setRepeat(repeat => repeat + 1);
    repeatRef.current++;

    if (repeatRef.current === 3) {
      setRepeat(0);
      repeatRef.current = 0;
    }
  };

  return (
    <>
      {repeat === 0 && (
        <button className="text-textAccent hover:text-textPrimary" onClick={handleClick}>
          <FontAwesomeIcon className="text-2xl" icon={faRepeat} />
        </button>
      )}
      {repeat === 1 && (
        <button className="text-aqua" onClick={handleClick}>
          <FontAwesomeIcon className="text-2xl" icon={faRepeat} />
        </button>
      )}
      {repeat === 2 && (
        <button className="text-aqua" onClick={handleClick}>
          <FontAwesomeIcon className="text-2xl" icon={faRepeat1} />
        </button>
      )}
    </>
  );
};

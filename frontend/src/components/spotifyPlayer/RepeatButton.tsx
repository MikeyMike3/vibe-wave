import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faRepeat1 } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useDynamicImageBgColorContext } from '../../hooks/context/useDynamicImageBgColorContext';

export const RepeatButton = () => {
  const { repeat, setRepeat, repeatRef } = usePlaybackContext();
  const { dynamicImageBgColorLighter, dynamicImageBgColorMuted } = useDynamicImageBgColorContext();

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
        <button
          className="text-textAccent duration-150 hover:text-textPrimary"
          onClick={handleClick}
        >
          <FontAwesomeIcon
            className="text-2xl"
            icon={faRepeat}
            style={{ color: dynamicImageBgColorMuted }}
          />
        </button>
      )}
      {repeat === 1 && (
        <button onClick={handleClick}>
          <FontAwesomeIcon
            className="text-2xl"
            style={{ color: dynamicImageBgColorLighter }}
            icon={faRepeat}
          />
        </button>
      )}
      {repeat === 2 && (
        <button onClick={handleClick}>
          <FontAwesomeIcon
            className="text-2xl"
            style={{ color: dynamicImageBgColorLighter }}
            icon={faRepeat1}
          />
        </button>
      )}
    </>
  );
};

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

  return <button onClick={handleClick}>{repeat}</button>;
};

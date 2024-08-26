import { usePlaybackContext } from '../hooks/context/usePlaybackContext';

export const RepeatButton = () => {
  const { repeat, setRepeat, repeatRef } = usePlaybackContext();

  const handleClick = () => {
    setRepeat(repeat => repeat + 1);
    repeatRef.current++;
  };

  return <button onClick={handleClick}>{repeat}</button>;
};

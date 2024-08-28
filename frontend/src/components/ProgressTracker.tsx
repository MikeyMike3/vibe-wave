import { useEffect, useState } from 'react';
import { usePlaybackContext } from '../hooks/context/usePlaybackContext';

export const ProgressTracker = () => {
  const { playerDuration, playerPosition } = usePlaybackContext();
  const [displayPosition, setDisplayPosition] = useState<string | number>(0);
  const [displayDuration, setDisplayDuration] = useState<string | number>(0);

  const formatTime = (timeInMs: string | number) => {
    const timeInMsNumber = Number(timeInMs);
    const minutes = Math.floor(timeInMsNumber / 60000);
    const seconds = Math.floor((timeInMsNumber % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    setDisplayPosition(formatTime(playerPosition));
  }, [playerPosition]);

  useEffect(() => {
    setDisplayDuration(formatTime(playerDuration));
  }, [playerDuration]);

  return (
    <div className="flex gap-3">
      {displayPosition}
      <input type="range" min="0" max={playerDuration} value={playerPosition} />
      {displayDuration}
    </div>
  );
};

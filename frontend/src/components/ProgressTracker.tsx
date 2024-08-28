import { useEffect, useState } from 'react';
import { usePlaybackContext } from '../hooks/context/usePlaybackContext';
import { formatTime } from '../functions/formatTime';

export const ProgressTracker = () => {
  const { playerDuration, playerPosition } = usePlaybackContext();
  const [displayPosition, setDisplayPosition] = useState<string | number>(0);
  const [displayDuration, setDisplayDuration] = useState<string | number>(0);

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

import { useEffect, useRef, useState } from 'react';
import { usePlaybackContext } from '../hooks/context/usePlaybackContext';
import { formatTime } from '../functions/formatTime';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';

export const ProgressTracker = () => {
  const { player } = useSpotifyPlayerContext();
  const { playerDuration, playerPosition, setPlayerPosition } = usePlaybackContext();
  const [displayPosition, setDisplayPosition] = useState<string | number>(0);
  const [tempDisplayPosition, setTempDisplayPosition] = useState<string | number>();
  const [displayDuration, setDisplayDuration] = useState<string | number>(0);
  const [seekPosition, setSeekPosition] = useState<number>(0);
  const currentlySeekingRef = useRef<boolean>(false);

  useEffect(() => {
    setDisplayPosition(formatTime(playerPosition));
  }, [playerPosition]);

  useEffect(() => {
    setDisplayDuration(formatTime(playerDuration));
  }, [playerDuration]);

  //prettier-ignore
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentlySeekingRef.current = true;
    const value = e.target.value;
    setPlayerPosition(value)
    setTempDisplayPosition(formatTime(value))
    setSeekPosition(Number(value))
  };
  //prettier-ignore
  const handleMouseUp = () => {
    currentlySeekingRef.current = false;
    player?.seek(seekPosition)
  }

  return (
    <div className="flex w-[500px] gap-3">
      {currentlySeekingRef.current ? tempDisplayPosition : displayPosition}
      <input
        className="w-full"
        type="range"
        min="0"
        max={playerDuration}
        value={playerPosition}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
      {displayDuration}
    </div>
  );
};

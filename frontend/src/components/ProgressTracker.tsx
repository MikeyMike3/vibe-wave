import { useCallback, useEffect, useRef, useState } from 'react';
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

  const [sliderValue, setSliderValue] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  const updateSliderBackground = useCallback(
    (value: number | string) => {
      const percentage = (Number(value) / Number(playerDuration)) * 100;
      if (sliderRef.current) {
        sliderRef.current.style.setProperty('--value', `${percentage}%`);
      }
    },
    [playerDuration],
  );
  useEffect(() => {
    updateSliderBackground(sliderValue);
  }, [playerDuration, updateSliderBackground, sliderValue]);

  useEffect(() => {
    setDisplayPosition(formatTime(playerPosition));
    setSliderValue(Number(playerPosition));
    updateSliderBackground(playerPosition);
  }, [playerPosition, updateSliderBackground]);

  useEffect(() => {
    setDisplayDuration(formatTime(playerDuration));
  }, [playerDuration]);

  //prettier-ignore
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentlySeekingRef.current = true;
    const value = e.target.value;
    setPlayerPosition(value);
    setTempDisplayPosition(formatTime(value));
    setSeekPosition(Number(value));
    setSliderValue(Number(value));
    updateSliderBackground(value);
  };
  //prettier-ignore
  const handleMouseUp = () => {
    currentlySeekingRef.current = false;
    player?.seek(seekPosition);
  }

  return (
    <div className="flex w-[500px] items-center gap-3">
      {currentlySeekingRef.current ? tempDisplayPosition : displayPosition}
      <input
        ref={sliderRef}
        className="w-full"
        type="range"
        min="0"
        max={playerDuration}
        value={currentlySeekingRef.current ? seekPosition : playerPosition}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
      />
      {displayDuration}
    </div>
  );
};

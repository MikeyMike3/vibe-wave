import { useCallback, useEffect, useRef, useState } from 'react';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { formatTime } from '../../functions/formatTime';
import { useSpotifyPlayerContext } from '../../hooks/context/useSpotifyPlayerContext';
import { useDynamicImageBgColorContext } from '../../hooks/context/useDynamicImageBgColorContext';

export const ProgressTracker = () => {
  const { player } = useSpotifyPlayerContext();
  const { dynamicImageBgColorLighter, dynamicImageBgColorMedium } = useDynamicImageBgColorContext();
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
    <div className="flex w-[590px] items-center gap-3">
      <p className="cursor-default text-textPrimary">
        {currentlySeekingRef.current ? tempDisplayPosition : displayPosition}
      </p>

      <input
        ref={sliderRef}
        className="w-full"
        type="range"
        min="0"
        max={playerDuration}
        value={currentlySeekingRef.current ? seekPosition : playerPosition}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
        style={{
          WebkitAppearance: 'none',
          appearance: 'none',
          width: '100%',
          height: '8px',
          borderRadius: '4px',
          cursor: 'pointer',
          outline: 'none',
          background: `
      linear-gradient(
        to right,
        ${dynamicImageBgColorLighter} 0%, 
        ${dynamicImageBgColorLighter} ${(Number(sliderValue) / Number(playerDuration)) * 100 || 0}%, 
        ${dynamicImageBgColorMedium} ${(Number(sliderValue) / Number(playerDuration)) * 100 || 0}%, 
        ${dynamicImageBgColorMedium} 100%
      )
    `,
        }}
      />
      <p className="cursor-default text-textPrimary">{displayDuration}</p>
    </div>
  );
};

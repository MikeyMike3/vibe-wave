import { useCallback, useEffect, useRef, useState } from 'react';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { formatTime } from '../../functions/formatTime';
import { useSpotifyPlayerContext } from '../../hooks/context/useSpotifyPlayerContext';
import { useDynamicImageBgColorContext } from '../../hooks/context/useDynamicImageBgColorContext';
import { addPlayerPositionSessionStorage } from '../../functions/sessionStorage/playback/playerPosition/addPlayerPositionSessionStorage';

export const ProgressTracker = () => {
  const { player } = useSpotifyPlayerContext();
  const { dynamicImageBgColorLighter, dynamicImageBgColorMedium } = useDynamicImageBgColorContext();
  const { playerDuration, playerPosition, setPlayerPosition } = usePlaybackContext();

  const [displayPosition, setDisplayPosition] = useState('0:00');
  const [displayDuration, setDisplayDuration] = useState('0:00');
  const sliderRef = useRef<HTMLInputElement>(null);
  const currentlySeekingRef = useRef(false);

  const updateSliderBackground = useCallback(
    (value: number) => {
      if (sliderRef.current) {
        const percentage = (value / Number(playerDuration)) * 100 || 0;
        sliderRef.current.style.setProperty('--value', `${percentage}%`);
      }
    },
    [playerDuration],
  );

  useEffect(() => {
    setDisplayPosition(formatTime(playerPosition));
    setDisplayDuration(formatTime(playerDuration));
    updateSliderBackground(Number(playerPosition));
  }, [playerPosition, playerDuration, updateSliderBackground]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentlySeekingRef.current = true;
    const value = Number(e.target.value);
    setPlayerPosition(value);
    updateSliderBackground(value);
  };

  const handleMouseUp = () => {
    currentlySeekingRef.current = false;
    player?.seek(Number(playerPosition));
    addPlayerPositionSessionStorage(Number(playerPosition));
  };

  return (
    <div className="flex w-full items-center gap-3">
      <p className="cursor-default text-textPrimary">{displayPosition}</p>
      <input
        ref={sliderRef}
        className="w-full"
        type="range"
        min="0"
        max={playerDuration}
        value={playerPosition}
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
              ${dynamicImageBgColorLighter} ${(Number(playerPosition) / Number(playerDuration)) * 100 || 0}%, 
              ${dynamicImageBgColorMedium} ${(Number(playerPosition) / Number(playerDuration)) * 100 || 0}%, 
              ${dynamicImageBgColorMedium} 100%
            )
          `,
        }}
      />
      <p className="cursor-default text-textPrimary">{displayDuration}</p>
    </div>
  );
};

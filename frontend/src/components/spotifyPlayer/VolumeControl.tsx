import { useSpotifyPlayerContext } from '../../hooks/context/useSpotifyPlayerContext';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useRef } from 'react';

export const VolumeControl = () => {
  const { player } = useSpotifyPlayerContext();
  const { volume, setVolume } = usePlaybackContext();

  const volumeRef = useRef<HTMLInputElement>(null);

  const updateSliderBackground = (value: number | string) => {
    const percentage = Number(value);
    if (volumeRef.current) {
      volumeRef.current.style.setProperty('--value', `${percentage}%`);
    }
  };

  // prettier-ignore
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value)
    player?.setVolume(value / 100)
    updateSliderBackground(value)
  }

  return (
    <input ref={volumeRef} type="range" min="0" max="100" onChange={handleChange} value={volume} />
  );
};

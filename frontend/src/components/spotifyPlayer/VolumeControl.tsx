import { useSpotifyPlayerContext } from '../../hooks/context/useSpotifyPlayerContext';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useEffect, useRef } from 'react';

export const VolumeControl = () => {
  const { player, isPlayerReady } = useSpotifyPlayerContext();
  const { volume, setVolume } = usePlaybackContext();

  const volumeRef = useRef<HTMLInputElement>(null);
  const prevVolumeRef = useRef(0.1);
  const isVolumeIconClickedRef = useRef(false);
  const hasUserInteractedRef = useRef(false);

  const updateSliderBackground = (value: number | string) => {
    const percentage = Number(value);
    if (volumeRef.current) {
      volumeRef.current.style.setProperty('--value', `${percentage}%`);
    }
  };

  const setVolumeFunc = (value: number) => {
    if (value !== 0) {
      setVolume(value);
      player?.setVolume(value / 100);
      updateSliderBackground(value);
      return;
    }

    setVolume(0);
    player?.setVolume(0);
    updateSliderBackground(0);
  };

  // prettier-ignore
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolumeFunc(value)
    prevVolumeRef.current = value;
  }

  const handleClick = () => {
    if (!hasUserInteractedRef.current) {
      prevVolumeRef.current = 10;
      setVolumeFunc(0);
      hasUserInteractedRef.current = true;
      return;
    }
    if (isVolumeIconClickedRef.current) {
      setVolumeFunc(0);
      isVolumeIconClickedRef.current = false;
    } else {
      setVolumeFunc(prevVolumeRef.current);
      isVolumeIconClickedRef.current = true;
    }
  };

  useEffect(() => {
    const getVolumeFunc = async () => {
      if (!isPlayerReady) {
        updateSliderBackground(10);
        return;
      }
      if (isPlayerReady && player?.getVolume) {
        const getVolume = (await player.getVolume()) * 100;
        setVolume(getVolume);
        updateSliderBackground(getVolume);
      }
    };
    getVolumeFunc();
  }, [player?.getVolume, player, setVolume, isPlayerReady]);

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleClick}>Volume</button>
      <input
        ref={volumeRef}
        type="range"
        min="0"
        max="100"
        onChange={handleChange}
        value={volume}
      />
    </div>
  );
};

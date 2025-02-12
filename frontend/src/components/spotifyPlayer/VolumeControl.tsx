import { useSpotifyPlayerContext } from '../../hooks/context/useSpotifyPlayerContext';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolume, faVolumeMute, faVolumeHigh } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { faVolumeLow } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { useDynamicImageBgColorContext } from '../../hooks/context/useDynamicImageBgColorContext';
import { modifyDynamicBgColor } from '../../functions/modifyDynamicBgColor';

export const VolumeControl = () => {
  const { player, isPlayerReady } = useSpotifyPlayerContext();
  const { volume, setVolume } = usePlaybackContext();
  const { dynamicImageBgColorLighter } = useDynamicImageBgColorContext();

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
      <button
        className="h-10 w-10 items-center justify-center duration-150"
        onClick={handleClick}
        style={{ color: dynamicImageBgColorLighter }}
      >
        {volume === 0 && <FontAwesomeIcon className="text-2xl" icon={faVolumeMute} />}
        {volume >= 1 && volume <= 33 && <FontAwesomeIcon className="text-2xl" icon={faVolumeLow} />}
        {volume >= 34 && volume <= 67 && <FontAwesomeIcon className="text-2xl" icon={faVolume} />}
        {volume >= 68 && <FontAwesomeIcon className="text-2xl" icon={faVolumeHigh} />}
      </button>

      <input
        ref={volumeRef}
        type="range"
        min="0"
        max="100"
        onChange={handleChange}
        value={volume}
        style={{
          WebkitAppearance: 'none',
          appearance: 'none',
          width: '100%',
          height: '8px',
          borderRadius: '4px',
          cursor: 'pointer',
          outline: 'none',
          background: `linear-gradient(
            to right,
            ${dynamicImageBgColorLighter} ${volume}%,
            ${modifyDynamicBgColor(dynamicImageBgColorLighter, 0.4, 1)} ${volume}%
          )`,
        }}
      />
    </div>
  );
};

import { useSpotifyPlayerContext } from '../../hooks/context/useSpotifyPlayerContext';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';

export const VolumeControl = () => {
  const { player } = useSpotifyPlayerContext();
  const { volume, setVolume } = usePlaybackContext();

  // prettier-ignore
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value)
    player?.setVolume(value / 100)
  }

  return <input type="range" min="0" max="100" onChange={handleChange} value={volume} />;
};

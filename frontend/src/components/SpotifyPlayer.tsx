import { togglePlay } from '../apis/spotifyPlayer/togglePlay';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';

export const SpotifyPlayer = () => {
  const { player } = useSpotifyPlayerContext();
  return (
    <footer className="mt-auto bg-black text-white">
      <button onClick={() => togglePlay(player)}>Play Pause</button>
      <p>pause</p>
      <p>next</p>
    </footer>
  );
};

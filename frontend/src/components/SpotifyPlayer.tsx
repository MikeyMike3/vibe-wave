import { togglePlay } from '../apis/spotifyPlayer/togglePlay';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';

export const SpotifyPlayer = () => {
  const { player } = useSpotifyPlayerContext();
  return (
    <footer className="mt-auto grid grid-cols-[25%_50%_25%] bg-black p-10 text-white">
      <div>Image</div>
      <div className="mx-auto flex gap-10">
        <p>Previous</p>
        <button onClick={() => togglePlay(player)}>Play Pause</button>
        <p>next</p>
      </div>
      <div className="ml-auto">Volume</div>
    </footer>
  );
};
